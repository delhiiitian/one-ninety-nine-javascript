// 4.8 Set: a collection of unique values
// Run: node chapter-04-data-structures/08-sets.js

const visitors = new Set();
visitors.add("asha@example.com");
visitors.add("bilal@example.com");
visitors.add("asha@example.com"); // duplicate: ignored
console.log("Unique visitors:", visitors.size); // 2
console.log(visitors.has("bilal@example.com"));

visitors.delete("bilal@example.com");
console.log([...visitors]);

// Removing duplicates from an array in one line
const tags = ["js", "node", "js", "web", "node"];
const uniqueTags = [...new Set(tags)];
console.log(uniqueTags);

// Set math with filter (works everywhere)
const likesTea = new Set(["Asha", "Bilal", "Chen"]);
const likesCoffee = new Set(["Chen", "Divya"]);
const both = [...likesTea].filter((p) => likesCoffee.has(p));
const either = new Set([...likesTea, ...likesCoffee]);
const onlyTea = [...likesTea].filter((p) => !likesCoffee.has(p));
console.log("Both:", both);
console.log("Either:", [...either]);
console.log("Only tea:", onlyTea);

// Built-in set methods (Node 22+, modern browsers)
if (typeof likesTea.intersection === "function") {
  console.log("intersection():", [...likesTea.intersection(likesCoffee)]);
}

// Real use: track which steps of an onboarding are done
const completed = new Set();
completed.add("verify-email").add("add-photo");
const required = ["verify-email", "add-photo", "set-password"];
const pending = required.filter((step) => !completed.has(step));
console.log("Still to do:", pending);
