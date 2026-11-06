// 6.1 Reading files
// Run: node chapter-06-files-and-io/01-reading-files.js

import fs from "node:fs";
import path from "node:path";

// import.meta.dirname is the folder this file lives in (Node 20.11+).
const notesPath = path.join(import.meta.dirname, "data", "notes.txt");

// readFileSync waits until the whole file is read. Simple, fine for small scripts.
const text = fs.readFileSync(notesPath, "utf8"); // "utf8" gives text instead of raw bytes
console.log("Whole file:\n" + text);

// Split into lines to work with each one.
const lines = text.split("\n").filter((line) => line.trim() !== "");
console.log(`You have ${lines.length} notes:`);
lines.forEach((line, i) => console.log(`  ${i + 1}. ${line}`));

// Without an encoding you get a Buffer: raw bytes.
const bytes = fs.readFileSync(notesPath);
console.log("First 5 bytes:", bytes.subarray(0, 5), "Size:", bytes.length, "bytes");

// Reading a file that does not exist throws an error with code ENOENT.
try {
  fs.readFileSync(path.join(import.meta.dirname, "data", "missing.txt"), "utf8");
} catch (error) {
  console.log("Could not read:", error.code);
}

// Check first if you prefer.
console.log("notes.txt exists?", fs.existsSync(notesPath));
