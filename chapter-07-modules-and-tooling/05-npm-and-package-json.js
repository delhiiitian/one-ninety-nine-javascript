// 7.5 npm and package.json: your project's ID card
// Run: node chapter-07-modules-and-tooling/05-npm-and-package-json.js

import fs from "node:fs";
import path from "node:path";

// package.json lives at the root of every Node.js project. Let us read ours.
const pkgPath = path.join(import.meta.dirname, "..", "package.json");
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));

console.log("Project:", pkg.name, "version", pkg.version);
console.log("Module type:", pkg.type);
console.log("Scripts you can run with npm run <name>:", Object.keys(pkg.scripts));

// A typical package.json for an app with dependencies looks like this:
const example = {
  name: "pizza-shop",
  version: "1.2.0",
  type: "module",
  scripts: { start: "node src/server.js", test: "node --test" },
  dependencies: { express: "^5.1.0" },       // needed to run the app
  devDependencies: { eslint: "^9.30.0" },    // needed only while developing
};
console.log(JSON.stringify(example, null, 2));

// Semantic versioning: MAJOR.MINOR.PATCH, for example 5.1.0
//   PATCH (5.1.1) bug fixes, MINOR (5.2.0) new features, MAJOR (6.0.0) breaking changes
//   "^5.1.0" accepts any 5.x.x version at or above 5.1.0
function satisfiesCaret(range, version) {
  const [rMajor, rMinor, rPatch] = range.slice(1).split(".").map(Number);
  const [major, minor, patch] = version.split(".").map(Number);
  if (major !== rMajor) return false;
  return minor > rMinor || (minor === rMinor && patch >= rPatch);
}
for (const v of ["5.1.0", "5.4.2", "6.0.0", "5.0.9"]) {
  console.log(`^5.1.0 accepts ${v}?`, satisfiesCaret("^5.1.0", v));
}

// Commands to remember (run them in a terminal, not here):
//   npm init -y          create package.json
//   npm install express  add a dependency (creates node_modules and package-lock.json)
//   npm install -D eslint  add a dev dependency
//   npm run test         run a script
