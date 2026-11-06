# Project 5: Signup Form Validator

A validation engine for a website signup form. It checks username, email, Indian mobile number, age and password, reports every problem at once in a shape web pages can display, and separates "the user typed something wrong" from "our code broke".

Book: Chapter 5 (Error handling), Project 5.

## Run it

```bash
node projects/05-form-validator/demo.js
node --test projects/05-form-validator/*.test.js
```

## Files

| File | Job |
| --- | --- |
| `errors.js` | Custom errors: `FieldError`, `FormValidationError`, `ServiceError` |
| `rules.js` | Reusable rules (`required`, `email`, `strongPassword`, ...) that throw `FieldError` |
| `validator.js` | `validate()` collects all field errors and throws one `FormValidationError`; `check()` returns a result object instead |
| `signup.js` | The signup form's schema |
| `demo.js` | Three sign-up attempts, from perfect to messy |
| `validator.test.js` | Tests |

## Concepts used

`try`/`catch`/`finally`, `throw`, custom error classes, `instanceof`, error `cause`, input validation, error propagation between layers.
