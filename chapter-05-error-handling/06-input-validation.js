// 5.6 Input validation: stop bad data at the door
// Run: node chapter-05-error-handling/06-input-validation.js

// Collect every problem instead of stopping at the first one,
// so the user can fix the whole form in one go.
function validateSignup(form) {
  const errors = {};

  const name = String(form.name ?? "").trim();
  if (name.length < 2) errors.name = "Name must have at least 2 characters";

  const email = String(form.email ?? "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email";

  const age = Number(form.age);
  if (!Number.isInteger(age)) errors.age = "Age must be a whole number";
  else if (age < 13 || age > 120) errors.age = "Age must be between 13 and 120";

  const password = String(form.password ?? "");
  if (password.length < 8) errors.password = "Password needs 8+ characters";
  else if (!/\d/.test(password)) errors.password = "Password needs a number";

  return { valid: Object.keys(errors).length === 0, errors, data: { name, email, age } };
}

const goodForm = { name: "Ritu", email: "ritu@example.com", age: "29", password: "mango2024" };
const badForm = { name: "R", email: "ritu@", age: "abc", password: "short" };

console.log(validateSignup(goodForm));
console.log(validateSignup(badForm));

// Validate early, then trust the data inside your program ("guard at the gate").
function createAccount(form) {
  const result = validateSignup(form);
  if (!result.valid) {
    const error = new Error("Invalid signup form");
    error.details = result.errors;
    throw error;
  }
  return { id: Date.now(), ...result.data };
}

try {
  createAccount(badForm);
} catch (error) {
  console.log(error.message, Object.keys(error.details));
}
