// Form Validator demo: three people try to sign up.
// Run: node projects/05-form-validator/demo.js

import { check, validate } from "./validator.js";
import { signupSchema } from "./signup.js";
import { FormValidationError } from "./errors.js";

const attempts = [
  {
    username: "ravi_k",
    email: "ravi@example.com",
    mobile: "98765 43210".replace(" ", ""),
    age: "24",
    password: "Chai2Biscuit",
    confirmPassword: "Chai2Biscuit",
  },
  {
    username: "asha",
    email: "asha@",
    mobile: "12345",
    age: "eleven",
    password: "password",
    confirmPassword: "Password",
  },
  { username: "  ", email: "", age: 200 },
];

for (const form of attempts) {
  try {
    const user = validate(signupSchema, form);
    console.log("Account created for", user.username);
  } catch (error) {
    if (error instanceof FormValidationError) {
      console.log(`\n${error.message}:`);
      for (const e of error.fieldErrors) console.log(`  - ${e.field.padEnd(16)} ${e.message}`);
    } else {
      throw error; // unexpected: let it crash loudly
    }
  }
}

// The same result as JSON, the way an API would send it to a web page.
console.log("\nAPI response:", JSON.stringify(check(signupSchema, attempts[1]), null, 2));
