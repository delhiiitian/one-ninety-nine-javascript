// 4.7 Map: key-value pairs with any type of key
// Run: node chapter-04-data-structures/07-maps.js

const phoneBook = new Map();
phoneBook.set("Asha", "98100 00001");
phoneBook.set("Bilal", "98100 00002");
phoneBook.set("Chen", "98100 00003");

console.log(phoneBook.get("Bilal"));   // look up by key
console.log(phoneBook.has("Zara"));    // false
console.log(phoneBook.size);           // 3

phoneBook.delete("Chen");

// Maps remember insertion order and are easy to loop over
for (const [person, number] of phoneBook) {
  console.log(`${person}: ${number}`);
}

// Keys can be anything: objects, numbers, even functions
const visits = new Map();
const userA = { id: 1 };
const userB = { id: 2 };
visits.set(userA, 3);
visits.set(userB, 1);
visits.set(userA, visits.get(userA) + 1);
console.log("User A visits:", visits.get(userA));

// Counting words: a classic Map job
const text = "the cat and the hat and the bat";
const wordCount = new Map();
for (const word of text.split(" ")) {
  wordCount.set(word, (wordCount.get(word) ?? 0) + 1);
}
console.log(wordCount);

// Converting between Map and plain objects / arrays
const asObject = Object.fromEntries(wordCount);
const backToMap = new Map(Object.entries(asObject));
console.log(asObject, backToMap.size);

// Sort a Map by value
const sorted = [...wordCount].sort((a, b) => b[1] - a[1]);
console.log("Most common word:", sorted[0][0]);
