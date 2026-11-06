// 8.1 The event loop: how one thread juggles many tasks
// Run: node chapter-08-async-and-events/01-event-loop.js

// JavaScript runs ONE line at a time on ONE thread. Slow jobs (timers, network,
// files) are handed to the environment; their callbacks queue up and run
// when the current code has finished. Like a single chef who puts rice on to boil
// and chops vegetables instead of staring at the pot.

console.log("1. Take order");

setTimeout(() => console.log("5. Timer callback (macrotask queue)"), 0);

Promise.resolve().then(() => console.log("4. Promise callback (microtask queue)"));

queueMicrotask(() => console.log("4b. Another microtask"));

console.log("2. Start cooking");
console.log("3. Synchronous code always finishes first");

// Order rule: all synchronous code -> all microtasks (promises) -> next macrotask (timers, I/O).

// Blocking the loop freezes everything, so avoid long synchronous work.
setTimeout(() => {
  const start = Date.now();
  setTimeout(() => console.log(`7. This 0 ms timer waited ${Date.now() - start} ms`), 0);
  while (Date.now() - start < 200) {
    // busy-waiting for 200 ms: nothing else can run meanwhile
  }
  console.log("6. Finished a 200 ms blocking task");
}, 10);
