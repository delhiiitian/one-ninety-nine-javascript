import { test } from "node:test";
import assert from "node:assert/strict";
import { check, validate } from "./validator.js";
import { signupSchema } from "./signup.js";
import { FormValidationError, ServiceError } from "./errors.js";
import * as r from "./rules.js";

const good = {
  username: "ravi_k",
  email: "ravi@example.com",
  mobile: "+91 9876543210",
  age: "24",
  password: "Chai2Biscuit",
  confirmPassword: "Chai2Biscuit",
};

test("a valid form passes and comes back trimmed", () => {
  const data = validate(signupSchema, { ...good, username: "  ravi_k  ", extra: "ignored" });
  assert.equal(data.username, "ravi_k");
  assert.equal("extra" in data, false);
});

test("all problems are reported together, one per field", () => {
  const result = check(signupSchema, { ...good, email: "nope", age: "9", confirmPassword: "x" });
  assert.equal(result.ok, false);
  assert.deepEqual(Object.keys(result.fields).sort(), ["age", "confirmPassword", "email"]);
  assert.equal(result.fields.age.length, 1);
});

test("missing fields say they are required", () => {
  const result = check(signupSchema, {});
  assert.match(result.fields.username[0], /Username is required/);
  assert.equal(Object.keys(result.fields).length, 6);
});

test("taken usernames are rejected regardless of case", () => {
  assert.match(check(signupSchema, { ...good, username: "ASHA" }).fields.username[0], /taken/);
});

test("weak passwords list exactly what is missing", () => {
  const msg = check(signupSchema, { ...good, password: "abc", confirmPassword: "abc" }).fields.password[0];
  assert.match(msg, /8\+ characters, an uppercase letter, a number/);
});

test("validate throws a FormValidationError with field details", () => {
  assert.throws(() => validate(signupSchema, { ...good, mobile: "12345" }), (error) => {
    assert.ok(error instanceof FormValidationError);
    assert.equal(error.fieldErrors[0].field, "mobile");
    return true;
  });
});

test("a crashing rule becomes a ServiceError with the original cause", () => {
  const broken = { name: [() => { throw new TypeError("oops"); }] };
  assert.throws(() => validate(broken, { name: "x" }), (error) => {
    assert.ok(error instanceof ServiceError);
    assert.equal(error.cause.message, "oops");
    return true;
  });
});

test("integerBetween accepts boundaries and rejects decimals", () => {
  const rule = r.integerBetween(13, 120);
  assert.doesNotThrow(() => rule("13", {}, "age"));
  assert.throws(() => rule("13.5", {}, "age"), /whole number/);
});
