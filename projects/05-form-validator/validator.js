// The validator: runs every rule on every field and collects all problems.
import { FieldError, FormValidationError, ServiceError } from "./errors.js";

// schema: { fieldName: [rule, rule, ...] }
export function validate(schema, form) {
  const fieldErrors = [];
  const clean = (value) => (typeof value === "string" ? value.trim() : value);

  for (const [field, rules] of Object.entries(schema)) {
    const value = clean(form[field]); // users often add stray spaces
    for (const rule of rules) {
      try {
        rule(value ?? "", form, field);
      } catch (error) {
        if (!(error instanceof FieldError)) {
          // A bug inside a rule is not the user's fault: wrap and rethrow.
          throw new ServiceError(`Rule for "${field}" crashed`, { cause: error });
        }
        fieldErrors.push(error);
        break; // first failing rule per field is enough; avoid piling up messages
      }
    }
  }

  if (fieldErrors.length > 0) throw new FormValidationError(fieldErrors);

  // Return a cleaned copy containing only the fields in the schema.
  return Object.fromEntries(Object.keys(schema).map((field) => [field, clean(form[field])]));
}

// Safe wrapper for callers who prefer a result object over exceptions.
export function check(schema, form) {
  try {
    return { ok: true, data: validate(schema, form) };
  } catch (error) {
    if (error instanceof FormValidationError) return { ok: false, ...error.toJSON() };
    throw error;
  }
}
