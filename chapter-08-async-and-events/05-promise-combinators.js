// 8.5 Running many promises: all, allSettled, race, any
// Run: node chapter-08-async-and-events/05-promise-combinators.js

const delay = (ms, value, fail = false) =>
  new Promise((resolve, reject) =>
    setTimeout(() => (fail ? reject(new Error(value)) : resolve(value)), ms),
  );

// Promise.all: wait for ALL; fails fast if ANY fails. (Loading a page's data.)
const [user, orders] = await Promise.all([delay(100, "user"), delay(150, "orders")]);
console.log("all:", user, orders);

try {
  await Promise.all([delay(50, "ok"), delay(80, "payment service down", true)]);
} catch (error) {
  console.log("all failed:", error.message);
}

// Promise.allSettled: wait for all, never throws; inspect each result. (Sending 3 emails.)
const results = await Promise.allSettled([
  delay(50, "email to Asha sent"),
  delay(60, "email to Bilal bounced", true),
  delay(70, "email to Chen sent"),
]);
for (const r of results) {
  console.log("allSettled:", r.status, r.status === "fulfilled" ? r.value : r.reason.message);
}

// Promise.race: the first to settle wins (success or failure). Great for timeouts.
function withTimeout(promise, ms) {
  const timeout = delay(ms, `Timed out after ${ms} ms`, true);
  return Promise.race([promise, timeout]);
}
try {
  await withTimeout(delay(500, "slow report"), 100);
} catch (error) {
  console.log("race:", error.message);
}

// Promise.any: the first SUCCESS wins. (Fastest of several mirror servers.)
const fastest = await Promise.any([
  delay(120, "mirror-eu"),
  delay(40, "mirror-asia broken", true),
  delay(80, "mirror-us"),
]);
console.log("any:", fastest);

// Built-in timeouts for real network calls: fetch(url, { signal: AbortSignal.timeout(5000) })
