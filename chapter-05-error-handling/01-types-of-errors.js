// 5.1 What errors are and the common types
// Run: node chapter-05-error-handling/01-types-of-errors.js

// Each experiment below fails on purpose. We catch the error to inspect it.
function inspect(label, risky) {
  try {
    risky();
  } catch (error) {
    console.log(`${label.padEnd(16)} ${error.name}: ${error.message}`);
  }
}

// ReferenceError: using a name that does not exist
inspect("Unknown name", () => totalPrise + 1); // eslint-disable-line no-undef

// TypeError: using a value in a way its type does not allow
inspect("Wrong type", () => null.length);
inspect("Not a function", () => (42)());

// RangeError: a number outside the allowed range
inspect("Bad range", () => new Array(-1));
inspect("Too precise", () => (3.14159).toFixed(200));

// SyntaxError: code (or JSON) that cannot be understood
inspect("Bad JSON", () => JSON.parse("{oops}"));
inspect("Bad code", () => new Function("let = ;"));

// Every error object carries useful information
try {
  undefined.toUpperCase();
} catch (error) {
  console.log("name:   ", error.name);
  console.log("message:", error.message);
  console.log("stack:  ", error.stack.split("\n")[1].trim()); // where it happened
}

// Not every mistake throws: some quietly give odd results
console.log("Silent bugs:", "5" * "x", [] + {}, undefined + 1);
