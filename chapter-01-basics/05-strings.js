// 1.5 Strings: working with text
// Run: node chapter-01-basics/05-strings.js

const message = "  Learn JavaScript in 199 Pages  ";

console.log(message.length);              // count of characters, spaces included
console.log(message.trim());              // remove spaces at both ends
console.log(message.toUpperCase());
console.log(message.toLowerCase());

const title = message.trim();
console.log(title[0]);                     // "L": strings are indexed from 0
console.log(title.at(-1));                 // "s": last character
console.log(title.includes("Java"));       // true
console.log(title.startsWith("Learn"));    // true
console.log(title.indexOf("199"));         // position of "199"
console.log(title.slice(6, 16));           // "JavaScript"
console.log(title.replace("199", "one hundred ninety-nine"));

// split turns text into a list; join glues a list back into text.
const csvLine = "Asha,Bilal,Chen";
const names = csvLine.split(",");
console.log(names);
console.log(names.join(" | "));

// Joining strings with +
const first = "Grace";
const last = "Hopper";
console.log(first + " " + last);

// Strings cannot be changed in place; methods return new strings.
const word = "cat";
const louder = word.toUpperCase();
console.log(word, louder);

// Padding is handy for receipts and tables.
console.log("Tea".padEnd(10, ".") + "20".padStart(5));
console.log("Cake".padEnd(10, ".") + "150".padStart(5));
