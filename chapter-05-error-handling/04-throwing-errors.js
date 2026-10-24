// 5.4 throw: raising your own errors
// Run: node chapter-05-error-handling/04-throwing-errors.js

// Throw when a function cannot do its job. Callers decide how to react.
function withdraw(balance, amount) {
  if (typeof amount !== "number" || Number.isNaN(amount)) {
    throw new TypeError("Amount must be a number");
  }
  if (amount <= 0) {
    throw new RangeError("Amount must be greater than zero");
  }
  if (amount > balance) {
    throw new Error(`Insufficient funds: balance ${balance}, requested ${amount}`);
  }
  return balance - amount;
}

const attempts = [200, 5000, -10, "fifty"];
for (const amount of attempts) {
  try {
    const left = withdraw(1000, amount);
    console.log(`Withdrew ${amount}, left ${left}`);
  } catch (error) {
    console.log(`${error.name}: ${error.message}`);
  }
}

// Always throw Error objects (not plain strings) so you get a name and a stack.
try {
  throw "something bad"; // works, but carries no stack trace
} catch (error) {
  console.log(typeof error, "- no stack available:", error.stack === undefined);
}

// Errors bubble up through function calls until someone catches them.
function level3() { throw new Error("Deep problem"); }
function level2() { level3(); }
function level1() { level2(); }
try {
  level1();
} catch (error) {
  console.log("Caught at the top:", error.message);
}

// Adding context with `cause` (keeps the original error attached)
function loadProfile(json) {
  try {
    return JSON.parse(json);
  } catch (error) {
    throw new Error("Could not load profile", { cause: error });
  }
}
try {
  loadProfile("{");
} catch (error) {
  console.log(error.message, "<- caused by", error.cause.name);
}
