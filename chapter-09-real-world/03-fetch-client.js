// 9.3 Calling web APIs with fetch
// Run: node chapter-09-real-world/03-fetch-client.js
// Optional: node chapter-09-real-world/03-fetch-client.js --live  (also calls a public API on the internet)

import http from "node:http";

// To keep this example offline and reliable we start a tiny local "weather API" first.
const fakeWeather = http.createServer((req, res) => {
  const city = new URL(req.url, "http://x").searchParams.get("city");
  if (!city) {
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "city is required" }));
  }
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ city, tempC: 29, condition: "Sunny" }));
});
await new Promise((resolve) => fakeWeather.listen(3002, resolve));
const BASE = "http://localhost:3002";

// fetch(url) returns a promise of a Response. Reading the body is a second await.
const response = await fetch(`${BASE}/weather?city=${encodeURIComponent("New Delhi")}`);
console.log("Status:", response.status, response.ok);
const weather = await response.json();
console.log(`${weather.city}: ${weather.tempC} C, ${weather.condition}`);

// fetch does NOT throw on 404 or 500. Check response.ok yourself.
async function getJson(url, options = {}) {
  const res = await fetch(url, { signal: AbortSignal.timeout(5000), ...options });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`HTTP ${res.status}: ${body}`);
  }
  return res.json();
}

try {
  await getJson(`${BASE}/weather`); // missing ?city=
} catch (error) {
  console.log("Request failed:", error.message);
}

// Sending data: POST with a JSON body and headers.
const options = {
  method: "POST",
  headers: { "Content-Type": "application/json", Authorization: "Bearer <your-token>" },
  body: JSON.stringify({ city: "Pune" }),
};
console.log("A POST request would send:", options.method, options.body);

if (process.argv.includes("--live")) {
  try {
    const data = await getJson("https://api.github.com/repos/nodejs/node");
    console.log(`Live: nodejs/node has ${data.stargazers_count} stars`);
  } catch (error) {
    console.log("Live call failed (offline?):", error.message);
  }
}

fakeWeather.close();
