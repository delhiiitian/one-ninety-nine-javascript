// 4.4 Working with objects: keys, values, entries, copying and freezing
// Run: node chapter-04-data-structures/04-object-methods.js

const prices = { tea: 20, coffee: 35, samosa: 15 };

console.log(Object.keys(prices));    // ["tea", "coffee", "samosa"]
console.log(Object.values(prices));  // [20, 35, 15]
console.log(Object.entries(prices)); // [["tea", 20], ...]

// Transform an object: entries -> map -> fromEntries
const discounted = Object.fromEntries(
  Object.entries(prices).map(([item, price]) => [item, price * 0.9]),
);
console.log("10% off:", discounted);

// Copying: spread makes a shallow copy (nested objects are still shared)
const original = { name: "Menu", items: prices };
const shallow = { ...original };
shallow.name = "Copy";
console.log(original.name, shallow.name);           // Menu Copy
console.log(original.items === shallow.items);      // true: shared inside

// structuredClone makes a deep copy (everything is independent)
const deep = structuredClone(original);
deep.items.tea = 999;
console.log("original tea still", original.items.tea);

// Merging objects: later keys win
const defaults = { theme: "light", fontSize: 14, language: "en" };
const userPrefs = { theme: "dark" };
const settings = { ...defaults, ...userPrefs };
console.log(settings);

// Freezing: make an object read-only
const constants = Object.freeze({ GST: 0.18 });
try {
  constants.GST = 0.5; // modules run in strict mode, so this throws
} catch (error) {
  console.log("Blocked:", error.message);
}
console.log("GST is still", constants.GST);
