// 2.5 Ternary, nullish coalescing (??) and optional chaining (?.)
// Run: node chapter-02-control-flow/05-ternary-and-nullish.js

// Ternary: condition ? valueIfTrue : valueIfFalse
const age = 20;
const ticket = age >= 18 ? "Adult ticket" : "Child ticket";
console.log(ticket);

const itemsInCart = 1;
console.log(`You have ${itemsInCart} item${itemsInCart === 1 ? "" : "s"}`);

// ?? picks the right side only when the left is null or undefined.
// || picks the right side for ANY falsy value, including 0 and "".
const savedVolume = 0;
console.log("With ||:", savedVolume || 50); // 50 (wrong: user chose 0)
console.log("With ??:", savedVolume ?? 50); // 0  (correct)

// ?. stops safely when something in the chain is missing.
const order = { customer: { name: "Tara", address: null } };
console.log(order.customer?.name);               // "Tara"
console.log(order.customer?.address?.city);      // undefined instead of a crash
console.log(order.customer?.address?.city ?? "City not provided");

// Works with function calls and arrays too.
const settings = {};
settings.onSave?.();                 // does nothing, no error
console.log(order.items?.[0] ?? "No items yet");

// ??= assigns only when the value is missing.
const config = { theme: undefined };
config.theme ??= "light";
console.log(config.theme);
