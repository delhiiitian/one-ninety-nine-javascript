// 3.7 Callbacks and higher-order functions
// Run: node chapter-03-functions/07-higher-order-functions.js

// A higher-order function takes a function as input or returns one.
// The function you pass in is called a callback.
function repeat(times, action) {
  for (let i = 1; i <= times; i++) action(i);
}
repeat(3, (n) => console.log(`Reminder #${n}: drink water`));

// Built-in higher-order functions on arrays.
const orders = [
  { id: 1, item: "Pizza", amount: 450, delivered: true },
  { id: 2, item: "Burger", amount: 180, delivered: false },
  { id: 3, item: "Biryani", amount: 320, delivered: true },
];

const delivered = orders.filter((order) => order.delivered);
const names = delivered.map((order) => order.item);
const revenue = delivered.reduce((sum, order) => sum + order.amount, 0);
console.log("Delivered:", names, "Revenue:", revenue);

orders.forEach((order) => console.log(`#${order.id} ${order.item}`));
console.log("Any big order?", orders.some((o) => o.amount > 400));
console.log("All paid above 100?", orders.every((o) => o.amount > 100));
console.log("First pending:", orders.find((o) => !o.delivered)?.item);

// Sorting with a compare callback (copy first so the original stays intact).
const byAmount = [...orders].sort((a, b) => a.amount - b.amount);
console.log(byAmount.map((o) => `${o.item}:${o.amount}`).join(", "));

// Returning functions: compose small steps into a pipeline.
const pipe = (...steps) => (value) => steps.reduce((acc, step) => step(acc), value);
const cleanUsername = pipe(
  (s) => s.trim(),
  (s) => s.toLowerCase(),
  (s) => s.replace(/\s+/g, "_"),
);
console.log(cleanUsername("  Ada Lovelace "));
