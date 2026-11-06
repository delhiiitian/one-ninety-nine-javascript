// Runs every chapter example and reports which ones succeed.
// Usage: npm run examples

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = path.join(import.meta.dirname, "..");
const chapters = fs.readdirSync(root).filter((name) => name.startsWith("chapter-")).sort();

let failures = 0;
let total = 0;
for (const chapter of chapters) {
  const files = fs
    .readdirSync(path.join(root, chapter))
    .filter((f) => /^\d\d-.*\.(js|cjs)$/.test(f))
    .sort();
  for (const file of files) {
    total++;
    const relative = path.join(chapter, file);
    const args = file.endsWith(".test.js") ? ["--test", relative] : [relative];
    const result = spawnSync(process.execPath, args, {
      cwd: root,
      input: "",
      encoding: "utf8",
      timeout: 20_000,
    });
    const ok = result.status === 0;
    if (!ok) failures++;
    console.log(`${ok ? "PASS" : "FAIL"}  ${relative}`);
    if (!ok) console.log(result.stderr || result.stdout);
  }
}

console.log(`\n${total - failures}/${total} examples ran successfully`);
process.exitCode = failures ? 1 : 0;
