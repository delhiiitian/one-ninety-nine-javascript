// The signup form's schema, built from the reusable rules.
import * as r from "./rules.js";

export const existingUsernames = new Set(["admin", "root", "asha"]);

export const signupSchema = {
  username: [
    r.required("Username"),
    r.minLength(3),
    r.matches(/^[a-z0-9_]+$/i, "Use only letters, numbers and _"),
    r.notIn(existingUsernames, "That username is taken"),
  ],
  email: [r.required("Email"), r.email()],
  mobile: [r.required("Mobile number"), r.indianMobile()],
  age: [r.required("Age"), r.integerBetween(13, 120)],
  password: [r.required("Password"), r.strongPassword()],
  confirmPassword: [r.required("Password confirmation"), r.sameAs("password", "password")],
};
