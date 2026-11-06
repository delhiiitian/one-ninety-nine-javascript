// 4.6 Spread (...) and rest (...)
// Run: node chapter-04-data-structures/06-spread-and-rest.js

// SPREAD expands a collection into individual items.
const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const weekend = ["Sat", "Sun"];
const week = [...weekdays, ...weekend];
console.log(week);

// Copy an array (so changes do not affect the original)
const copy = [...weekdays];
copy.push("Extra");
console.log(weekdays.length, copy.length);

// Pass array items as separate arguments
const temperatures = [31, 28, 35, 33];
console.log("Max temp:", Math.max(...temperatures));

// Spread a string into characters
console.log([..."hello"]);

// Spread objects to copy and override
const baseCar = { wheels: 4, color: "white", fuel: "petrol" };
const myCar = { ...baseCar, color: "red", sunroof: true };
console.log(myCar);

// REST collects the remaining items into one variable.
const [captain, ...team] = ["Rohit", "Virat", "Jasprit", "Shubman"];
console.log("Captain:", captain, "Team:", team);

const { password, ...safeUser } = { name: "Ira", email: "ira@example.com", password: "s3cret" };
console.log("Safe to send to the browser:", safeUser);

// Rest parameters in functions
function logAll(label, ...messages) {
  for (const msg of messages) console.log(`[${label}] ${msg}`);
}
logAll("INFO", "Server started", "Listening on port 3000");
