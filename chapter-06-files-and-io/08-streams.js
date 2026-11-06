// 6.8 Streams: handling big files piece by piece
// Run: node chapter-06-files-and-io/08-streams.js

import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import { pipeline } from "node:stream/promises";
import zlib from "node:zlib";

const logPath = path.join(import.meta.dirname, "data", "server.log");

// readFile loads everything into memory at once. For a 5 GB log that is a problem.
// A stream delivers the file in small chunks, like water through a pipe.
const lines = readline.createInterface({ input: fs.createReadStream(logPath) });

const counts = { INFO: 0, WARN: 0, ERROR: 0 };
let slowest = { ms: 0, line: "" };
for await (const line of lines) {
  const [, level, , duration] = line.split(" ");
  counts[level]++;
  const ms = parseInt(duration, 10);
  if (ms > slowest.ms) slowest = { ms, line };
}
console.log("Log levels:", counts);
console.log("Slowest request:", slowest.line);

// Write with a stream: good for producing large outputs bit by bit.
const outDir = path.join(import.meta.dirname, "output");
fs.mkdirSync(outDir, { recursive: true });
const errorsOnly = fs.createWriteStream(path.join(outDir, "errors.log"));
const again = readline.createInterface({ input: fs.createReadStream(logPath) });
for await (const line of again) {
  if (line.includes(" ERROR ")) errorsOnly.write(line + "\n");
}
errorsOnly.end();
await new Promise((resolve) => errorsOnly.on("finish", resolve));
console.log("Wrote output/errors.log");

// Pipelines connect streams: read -> compress -> write, without loading it all.
await pipeline(
  fs.createReadStream(logPath),
  zlib.createGzip(),
  fs.createWriteStream(path.join(outDir, "server.log.gz")),
);
const before = fs.statSync(logPath).size;
const after = fs.statSync(path.join(outDir, "server.log.gz")).size;
console.log(`Compressed ${before} bytes into ${after} bytes`);
