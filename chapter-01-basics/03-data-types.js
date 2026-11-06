// 1.3 Data types: the kinds of values JavaScript understands
// Run: node chapter-01-basics/03-data-types.js

const name = "Riya";            // string
const age = 28;                 // number (integers and decimals share one type)
const height = 1.65;            // number
const isMember = true;          // boolean
let nickname;                   // undefined (declared, no value yet)
const middleName = null;        // null (deliberately empty)
const bigNumber = 9007199254740993n; // bigint (very large whole numbers)
const id = Symbol("id");        // symbol (unique key, rarely needed by beginners)

// typeof tells you the type of a value.
console.log(typeof name);       // "string"
console.log(typeof age);        // "number"
console.log(typeof height);     // "number"
console.log(typeof isMember);   // "boolean"
console.log(typeof nickname);   // "undefined"
console.log(typeof middleName); // "object"  <- a famous historical quirk
console.log(typeof bigNumber);  // "bigint"
console.log(typeof id);         // "symbol"

// Objects and arrays group values together.
const user = { name, age };
const hobbies = ["chess", "cycling"];
console.log(typeof user);              // "object"
console.log(Array.isArray(hobbies));   // true: the reliable way to detect arrays

// Primitives are copied; objects are shared by reference.
let a = 5;
let b = a;
b = 10;
console.log("a is still", a);

const original = { city: "Pune" };
const sameObject = original;
sameObject.city = "Delhi";
console.log("original.city changed to", original.city);
