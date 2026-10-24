// 5.2 try...catch: handling errors gracefully
// Run: node chapter-05-error-handling/02-try-catch.js

// Without try/catch, one bad record would crash the whole program.
const rawRecords = [
  '{"name": "Asha", "score": 90}',
  "{this is not json}",
  '{"name": "Bilal", "score": 75}',
];

const valid = [];
for (const raw of rawRecords) {
  try {
    valid.push(JSON.parse(raw));
  } catch (error) {
    console.log(`Skipping bad record (${error.name}):`, raw);
  }
}
console.log("Loaded:", valid.map((r) => r.name));

// catch receives the error object; you choose what to do with it.
function safeDivide(a, b) {
  try {
    if (b === 0) throw new Error("Cannot divide by zero");
    return a / b;
  } catch (error) {
    console.log("Problem:", error.message);
    return null; // a safe fallback value
  }
}
console.log(safeDivide(10, 2));
console.log(safeDivide(10, 0));

// Only wrap the risky part, and react to the type of error.
function readSetting(json, key) {
  let data;
  try {
    data = JSON.parse(json);
  } catch (error) {
    if (error instanceof SyntaxError) return "default";
    throw error; // something unexpected: let it bubble up
  }
  return data[key] ?? "default";
}
console.log(readSetting('{"theme":"dark"}', "theme"));
console.log(readSetting("broken", "theme"));

// Optional catch binding: skip the variable if you do not need it.
let ok;
try {
  JSON.parse("{");
  ok = true;
} catch {
  ok = false;
}
console.log("Parsed OK?", ok);
