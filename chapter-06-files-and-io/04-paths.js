// 6.4 Working with paths
// Run: node chapter-06-files-and-io/04-paths.js

import path from "node:path";
import os from "node:os";

// Never glue paths with "+": Windows uses "\" and macOS/Linux use "/".
const reportPath = path.join("reports", "2026", "january.pdf");
console.log("Joined:", reportPath);

// Pieces of a path
const file = "/home/riya/photos/goa-trip.jpeg";
console.log("Folder:   ", path.dirname(file));
console.log("File name:", path.basename(file));
console.log("Extension:", path.extname(file));
console.log("Name only:", path.basename(file, path.extname(file)));
console.log("Parsed:   ", path.parse(file));

// Absolute paths: resolve turns a relative path into a full one.
console.log("Resolved from cwd:", path.resolve("data", "notes.txt"));

// Where is this script? Build paths relative to it, not to where you ran node.
console.log("This file's folder:", import.meta.dirname);
console.log("Data file:", path.join(import.meta.dirname, "data", "notes.txt"));

// Relative path from one place to another
console.log("Relative:", path.relative("/home/riya/photos", "/home/riya/docs/cv.pdf"));

// normalize cleans up messy paths
console.log("Normalized:", path.normalize("/home/riya/../riya/./docs//cv.pdf"));

// Useful system locations
console.log("Home folder:", os.homedir());
console.log("Temp folder:", os.tmpdir());
console.log("Path separator on this OS:", JSON.stringify(path.sep));

// Real use: change a file's extension
const renamed = path.format({ ...path.parse(file), base: undefined, ext: ".webp" });
console.log("Converted image name:", renamed);
