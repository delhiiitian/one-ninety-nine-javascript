// 8.2 Asynchronous callbacks: "call me back when you are done"
// Run: node chapter-08-async-and-events/02-async-callbacks.js

import fs from "node:fs";
import path from "node:path";

// Like leaving your number at a busy restaurant: they call you when the table is ready.
function orderFood(dish, callback) {
  console.log(`Ordered ${dish}...`);
  setTimeout(() => {
    if (dish === "unicorn steak") {
      callback(new Error(`${dish} is not on the menu`));
    } else {
      callback(null, `${dish} is served`);
    }
  }, 100);
}

// Node-style callbacks: the first argument is an error (or null), the second is the result.
orderFood("masala dosa", (error, result) => {
  if (error) return console.log("Problem:", error.message);
  console.log(result);
});

orderFood("unicorn steak", (error, result) => {
  if (error) return console.log("Problem:", error.message);
  console.log(result);
});

console.log("Code after the orders runs immediately; it does not wait.");

// Built-in APIs use the same pattern.
fs.readFile(path.join(import.meta.dirname, "02-async-callbacks.js"), "utf8", (error, text) => {
  if (error) throw error;
  console.log("This file has", text.split("\n").length, "lines");
});

// Problem: steps that depend on each other nest deeper and deeper ("callback hell").
orderFood("starter", (e1, r1) => {
  orderFood("main course", (e2, r2) => {
    orderFood("dessert", (e3, r3) => {
      console.log("Three-course meal done:", [r1, r2, r3].join(" | "));
    });
  });
});
// Promises (8.3) and async/await (8.4) flatten this pyramid.
