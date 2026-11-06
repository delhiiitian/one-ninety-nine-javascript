// 2.2 Logical operators: AND, OR, NOT
// Run: node chapter-02-control-flow/02-logical-operators.js

const hasTicket = true;
const hasId = false;
const isVip = true;

console.log(hasTicket && hasId);   // AND: both must be true -> false
console.log(hasTicket || hasId);   // OR: at least one true  -> true
console.log(!hasId);               // NOT: flips the value   -> true

// Combining conditions (use brackets to make intent clear).
const canEnter = (hasTicket && hasId) || isVip;
console.log("Can enter:", canEnter);

// Short-circuiting: JavaScript stops as soon as it knows the answer.
// || returns the first truthy value, && returns the first falsy value.
const userName = "";
console.log("Hello,", userName || "guest");           // fallback value

const user = { isLoggedIn: true, name: "Kabir" };
user.isLoggedIn && console.log("Welcome back,", user.name); // run only if logged in

// Real use: validate a password in one readable expression.
const password = "Secret123";
const isStrong =
  password.length >= 8 &&
  /[A-Z]/.test(password) &&
  /[0-9]/.test(password);
console.log("Strong password:", isStrong);
