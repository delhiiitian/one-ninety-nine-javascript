// 5.3 finally: code that always runs
// Run: node chapter-05-error-handling/03-finally.js

// finally runs whether the try succeeded, failed, or returned early.
function processPayment(amount) {
  console.log(`\nStarting payment of ${amount}`);
  const spinner = { visible: true };
  try {
    if (amount <= 0) throw new Error("Invalid amount");
    console.log("Payment successful");
    return "paid";
  } catch (error) {
    console.log("Payment failed:", error.message);
    return "failed";
  } finally {
    spinner.visible = false; // clean-up happens on every path
    console.log("Spinner hidden:", !spinner.visible);
  }
}

console.log("Result:", processPayment(500));
console.log("Result:", processPayment(-5));

// Typical use: release a resource you opened.
class FakeConnection {
  constructor() {
    this.open = true;
    console.log("\nConnection opened");
  }
  query(sql) {
    if (sql.includes("DROP")) throw new Error("Dangerous query blocked");
    return [{ id: 1 }];
  }
  close() {
    this.open = false;
    console.log("Connection closed");
  }
}

function runQuery(sql) {
  const connection = new FakeConnection();
  try {
    return connection.query(sql);
  } finally {
    connection.close(); // never leak a connection
  }
}

console.log(runQuery("SELECT * FROM users"));
try {
  runQuery("DROP TABLE users");
} catch (error) {
  console.log("Caller saw:", error.message);
}
