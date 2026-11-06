// 7.1 Why modules? Splitting code into files
// Run: node chapter-07-modules-and-tooling/01-why-modules.js

// Imagine one 5,000-line file: hard to read, easy to break, impossible to share.
// Modules split code into files, each with one job, like rooms in a house.
// Each module has its own private scope and chooses what to share (export).

import { addGst, formatRupees } from "./lib/money.js";
import * as shapes from "./lib/shapes/index.js";

const price = 1000;
console.log("Price with GST:", formatRupees(addGst(price)));

// GST_RATE lives inside money.js and was not exported, so we cannot touch it here.
console.log("Can we see GST_RATE?", typeof GST_RATE === "undefined" ? "no (private)" : "yes");

console.log("Circle area (r=2):", shapes.circle.area(2).toFixed(2));
console.log("Rectangle perimeter (3x4):", shapes.rectangle.perimeter(3, 4));

// Benefits in one sentence each:
const benefits = [
  "Organisation: find code by file name",
  "Reuse: import the same module in many places",
  "Privacy: hide helpers that others should not depend on",
  "Teamwork: people can work on different files without clashing",
  "Testing: test each module on its own",
];
benefits.forEach((b) => console.log(" -", b));
