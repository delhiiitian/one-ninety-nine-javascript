// 1.2 Variables: let, const and var
// Run: node chapter-01-basics/02-variables.js

// const: a label that always points to the same value (cannot be reassigned).
const birthYear = 1995;

// let: a label whose value can change later.
let score = 0;
score = score + 10;
score += 5;

console.log("Birth year:", birthYear);
console.log("Score:", score);

// Trying to reassign a const throws an error. We catch it so the program continues.
try {
  // eslint-disable-next-line no-const-assign
  birthYear = 2000;
} catch (error) {
  console.log("Cannot change a const:", error.message);
}

// const objects can still have their *contents* changed.
const cart = { items: 0 };
cart.items = 3;
console.log("Cart items:", cart.items);

// var is the old way. It ignores block scope, which surprises people.
if (true) {
  var oldStyle = "visible outside the block";
  let newStyle = "only visible inside the block";
  console.log(newStyle);
}
console.log(oldStyle);

// Naming rules: start with a letter, _ or $. Use camelCase by convention.
const firstName = "Ada";
const totalPriceInRupees = 499;
console.log(firstName, totalPriceInRupees);
