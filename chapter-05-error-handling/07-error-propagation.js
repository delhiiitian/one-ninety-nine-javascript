// 5.7 Error propagation: where should errors be handled?
// Run: node chapter-05-error-handling/07-error-propagation.js

// Low-level functions throw. High-level code decides what the user sees.
// Think of a restaurant: the cook reports "no paneer left",
// the waiter decides how to tell the customer.

const inventory = { paneer: 0, rice: 10 };

// Layer 1: data access (throws, does not print)
function takeIngredient(name) {
  if (!(name in inventory)) throw new Error(`Unknown ingredient: ${name}`);
  if (inventory[name] === 0) throw new Error(`Out of ${name}`);
  inventory[name]--;
}

// Layer 2: business logic (adds context, passes it on)
function cookDish(dish) {
  const recipes = { "paneer tikka": ["paneer"], "jeera rice": ["rice"] };
  const needs = recipes[dish];
  if (!needs) throw new Error(`We do not serve ${dish}`);
  try {
    needs.forEach(takeIngredient);
  } catch (error) {
    throw new Error(`Cannot cook ${dish}`, { cause: error });
  }
  return `${dish} is ready`;
}

// Layer 3: the edge that talks to people (catches and responds)
function placeOrder(dish) {
  try {
    return { ok: true, message: cookDish(dish) };
  } catch (error) {
    const reason = error.cause ? ` (${error.cause.message})` : "";
    return { ok: false, message: `Sorry! ${error.message}${reason}` };
  }
}

console.log(placeOrder("jeera rice"));
console.log(placeOrder("paneer tikka"));
console.log(placeOrder("pizza"));

// Last line of defence: log anything nobody else caught.
process.on("uncaughtException", (error) => {
  console.log("Unexpected crash prevented from being silent:", error.message);
});
setTimeout(() => {
  throw new Error("Bug inside a timer");
}, 0);
