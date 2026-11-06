// 2.6 The for loop: repeating a known number of times
// Run: node chapter-02-control-flow/06-for-loop.js

// for (start; keep going while; step)
for (let i = 1; i <= 5; i++) {
  console.log(`Push-up number ${i}`);
}

// Counting down.
for (let seconds = 3; seconds > 0; seconds--) {
  console.log(`${seconds}...`);
}
console.log("Lift off!");

// Looping over an array by index.
const fruits = ["mango", "banana", "guava"];
for (let i = 0; i < fruits.length; i++) {
  console.log(`${i + 1}. ${fruits[i]}`);
}

// Accumulating a total.
const prices = [120, 80, 45, 300];
let total = 0;
for (let i = 0; i < prices.length; i++) {
  total += prices[i];
}
console.log("Bill total:", total);

// Nested loops: a multiplication table.
for (let row = 1; row <= 3; row++) {
  let line = "";
  for (let col = 1; col <= 5; col++) {
    line += String(row * col).padStart(4);
  }
  console.log(line);
}
