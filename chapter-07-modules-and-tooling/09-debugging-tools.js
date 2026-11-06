// 7.9 Debugging tools: finding out what your code is really doing
// Run: node chapter-07-modules-and-tooling/09-debugging-tools.js
// Step-by-step debugger: node --inspect-brk chapter-07-modules-and-tooling/09-debugging-tools.js
//   then open chrome://inspect in Chrome (or press F5 in VS Code).

import util from "node:util";

const cart = [
  { item: "Shoes", price: 2499, qty: 1 },
  { item: "Socks", price: 199, qty: "3" }, // bug: qty arrived as a string
];

// 1. console.log with labels: the quickest look.
console.log("cart:", cart);

// 2. console.table for lists of objects.
console.table(cart);

// 3. Check types when results look odd.
for (const line of cart) {
  console.log(line.item, "qty type:", typeof line.qty);
}

// 4. console.assert prints only when a condition is FALSE.
for (const line of cart) {
  console.assert(typeof line.qty === "number", `qty for ${line.item} is not a number`);
}

// 5. console.time measures how long something takes.
console.time("total");
const total = cart.reduce((sum, l) => sum + l.price * Number(l.qty), 0);
console.timeEnd("total");
console.log("Total:", total);

// 6. util.debuglog prints only when you ask: NODE_DEBUG=cart node ...
const debug = util.debuglog("cart");
debug("This only appears with NODE_DEBUG=cart");

// 7. console.trace shows how we got here.
function applyCoupon(code) {
  if (code !== "SAVE10") console.trace("Unknown coupon:", code);
}
applyCoupon("FREE100");

// 8. `debugger;` pauses here when running under --inspect (ignored otherwise).
debugger;

// Debugging checklist: reproduce, read the error message and stack, print values,
// form a guess, test the guess, fix, then add a test so the bug never returns.
