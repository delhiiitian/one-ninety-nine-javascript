// 3.9 Pure functions and side effects
// Run: node chapter-03-functions/09-pure-functions.js

// PURE: same input always gives the same output, and nothing outside changes.
const addGst = (price) => Math.round(price * 1.18 * 100) / 100;
console.log(addGst(100), addGst(100)); // always 118 118

// IMPURE: depends on or changes something outside itself.
let visitorCount = 0;
function registerVisit() {
  visitorCount++; // side effect: changes outer state
  return visitorCount;
}
registerVisit();
registerVisit();
console.log("Visitors:", visitorCount);

// Impure version: changes the array that was passed in.
function addItemImpure(cart, item) {
  cart.push(item);
  return cart;
}

// Pure version: returns a NEW array and leaves the input alone.
function addItemPure(cart, item) {
  return [...cart, item];
}

const cartA = ["pen"];
addItemImpure(cartA, "book");
console.log("Impure changed original:", cartA);

const cartB = ["pen"];
const newCart = addItemPure(cartB, "book");
console.log("Pure kept original:", cartB, "new:", newCart);

// Updating objects without mutation.
const profile = { name: "Dev", city: "Jaipur" };
const moved = { ...profile, city: "Mumbai" };
console.log(profile.city, "->", moved.city);

// Side effects are necessary (printing, saving files, network calls).
// The goal is to keep them at the edges and keep the core logic pure.
function invoiceTotal(lines) {
  return lines.reduce((sum, line) => sum + line.qty * line.price, 0);
}
const total = invoiceTotal([{ qty: 2, price: 50 }, { qty: 1, price: 30 }]);
console.log("Invoice total:", total); // printing is the side effect, at the edge
