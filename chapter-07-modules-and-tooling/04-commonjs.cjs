// 7.4 CommonJS: require and module.exports (the classic Node.js module system)
// Run: node chapter-07-modules-and-tooling/04-commonjs.cjs

// You will meet CommonJS in older projects and many npm packages.
// .cjs files always use CommonJS; .mjs files always use ES modules;
// .js files follow the "type" field in package.json.

const { celsiusToFahrenheit, fahrenheitToCelsius } = require("./lib/temperature.cjs");
const path = require("node:path");

console.log("30 C =", celsiusToFahrenheit(30), "F");
console.log("98.6 F =", fahrenheitToCelsius(98.6).toFixed(1), "C");

// In CommonJS, __dirname and __filename are available automatically.
console.log("This file:", path.basename(__filename));

// require is synchronous and can be called anywhere, even inside an if.
if (process.platform) {
  const os = require("node:os");
  console.log("CPU cores:", os.cpus().length);
}

// Side by side:
//   CommonJS                          ES modules
//   const x = require("./x.cjs")      import x from "./x.js"
//   module.exports = { a, b }         export { a, b }
//   exports.a = a                     export const a = ...
console.log("Recommendation: use ES modules for new code.");
