// 3.1 Function declarations and expressions
// Run: node chapter-03-functions/01-function-basics.js

// A function declaration: a named, reusable recipe.
function greet(name) {
  console.log(`Namaste, ${name}!`);
}

greet("Isha");   // calling (running) the function
greet("Omar");

// Declarations are "hoisted": you can call them before the line they appear on.
console.log(square(9));
function square(n) {
  return n * n;
}

// A function expression: a function stored in a variable.
const cube = function (n) {
  return n * n * n;
};
console.log(cube(3));

// Functions are values: they can be stored, passed around and listed.
const operations = [square, cube];
for (const operation of operations) {
  console.log(operation.name, "of 4 is", operation(4));
}

// Real use: turn repeated steps into one function.
function formatPrice(amount, currency = "INR") {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency }).format(amount);
}
console.log(formatPrice(1499));
console.log(formatPrice(25, "USD"));
