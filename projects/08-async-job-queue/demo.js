// Async Job Queue demo: a photo app makes thumbnails for 8 uploaded photos.
// At most 3 run at once, flaky ones are retried, and slow ones time out.
// Run: node projects/08-async-job-queue/demo.js

import { JobQueue } from "./queue.js";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const failuresLeft = new Map([["beach.jpg", 1], ["party.jpg", 5]]); // simulated flaky uploads

function makeThumbnail(photo, ms) {
  return async () => {
    await sleep(ms);
    const left = failuresLeft.get(photo) ?? 0;
    if (left > 0) {
      failuresLeft.set(photo, left - 1);
      throw new Error(`Storage hiccup while saving ${photo}`);
    }
    return `thumb_${photo}`;
  };
}

const queue = new JobQueue({ concurrency: 3, retries: 2, retryDelayMs: 50, timeoutMs: 400 });
const started = Date.now();
const t = () => `${String(Date.now() - started).padStart(4)} ms`;

queue.on("start", ({ name, attempt }) => console.log(`${t()}  start   ${name}${attempt > 1 ? ` (attempt ${attempt})` : ""}`));
queue.on("success", ({ name, result }) => console.log(`${t()}  done    ${name} -> ${result}`));
queue.on("retry", ({ name, error, delay }) => console.log(`${t()}  retry   ${name} in ${delay} ms: ${error.message}`));
queue.on("failure", ({ name, error }) => console.log(`${t()}  FAILED  ${name}: ${error.message}`));

const photos = [
  ["cat.jpg", 120], ["beach.jpg", 150], ["mountain.jpg", 200], ["party.jpg", 80],
  ["family.jpg", 100], ["huge-panorama.jpg", 900], ["dog.jpg", 60], ["food.jpg", 90],
];

const results = await Promise.allSettled(
  photos.map(([photo, ms]) =>
    queue.add(makeThumbnail(photo, ms), { name: photo, priority: photo === "family.jpg" ? 10 : 0 }),
  ),
);

await queue.onIdle();
console.log("\nSummary:", queue.stats);
console.log("Thumbnails ready:", results.filter((r) => r.status === "fulfilled").map((r) => r.value));
