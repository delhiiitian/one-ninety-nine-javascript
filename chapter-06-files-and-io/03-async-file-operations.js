// 6.3 Asynchronous file operations with fs/promises
// Run: node chapter-06-files-and-io/03-async-file-operations.js

import fs from "node:fs/promises";
import path from "node:path";

// Sync functions make the program wait. Async ones let it do other work meanwhile,
// which matters in servers handling many users. `await` waits for the result
// without freezing everything else (Chapter 8 explains how).

const dataDir = path.join(import.meta.dirname, "data");
const outDir = path.join(import.meta.dirname, "output");

const notes = await fs.readFile(path.join(dataDir, "notes.txt"), "utf8");
console.log("Read", notes.split("\n").filter(Boolean).length, "notes asynchronously");

await fs.mkdir(outDir, { recursive: true });
const upper = notes.toUpperCase();
await fs.writeFile(path.join(outDir, "notes-upper.txt"), upper);
console.log("Wrote notes-upper.txt");

// Read several files at the same time and wait for all of them.
const [settings, sales] = await Promise.all([
  fs.readFile(path.join(dataDir, "settings.json"), "utf8"),
  fs.readFile(path.join(dataDir, "sales.csv"), "utf8"),
]);
console.log("settings.json:", settings.length, "chars; sales.csv:", sales.length, "chars");

// Errors from await are caught with ordinary try/catch.
try {
  await fs.readFile(path.join(dataDir, "nope.txt"), "utf8");
} catch (error) {
  console.log("Async read failed:", error.code);
}

// Show that the program stays responsive: this timer fires while files are read.
setTimeout(() => console.log("(timer ran while we were busy)"), 0);
await fs.readFile(path.join(dataDir, "server.log"), "utf8");
console.log("Finished reading server.log");
