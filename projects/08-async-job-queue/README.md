# Project 8: Async Job Queue

A task queue that runs asynchronous jobs a few at a time, retries failures with exponential backoff, times out slow jobs, honours priorities, can be paused and resumed, and reports everything through events. Email senders, image processors, web scrapers and download managers are all built on this pattern.

Book: Chapter 8 (Async and events), Project 8.

## Run it

```bash
node projects/08-async-job-queue/demo.js
node --test projects/08-async-job-queue/*.test.js
```

## Files

| File | Job |
| --- | --- |
| `queue.js` | `JobQueue` class (extends `EventEmitter`) and `TimeoutError` |
| `demo.js` | Generates thumbnails for 8 photos with flaky storage and one huge file |
| `queue.test.js` | Tests for concurrency, retries, timeouts, priority, pause/resume and idle |

## Concepts used

The event loop, promises, async/await, `Promise.race` and `Promise.allSettled`, `EventEmitter`, classes with private fields, `try`/`catch`/`finally` in async code.
