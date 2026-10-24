// 4.1 Arrays: ordered lists
// Run: node chapter-04-data-structures/01-arrays.js

const groceries = ["rice", "dal", "milk"];

console.log(groceries[0]);        // first item (index 0)
console.log(groceries.at(-1));    // last item
console.log(groceries.length);    // how many items

// Adding and removing at the end (fast).
groceries.push("eggs");
const removedLast = groceries.pop();
console.log("Removed:", removedLast, "->", groceries);

// Adding and removing at the start.
groceries.unshift("bread");
const removedFirst = groceries.shift();
console.log("Removed:", removedFirst, "->", groceries);

// Finding things.
console.log(groceries.includes("milk"));   // true
console.log(groceries.indexOf("dal"));     // 1

// splice changes the array: remove 1 item at index 1, insert two new ones.
groceries.splice(1, 1, "paneer", "curd");
console.log(groceries);

// slice copies part of an array without changing it.
console.log(groceries.slice(0, 2), groceries);

// Arrays can hold anything, including other arrays (a grid).
const ticTacToe = [
  ["X", "O", "X"],
  [" ", "X", "O"],
  ["O", " ", "X"],
];
console.log("Centre square:", ticTacToe[1][1]);
console.log(ticTacToe.map((row) => row.join("|")).join("\n"));

// Useful helpers.
console.log([3, 1, 2].toSorted());          // new sorted copy
console.log(["a", "b"].concat(["c"]));      // join arrays
console.log(Array.from({ length: 5 }, (_, i) => i * i)); // build an array
