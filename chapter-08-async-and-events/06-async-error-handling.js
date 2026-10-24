// 8.6 Handling errors in asynchronous code
// Run: node chapter-08-async-and-events/06-async-error-handling.js

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchWeather(city) {
  await wait(50);
  if (city === "Atlantis") throw new Error(`No weather station in ${city}`);
  return { city, tempC: 31 };
}

// 1. try/catch works with await just like with normal code.
async function showWeather(city) {
  try {
    const weather = await fetchWeather(city);
    console.log(`${weather.city}: ${weather.tempC} C`);
  } catch (error) {
    console.log("Could not load weather:", error.message);
  } finally {
    console.log(`(done with ${city})`);
  }
}
await showWeather("Chennai");
await showWeather("Atlantis");

// 2. With .then chains, use .catch.
fetchWeather("Atlantis").catch((error) => console.log(".catch got:", error.message));
await wait(100);

// 3. A common mistake: forgetting await, so try/catch cannot see the error.
async function broken() {
  try {
    return fetchWeather("Atlantis"); // missing await!
  } catch {
    console.log("never printed");
  }
}
await broken().catch((error) => console.log("Escaped the try/catch:", error.message));

// 4. A safety net for promises nobody handled (log it, then fix the real bug).
process.on("unhandledRejection", (reason) => {
  console.log("Unhandled rejection caught by safety net:", reason.message);
});
fetchWeather("Atlantis"); // no await, no catch
await wait(100);

// 5. A helper that returns [error, value] instead of throwing (Go-style).
async function attempt(promise) {
  try {
    return [null, await promise];
  } catch (error) {
    return [error, null];
  }
}
const [error, data] = await attempt(fetchWeather("Mumbai"));
console.log("attempt():", error, data);
