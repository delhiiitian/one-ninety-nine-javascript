// 5.9 Logging errors so you can fix them later
// Run: node chapter-05-error-handling/09-logging-errors.js

// A tiny structured logger: one JSON line per event is easy to search later.
function log(level, message, extra = {}) {
  const entry = { time: new Date().toISOString(), level, message, ...extra };
  const output = level === "error" ? console.error : console.log;
  output(JSON.stringify(entry));
}

// Turn an Error into plain data (Error properties are not JSON-friendly by default).
function serializeError(error) {
  return {
    name: error.name,
    message: error.message,
    stack: error.stack?.split("\n").slice(0, 3).join(" | "),
    ...(error.cause && { cause: serializeError(error.cause) }),
  };
}

console.log(JSON.stringify(new Error("hidden"))); // {} : why we need serializeError

function chargeCard(orderId, amount) {
  if (amount > 10000) {
    throw new Error("Card limit exceeded", { cause: new RangeError(`amount=${amount}`) });
  }
  return "charged";
}

for (const [orderId, amount] of [["A-1", 500], ["A-2", 25000]]) {
  try {
    log("info", "Charging card", { orderId, amount });
    chargeCard(orderId, amount);
    log("info", "Charge OK", { orderId });
  } catch (error) {
    // Log the details for developers, show a friendly message to users.
    log("error", "Charge failed", { orderId, error: serializeError(error) });
    console.log(`User sees: "Payment for ${orderId} failed. You were not charged."`);
  }
}

// console.time helps find slow code; console.trace prints the call path.
console.time("work");
let sum = 0;
for (let i = 0; i < 1e6; i++) sum += i;
console.timeEnd("work");
