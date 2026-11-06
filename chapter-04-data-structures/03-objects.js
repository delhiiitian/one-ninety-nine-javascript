// 4.3 Objects: grouping related data with names
// Run: node chapter-04-data-structures/03-objects.js

const book = {
  title: "199 JavaScript",
  pages: 199,
  price: 1.99,
  author: { name: "Ashok", country: "India" },
  tags: ["beginner", "programming"],
};

// Reading properties: dot notation and bracket notation
console.log(book.title);
console.log(book["pages"]);
const field = "price";
console.log(book[field]);          // brackets work with variables
console.log(book.author.name);     // nested objects

// Adding, changing and deleting properties
book.edition = 1;
book.price = 2.49;
delete book.edition;
console.log(book);

// Checking whether a property exists
console.log("price" in book);              // true
console.log(Object.hasOwn(book, "isbn"));  // false

// Methods: functions stored on an object
const lamp = {
  isOn: false,
  toggle() {
    this.isOn = !this.isOn;   // `this` is the object the method was called on
    return this.isOn ? "Light on" : "Light off";
  },
};
console.log(lamp.toggle());
console.log(lamp.toggle());

// Shorthand: when the variable name matches the key
const name = "Kiran";
const role = "admin";
const user = { name, role };
console.log(user);

// Computed keys
const lang = "hi";
const greetings = { [lang]: "Namaste", en: "Hello" };
console.log(greetings.hi);
