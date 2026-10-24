// 5.8 Recovering: retries and fallbacks
// Run: node chapter-05-error-handling/08-retry-and-fallback.js

// A flaky service that fails the first two times (like a weak mobile signal).
function createFlakyService(failuresBeforeSuccess) {
  let calls = 0;
  return function fetchExchangeRate() {
    calls++;
    if (calls <= failuresBeforeSuccess) {
      const error = new Error(`Network timeout (call ${calls})`);
      error.retryable = true;
      throw error;
    }
    return 83.2;
  };
}

// Retry a function a few times before giving up.
function withRetry(fn, { attempts = 3 } = {}) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return fn();
    } catch (error) {
      lastError = error;
      console.log(`  attempt ${attempt} failed: ${error.message}`);
      if (!error.retryable) break; // do not retry errors that will never fix themselves
    }
  }
  throw lastError;
}

console.log("Service that recovers:");
console.log("  rate =", withRetry(createFlakyService(2)));

console.log("Service that stays down:");
try {
  withRetry(createFlakyService(10));
} catch (error) {
  console.log("  gave up:", error.message);
}

// Fallback: use a sensible default when the preferred source fails.
const cachedRate = 83.0;
function getRate(service) {
  try {
    return { rate: withRetry(service, { attempts: 2 }), source: "live" };
  } catch {
    return { rate: cachedRate, source: "cache (may be outdated)" };
  }
}
console.log("Fallback:", getRate(createFlakyService(10)));
