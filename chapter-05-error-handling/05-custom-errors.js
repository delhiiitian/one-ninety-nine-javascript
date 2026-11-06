// 5.5 Custom error classes
// Run: node chapter-05-error-handling/05-custom-errors.js

// Extend Error to create errors that describe YOUR problem domain.
class ValidationError extends Error {
  constructor(field, message) {
    super(message);
    this.name = "ValidationError";
    this.field = field; // extra data for whoever catches it
  }
}

class NotFoundError extends Error {
  constructor(resource, id) {
    super(`${resource} with id ${id} was not found`);
    this.name = "NotFoundError";
    this.status = 404;
  }
}

const users = new Map([[1, { id: 1, email: "asha@example.com" }]]);

function updateEmail(id, email) {
  if (!email.includes("@")) {
    throw new ValidationError("email", "Email must contain @");
  }
  const user = users.get(id);
  if (!user) throw new NotFoundError("User", id);
  user.email = email;
  return user;
}

// The caller reacts differently to each kind of error.
function handle(id, email) {
  try {
    const user = updateEmail(id, email);
    console.log("Updated:", user.email);
  } catch (error) {
    if (error instanceof ValidationError) {
      console.log(`Show under the ${error.field} box: ${error.message}`);
    } else if (error instanceof NotFoundError) {
      console.log(`HTTP ${error.status}: ${error.message}`);
    } else {
      throw error; // unknown problem: do not hide it
    }
  }
}

handle(1, "asha.new@example.com");
handle(1, "not-an-email");
handle(99, "ghost@example.com");

console.log(new ValidationError("x", "y") instanceof Error); // true
