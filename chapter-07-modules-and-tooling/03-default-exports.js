// 7.3 Default exports
// Run: node chapter-07-modules-and-tooling/03-default-exports.js

// A default import has no curly braces, and YOU choose its name.
import greet from "./lib/greeter.js";
import sayHello from "./lib/greeter.js"; // same function, different local name

// Default and named imports together
import welcome, { supportedLanguages } from "./lib/greeter.js";

console.log(greet("Farah"));
console.log(sayHello("Gopal", "evening"));
console.log(welcome("Hana", "morning"), supportedLanguages);
console.log("Same function?", greet === sayHello);

// When to use which:
//   default export -> the module is about ONE main thing (a component, a class, a function)
//   named exports  -> the module offers several helpers (utils, constants)
// Many teams prefer named exports everywhere because names stay consistent across files.

// Dynamic import: load a module only when needed (returns a promise).
const { median } = await import("./lib/stats.js");
console.log("Median loaded on demand:", median([7, 1, 5]));
