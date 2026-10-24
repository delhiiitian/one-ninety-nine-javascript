// 1.7 Type conversion, truthy/falsy and equality
// Run: node chapter-01-basics/07-type-conversion.js

// Explicit conversion: you decide.
console.log(Number("42"));        // 42
console.log(Number("42px"));      // NaN
console.log(parseInt("42px"));    // 42 (reads digits until it stops)
console.log(parseFloat("3.5kg")); // 3.5
console.log(String(99));          // "99"
console.log(Boolean(""));         // false

// Implicit conversion: JavaScript decides (be careful!).
console.log("5" + 2);  // "52"  (+ with a string joins text)
console.log("5" - 2);  // 3     (- forces numbers)
console.log("5" * "2"); // 10

// Falsy values: false, 0, "", null, undefined, NaN (and 0n). Everything else is truthy.
const samples = { "0": 0, "1": 1, '""': "", '"hi"': "hi", null: null, undefined: undefined, NaN: NaN, "[]": [], "{}": {} };
for (const [label, value] of Object.entries(samples)) {
  console.log(label, "->", value ? "truthy" : "falsy");
}

// == converts types before comparing; === does not. Prefer ===.
console.log(0 == "0");   // true
console.log(0 === "0");  // false
console.log(null == undefined);  // true
console.log(null === undefined); // false

// Real use: form inputs always arrive as strings.
const ageInput = "17";
const age = Number(ageInput);
console.log(age >= 18 ? "Adult" : "Minor");
