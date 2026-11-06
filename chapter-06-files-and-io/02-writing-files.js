// 6.2 Writing and appending files
// Run: node chapter-06-files-and-io/02-writing-files.js

import fs from "node:fs";
import path from "node:path";

const outDir = path.join(import.meta.dirname, "output");
fs.mkdirSync(outDir, { recursive: true }); // make sure the folder exists
const diaryPath = path.join(outDir, "diary.txt");

// writeFileSync creates the file, or REPLACES everything already in it.
fs.writeFileSync(diaryPath, "Day 1: Started learning JavaScript\n");

// appendFileSync adds to the end without deleting what is there.
fs.appendFileSync(diaryPath, "Day 2: Learned about functions\n");
fs.appendFileSync(diaryPath, `Day 3: Wrote this line at ${new Date().toISOString()}\n`);

console.log(fs.readFileSync(diaryPath, "utf8"));

// Write a small report built from data.
const scores = { Asha: 92, Bilal: 78, Chen: 85 };
const report = Object.entries(scores)
  .map(([name, score]) => `${name.padEnd(8)}${score}`)
  .join("\n");
fs.writeFileSync(path.join(outDir, "report.txt"), `SCORES\n${report}\n`);
console.log("Report saved to", path.relative(process.cwd(), path.join(outDir, "report.txt")));

// File info: size and modified time.
const info = fs.statSync(diaryPath);
console.log(`diary.txt is ${info.size} bytes, modified ${info.mtime.toISOString()}`);

// Rename and delete.
const archived = path.join(outDir, "diary-old.txt");
fs.renameSync(diaryPath, archived);
fs.rmSync(archived);
console.log("Archived diary removed:", !fs.existsSync(archived));
