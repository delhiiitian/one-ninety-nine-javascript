// 4.5 Destructuring: unpacking values into variables
// Run: node chapter-04-data-structures/05-destructuring.js

// Object destructuring: pick properties by name
const movie = { title: "Lagaan", year: 2001, rating: 8.1, language: "Hindi" };
const { title, year } = movie;
console.log(title, year);

// Rename and give default values
const { rating: imdb, director = "Unknown" } = movie;
console.log(imdb, director);

// Nested destructuring
const order = { id: 7, customer: { name: "Sana", address: { city: "Kochi" } } };
const { customer: { name, address: { city } } } = order;
console.log(name, city);

// Array destructuring: pick by position
const podium = ["Gold: Neeraj", "Silver: Arshad", "Bronze: Jakub"];
const [first, second] = podium;
console.log(first, "|", second);

// Skip items and collect the rest
const [, , third] = podium;
const [winner, ...others] = podium;
console.log(third, "|", winner, "|", others);

// Swapping two variables without a temporary one
let left = "L";
let right = "R";
[left, right] = [right, left];
console.log(left, right);

// In function parameters (very common in real code)
function printMovie({ title, year, language = "English" }) {
  console.log(`${title} (${year}) - ${language}`);
}
printMovie(movie);

// Looping over entries
for (const [key, value] of Object.entries({ cpu: "M3", ram: "16GB" })) {
  console.log(`${key} = ${value}`);
}
