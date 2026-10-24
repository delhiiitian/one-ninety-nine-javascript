// 3.2 Parameters, arguments, defaults and rest
// Run: node chapter-03-functions/02-parameters-and-defaults.js

// Parameters are the names in the definition; arguments are the values you pass.
function makeTea(sugarSpoons = 1, milk = true) {
  return `Tea with ${sugarSpoons} spoon(s) of sugar${milk ? " and milk" : ""}`;
}
console.log(makeTea());          // uses both defaults
console.log(makeTea(2));         // overrides the first
console.log(makeTea(0, false));  // overrides both

// Missing arguments become undefined; extra ones are ignored.
function show(a, b) {
  console.log("a =", a, "b =", b);
}
show(1);
show(1, 2, 3);

// Rest parameter: collect any number of arguments into an array.
function sum(...numbers) {
  let total = 0;
  for (const n of numbers) total += n;
  return total;
}
console.log(sum(5, 10));
console.log(sum(1, 2, 3, 4, 5));

// Options object: named settings are easier to read than many positional ones.
function bookFlight({ from, to, seat = "any", meal = "veg" }) {
  return `${from} -> ${to}, seat: ${seat}, meal: ${meal}`;
}
console.log(bookFlight({ from: "DEL", to: "BLR", seat: "window" }));

// Primitives are passed as copies; objects are passed as references.
function addBonus(employee) {
  employee.salary += 1000;
}
const staff = { name: "Neha", salary: 50000 };
addBonus(staff);
console.log(staff.salary); // 51000: the original object changed
