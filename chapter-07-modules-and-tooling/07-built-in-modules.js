// 7.7 Built-in Node.js modules: batteries included
// Run: node chapter-07-modules-and-tooling/07-built-in-modules.js

import os from "node:os";
import crypto from "node:crypto";
import util from "node:util";
import { setTimeout as sleep } from "node:timers/promises";
import assert from "node:assert/strict";

// os: facts about the computer
console.log(`OS: ${os.platform()} ${os.arch()}, ${os.cpus().length} CPUs`);
console.log(`Free memory: ${(os.freemem() / 1024 ** 3).toFixed(1)} GB`);

// crypto: secure random values and hashing
console.log("Random ID:", crypto.randomUUID());
console.log("OTP code:", crypto.randomInt(100000, 1000000));
const hash = crypto.createHash("sha256").update("hello").digest("hex");
console.log("SHA-256 of 'hello':", hash.slice(0, 16) + "...");

// util: formatting and inspecting values
console.log(util.format("%s has %d items", "Cart", 3));
console.log(util.inspect({ a: { b: { c: { d: 1 } } } }, { depth: null }));
console.log("Deep equal?", util.isDeepStrictEqual({ x: [1, 2] }, { x: [1, 2] }));

// timers/promises: pause without blocking
const start = Date.now();
await sleep(100);
console.log(`Waited ~${Date.now() - start} ms`);

// assert: check assumptions; throws if they are wrong
assert.equal(2 + 2, 4);
assert.deepEqual([1, 2], [1, 2]);
console.log("All assertions passed");

// Others you will meet: fs, path (Chapter 6), http (Chapter 9), events (Chapter 8),
// url, zlib, child_process, worker_threads, readline, test.
