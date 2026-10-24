// Reusable validation rules. Each rule returns a function (value, form) that
// throws a FieldError when the value is not acceptable.
import { FieldError } from "./errors.js";

export const required = (label) => (value, form, field) => {
  if (value === undefined || value === null || String(value).trim() === "") {
    throw new FieldError(field, `${label} is required`, "required");
  }
};

export const minLength = (n) => (value, form, field) => {
  if (String(value).trim().length < n) {
    throw new FieldError(field, `Must be at least ${n} characters`, "too_short");
  }
};

export const matches = (pattern, message) => (value, form, field) => {
  if (!pattern.test(String(value))) throw new FieldError(field, message, "format");
};

export const email = () =>
  matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Enter a valid email like name@example.com");

export const indianMobile = () =>
  matches(/^(\+91[\s-]?)?[6-9]\d{9}$/, "Enter a 10-digit mobile number starting with 6-9");

export const integerBetween = (min, max) => (value, form, field) => {
  const n = Number(value);
  if (!Number.isInteger(n)) throw new FieldError(field, "Must be a whole number", "not_integer");
  if (n < min || n > max) throw new FieldError(field, `Must be between ${min} and ${max}`, "out_of_range");
};

export const strongPassword = () => (value, form, field) => {
  const problems = [];
  if (value.length < 8) problems.push("8+ characters");
  if (!/[A-Z]/.test(value)) problems.push("an uppercase letter");
  if (!/[a-z]/.test(value)) problems.push("a lowercase letter");
  if (!/\d/.test(value)) problems.push("a number");
  if (problems.length) {
    throw new FieldError(field, `Password needs ${problems.join(", ")}`, "weak_password");
  }
};

export const sameAs = (otherField, label) => (value, form, field) => {
  if (value !== form[otherField]) throw new FieldError(field, `Must match ${label}`, "mismatch");
};

export const notIn = (takenValues, message) => (value, form, field) => {
  if (takenValues.has(String(value).trim().toLowerCase())) throw new FieldError(field, message, "taken");
};
