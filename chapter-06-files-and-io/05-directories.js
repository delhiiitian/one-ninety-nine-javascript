// 6.5 Working with folders (directories)
// Run: node chapter-06-files-and-io/05-directories.js

import fs from "node:fs";
import path from "node:path";

const root = path.join(import.meta.dirname, "output", "photo-library");

// Start fresh, then create nested folders in one call.
fs.rmSync(root, { recursive: true, force: true });
fs.mkdirSync(path.join(root, "2025", "goa"), { recursive: true });
fs.mkdirSync(path.join(root, "2026", "manali"), { recursive: true });

// Create some empty "photos".
for (const name of ["beach.jpg", "sunset.jpg"]) {
  fs.writeFileSync(path.join(root, "2025", "goa", name), "");
}
fs.writeFileSync(path.join(root, "2026", "manali", "snow.png"), "");
fs.writeFileSync(path.join(root, "2026", "readme.txt"), "Trip notes");

// List one folder. withFileTypes tells us files from folders.
for (const entry of fs.readdirSync(path.join(root, "2026"), { withFileTypes: true })) {
  console.log(entry.isDirectory() ? "[DIR] " : "[FILE]", entry.name);
}

// Walk the whole tree (recursion from Chapter 3!)
function walk(dir, depth = 0) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    console.log("  ".repeat(depth) + (entry.isDirectory() ? `${entry.name}/` : entry.name));
    if (entry.isDirectory()) walk(path.join(dir, entry.name), depth + 1);
  }
}
walk(root);

// Or let Node do the walking (Node 20+): list all files recursively.
const all = fs.readdirSync(root, { recursive: true });
const images = all.filter((p) => [".jpg", ".png"].includes(path.extname(p)));
console.log("Images found:", images);

// Clean up.
fs.rmSync(root, { recursive: true });
console.log("Removed photo-library:", !fs.existsSync(root));
