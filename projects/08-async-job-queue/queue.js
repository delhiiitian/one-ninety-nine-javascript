// JobQueue: runs async jobs with a concurrency limit, retries, timeouts and events.
// The same idea powers email senders, image processors and download managers.
import { EventEmitter } from "node:events";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export class TimeoutError extends Error {
  constructor(ms) {
    super(`Job timed out after ${ms} ms`);
    this.name = "TimeoutError";
  }
}

export class JobQueue extends EventEmitter {
  #waiting = [];
  #running = 0;
  #paused = false;
  #nextId = 1;
  #idleResolvers = [];

  constructor({ concurrency = 2, retries = 0, retryDelayMs = 100, timeoutMs = 0 } = {}) {
    super();
    if (!Number.isInteger(concurrency) || concurrency < 1) throw new RangeError("concurrency must be >= 1");
    this.options = { concurrency, retries, retryDelayMs, timeoutMs };
    this.stats = { added: 0, succeeded: 0, failed: 0, retried: 0 };
  }

  // Add a job. `task` is an async function. Returns a promise for the job's result.
  add(task, { name, priority = 0 } = {}) {
    const id = this.#nextId++;
    const job = { id, name: name ?? `job-${id}`, task, priority, attempts: 0 };
    const promise = new Promise((resolve, reject) => Object.assign(job, { resolve, reject }));
    // Higher priority first; equal priority keeps insertion order.
    const index = this.#waiting.findIndex((j) => j.priority < priority);
    if (index === -1) this.#waiting.push(job);
    else this.#waiting.splice(index, 0, job);
    this.stats.added++;
    this.emit("added", { id, name: job.name });
    queueMicrotask(() => this.#pump());
    return promise;
  }

  pause() {
    this.#paused = true;
    this.emit("paused");
  }

  resume() {
    this.#paused = false;
    this.emit("resumed");
    this.#pump();
  }

  get size() {
    return { waiting: this.#waiting.length, running: this.#running };
  }

  // Resolves when nothing is waiting or running.
  onIdle() {
    if (this.#waiting.length === 0 && this.#running === 0) return Promise.resolve();
    return new Promise((resolve) => this.#idleResolvers.push(resolve));
  }

  #pump() {
    while (!this.#paused && this.#running < this.options.concurrency && this.#waiting.length > 0) {
      this.#run(this.#waiting.shift());
    }
    if (this.#waiting.length === 0 && this.#running === 0) {
      this.#idleResolvers.splice(0).forEach((resolve) => resolve());
      this.emit("idle", { ...this.stats });
    }
  }

  async #run(job) {
    this.#running++;
    const { retries, retryDelayMs } = this.options;
    try {
      while (true) {
        job.attempts++;
        this.emit("start", { id: job.id, name: job.name, attempt: job.attempts });
        const startedAt = Date.now();
        try {
          const result = await this.#withTimeout(job.task());
          this.stats.succeeded++;
          this.emit("success", { id: job.id, name: job.name, result, ms: Date.now() - startedAt });
          job.resolve(result);
          return;
        } catch (error) {
          if (job.attempts <= retries) {
            this.stats.retried++;
            const delay = retryDelayMs * 2 ** (job.attempts - 1); // exponential backoff
            this.emit("retry", { id: job.id, name: job.name, attempt: job.attempts, error, delay });
            await sleep(delay);
            continue;
          }
          this.stats.failed++;
          this.emit("failure", { id: job.id, name: job.name, error });
          job.reject(error);
          return;
        }
      }
    } finally {
      this.#running--;
      this.#pump();
    }
  }

  #withTimeout(promise) {
    const ms = this.options.timeoutMs;
    if (!ms) return promise;
    let timer;
    const timeout = new Promise((_, reject) => {
      timer = setTimeout(() => reject(new TimeoutError(ms)), ms);
    });
    return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
  }
}
