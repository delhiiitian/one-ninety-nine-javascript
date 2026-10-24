// 3.4 Arrow functions: the short way to write functions
// Run: node chapter-03-functions/04-arrow-functions.js

// Regular function expression
const addRegular = function (a, b) {
  return a + b;
};

// Arrow function with a body
const addArrow = (a, b) => {
  return a + b;
};

// Arrow function with an implicit return (no braces, no return keyword)
const add = (a, b) => a + b;

// One parameter: brackets are optional
const double = n => n * 2;

// No parameters: empty brackets
const rollDice = () => Math.floor(Math.random() * 6) + 1;

// Returning an object needs round brackets around it
const makeUser = (name) => ({ name, createdAt: "2026-01-01" });

console.log(addRegular(2, 3), addArrow(2, 3), add(2, 3));
console.log(double(21));
console.log("Dice:", rollDice());
console.log(makeUser("Zoya"));

// Arrow functions shine as short callbacks.
const prices = [100, 250, 75];
const withTax = prices.map(price => price * 1.18);
console.log(withTax);

// Difference: arrows do not have their own `this`. They use the surrounding one.
const timer = {
  seconds: 0,
  tick() {
    [1, 2, 3].forEach(() => {
      this.seconds++; // `this` is still the timer object
    });
    return this.seconds;
  },
};
console.log("Timer ticked to", timer.tick());
