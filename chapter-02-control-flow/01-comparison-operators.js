// 2.1 Comparison operators: asking yes/no questions
// Run: node chapter-02-control-flow/01-comparison-operators.js

const balance = 1200;
const price = 999;

console.log(balance > price);    // greater than
console.log(balance < price);    // less than
console.log(balance >= 1200);    // greater than or equal
console.log(price <= 1000);      // less than or equal
console.log(price === 999);      // strictly equal (same type and value)
console.log(price !== 500);      // strictly not equal

// Strings compare alphabetically, character by character (by Unicode code).
console.log("apple" < "banana"); // true
console.log("Zebra" < "apple");  // true: uppercase letters come first
console.log("10" < "9");         // true: text comparison, not numbers!
console.log(Number("10") < Number("9")); // false: compare numbers as numbers

// localeCompare sorts words the way people expect.
console.log("Zebra".localeCompare("apple", "en", { sensitivity: "base" })); // 1 => Zebra after apple

// Comparing objects checks identity, not contents.
const a = { size: "M" };
const b = { size: "M" };
console.log(a === b);   // false: two different boxes
console.log(a === a);   // true: the same box

// Real use: can the customer afford it?
const canBuy = balance >= price;
console.log(`Can buy: ${canBuy}`);
