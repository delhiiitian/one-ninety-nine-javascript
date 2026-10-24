// Custom error types for the form validator.

// One field failed one rule.
export class FieldError extends Error {
  constructor(field, message, code) {
    super(message);
    this.name = "FieldError";
    this.field = field;
    this.code = code;
  }
}

// The whole form failed: carries every FieldError so the user can fix all at once.
export class FormValidationError extends Error {
  constructor(fieldErrors) {
    super(`${fieldErrors.length} field(s) need attention`);
    this.name = "FormValidationError";
    this.fieldErrors = fieldErrors;
  }

  // { email: ["Enter a valid email"], ... } is the shape front-end forms expect.
  toJSON() {
    const byField = {};
    for (const error of this.fieldErrors) {
      (byField[error.field] ??= []).push(error.message);
    }
    return { error: this.message, fields: byField };
  }
}

// Something outside the user's control went wrong (for example, a lookup service).
export class ServiceError extends Error {
  constructor(message, options) {
    super(message, options);
    this.name = "ServiceError";
  }
}
