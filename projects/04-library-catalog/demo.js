// Library Catalog demo
// Run: node projects/04-library-catalog/demo.js

import fs from "node:fs";
import path from "node:path";
import { createCatalog } from "./catalog.js";

const catalog = createCatalog();
const data = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, "books.json"), "utf8"));
data.forEach(catalog.addBook);

const show = (books) => books.map((b) => `  ${b.title} - ${b.author} (${b.available}/${b.copies})`).join("\n");

console.log("Search 'java':\n" + show(catalog.search({ text: "java" })));
console.log("Tag 'booker':\n" + show(catalog.search({ tag: "booker" })));

catalog.borrow("asha", "9780143417057");
catalog.borrow("asha", "9780593230572");
catalog.borrow("bilal", "9780593230572");
try {
  catalog.borrow("chen", "9780143417057"); // only one copy, already borrowed
} catch (error) {
  console.log("Cannot borrow:", error.message);
}
catalog.giveBack("asha", "9780143417057");
catalog.borrow("chen", "9780143417057");

console.log("Asha has:", catalog.loansOf("asha"));
console.log("Available fiction:\n" + show(catalog.search({ tag: "fiction", availableOnly: true })));
console.log("Stats:", catalog.stats());
console.log("History:");
console.table(catalog.history.map(({ type, member, isbn }) => ({ type, member, title: catalog.getBook(isbn).title })));
