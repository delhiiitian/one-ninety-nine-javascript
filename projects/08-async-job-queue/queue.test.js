import { test } from "node:test";
import assert from "node:assert/strict";
import { JobQueue, TimeoutError } from "./queue.js";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

test("returns each job's result", async () => {
  const queue = new JobQueue();
  assert.equal(await queue.add(async () => 42), 42);
});

test("never runs more jobs at once than the concurrency limit", async () => {
  const queue = new JobQueue({ concurrency: 2 });
  let running = 0;
  let peak = 0;
  const job = async () => {
    running++;
    peak = Math.max(peak, running);
    await sleep(20);
    running--;
  };
  await Promise.all(Array.from({ length: 6 }, () => queue.add(job)));
  assert.equal(peak, 2);
});

test("retries failed jobs, then succeeds", async () => {
  const queue = new JobQueue({ retries: 2, retryDelayMs: 1 });
  let calls = 0;
  const result = await queue.add(async () => {
    calls++;
    if (calls < 3) throw new Error("flaky");
    return "ok";
  });
  assert.equal(result, "ok");
  assert.equal(queue.stats.retried, 2);
});

test("rejects after retries are used up and emits failure", async () => {
  const queue = new JobQueue({ retries: 1, retryDelayMs: 1 });
  const failures = [];
  queue.on("failure", (e) => failures.push(e.name));
  await assert.rejects(queue.add(async () => { throw new Error("down"); }, { name: "sync" }), /down/);
  assert.deepEqual(failures, ["sync"]);
  assert.equal(queue.stats.failed, 1);
});

test("times out slow jobs", async () => {
  const queue = new JobQueue({ timeoutMs: 20 });
  await assert.rejects(queue.add(() => sleep(200)), TimeoutError);
});

test("higher priority jobs start first", async () => {
  const queue = new JobQueue({ concurrency: 1 });
  const order = [];
  queue.pause();
  const jobs = [
    queue.add(async () => order.push("low"), { priority: 0 }),
    queue.add(async () => order.push("high"), { priority: 5 }),
    queue.add(async () => order.push("medium"), { priority: 2 }),
  ];
  queue.resume();
  await Promise.all(jobs);
  assert.deepEqual(order, ["high", "medium", "low"]);
});

test("pause stops new jobs from starting until resume", async () => {
  const queue = new JobQueue();
  queue.pause();
  let ran = false;
  const done = queue.add(async () => { ran = true; });
  await sleep(20);
  assert.equal(ran, false);
  assert.deepEqual(queue.size, { waiting: 1, running: 0 });
  queue.resume();
  await done;
  assert.equal(ran, true);
});

test("onIdle waits for everything to finish", async () => {
  const queue = new JobQueue({ concurrency: 3 });
  let finished = 0;
  for (let i = 0; i < 5; i++) queue.add(async () => { await sleep(10); finished++; });
  await queue.onIdle();
  assert.equal(finished, 5);
});

test("rejects an invalid concurrency", () => {
  assert.throws(() => new JobQueue({ concurrency: 0 }), RangeError);
});
