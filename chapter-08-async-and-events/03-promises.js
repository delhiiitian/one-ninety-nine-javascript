// 8.3 Promises: a receipt for a future value
// Run: node chapter-08-async-and-events/03-promises.js

// A promise is like an order token at a food court:
// pending (cooking) -> fulfilled (food ready) or rejected (sold out).

function orderFood(dish) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (dish === "sold-out special") reject(new Error(`${dish} is sold out`));
      else resolve(`${dish} ready`);
    }, 100);
  });
}

const token = orderFood("pav bhaji");
console.log("Token state right away:", token); // Promise { <pending> }

token
  .then((meal) => {
    console.log("then:", meal);
    return orderFood("lassi"); // returning a promise chains the next step
  })
  .then((drink) => console.log("then:", drink))
  .catch((error) => console.log("catch:", error.message)) // handles any failure above
  .finally(() => console.log("finally: tray returned"));

orderFood("sold-out special")
  .then((meal) => console.log("never runs", meal))
  .catch((error) => console.log("catch:", error.message));

// Wrapping an old callback API in a promise ("promisifying").
import { promisify } from "node:util";
function legacyLookup(id, callback) {
  setTimeout(() => callback(null, { id, name: "Legacy User" }), 50);
}
const lookup = promisify(legacyLookup);
lookup(7).then((user) => console.log("promisified:", user));

// Ready-made promises
Promise.resolve(42).then((v) => console.log("Promise.resolve gave", v));
