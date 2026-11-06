// 3.5 Scope and hoisting: where a variable can be seen
// Run: node chapter-03-functions/05-scope-and-hoisting.js

const appName = "BudgetBuddy"; // module (global-like) scope: visible everywhere below

function showReport() {
  const month = "March"; // function scope: only inside showReport
  if (true) {
    const note = "inside a block"; // block scope: only inside these braces
    console.log(appName, month, note);
  }
  // console.log(note); // would be a ReferenceError
  console.log(appName, month);
}
showReport();

// Inner scopes can read outer variables, not the other way round.
function outer() {
  const secret = 42;
  function inner() {
    return `inner can see secret = ${secret}`;
  }
  return inner();
}
console.log(outer());

// Shadowing: an inner variable with the same name hides the outer one.
const level = "global";
function test() {
  const level = "local";
  return level;
}
console.log(test(), level);

// Hoisting: declarations are processed before the code runs.
console.log(typeof hoistedFunction); // "function": declarations are fully hoisted
function hoistedFunction() {}

console.log(oldVar); // undefined: var is hoisted but not its value
var oldVar = "now set";

try {
  console.log(newLet); // let/const live in a "temporal dead zone" until declared
} catch (error) {
  console.log("ReferenceError:", error.message);
}
let newLet = "declared";
