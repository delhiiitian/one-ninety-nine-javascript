// 1.4 Numbers and math
// Run: node chapter-01-basics/04-numbers-and-math.js

const price = 250;
const quantity = 3;

console.log("Add:", price + 50);
console.log("Subtract:", price - 50);
console.log("Multiply:", price * quantity);
console.log("Divide:", price / 4);
console.log("Remainder:", 17 % 5);       // 2, useful for "every Nth item"
console.log("Power:", 2 ** 10);          // 1024

// Order of operations follows school math: brackets first, then * and /, then + and -.
console.log("Total with tax:", (price * quantity) * 1.18);

// Decimals are stored in binary, so some results are slightly off.
console.log(0.1 + 0.2);                          // 0.30000000000000004
console.log((0.1 + 0.2).toFixed(2));             // "0.30" (a string)
// Money tip: work in the smallest unit (paise, cents) using whole numbers.
const totalPaise = 1099 + 2050;
console.log("Total:", totalPaise / 100, "rupees");

// The Math object has ready-made helpers.
console.log(Math.round(4.6), Math.floor(4.6), Math.ceil(4.1));
console.log(Math.max(3, 9, 2), Math.min(3, 9, 2));
console.log(Math.sqrt(81), Math.abs(-7));

// Random whole number between 1 and 6, like a dice roll.
const dice = Math.floor(Math.random() * 6) + 1;
console.log("Dice roll:", dice);

// Special number values.
console.log(10 / 0);              // Infinity
console.log(Number("abc"));       // NaN means "Not a Number"
console.log(Number.isNaN(Number("abc"))); // true
