// 7.2 Named exports and imports (ES modules)
// Run: node chapter-07-modules-and-tooling/02-export-and-import.js

// Import exactly the names you need, in curly braces.
import { addGst, CURRENCY } from "./lib/money.js";

// Rename on import to avoid clashes or to be clearer.
import { formatRupees as rupees } from "./lib/money.js";

// Import everything as one namespace object.
import * as money from "./lib/money.js";

console.log(addGst(200), CURRENCY);
console.log(rupees(123456.5));
console.log("money module exports:", Object.keys(money));

// Import paths:
//   "./lib/money.js"  -> a file of yours (relative path, include the .js extension)
//   "node:fs"         -> a built-in Node.js module
//   "lodash"          -> a package installed from npm into node_modules

// ES modules are enabled by "type": "module" in package.json (see this repo's root).
// In a browser you write <script type="module" src="app.js"></script>.

// Imports are live and read-only: you cannot reassign an imported name.
try {
  // eslint-disable-next-line no-import-assign
  CURRENCY = "USD";
} catch (error) {
  console.log("Cannot reassign an import:", error.name);
}
