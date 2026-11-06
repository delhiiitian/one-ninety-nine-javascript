// 2.7 while and do...while: repeat until a condition changes
// Run: node chapter-02-control-flow/07-while-and-do-while.js

// while checks the condition BEFORE each round.
let savings = 1000;
let months = 0;
while (savings < 2000) {
  savings = savings * 1.1; // 10% growth per month (very optimistic!)
  months++;
}
console.log(`Savings doubled after ${months} months: ${savings.toFixed(2)}`);

// do...while runs the body at least once, THEN checks.
let attempts = 0;
let roll;
do {
  roll = Math.floor(Math.random() * 6) + 1;
  attempts++;
} while (roll !== 6);
console.log(`Rolled a 6 after ${attempts} attempt(s)`);

// Processing a queue until it is empty.
const queue = ["Order #1", "Order #2", "Order #3"];
while (queue.length > 0) {
  const next = queue.shift();
  console.log("Processing", next);
}

// Always make sure the condition can become false, or the loop never ends.
let fuel = 3;
while (fuel > 0) {
  console.log("Driving... fuel left:", fuel);
  fuel--; // without this line the car drives forever
}
