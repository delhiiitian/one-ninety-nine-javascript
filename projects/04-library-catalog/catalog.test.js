import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { createCatalog } from "./catalog.js";

let catalog;
beforeEach(() => {
  catalog = createCatalog();
  catalog.addBook({ isbn: "1", title: "Godaan", author: "Premchand", year: 1936, tags: ["classic"], copies: 1 });
  catalog.addBook({ isbn: "2", title: "Eloquent JavaScript", author: "Marijn Haverbeke", year: 2018, tags: ["programming", "programming"], copies: 2 });
});

test("rejects duplicates and incomplete books", () => {
  assert.throws(() => catalog.addBook({ isbn: "1", title: "X", author: "Y" }), /already exists/);
  assert.throws(() => catalog.addBook({ isbn: "3", title: "No author" }), /required/);
});

test("duplicate tags are removed", () => {
  assert.deepEqual(catalog.getBook("2").tags, ["programming"]);
});

test("search matches title or author, ignores case, and filters by tag", () => {
  assert.equal(catalog.search({ text: "PREMCHAND" })[0].isbn, "1");
  assert.equal(catalog.search({ tag: "programming" }).length, 1);
  assert.equal(catalog.search({ tag: "unknown" }).length, 0);
});

test("borrowing reduces availability and enforces the rules", () => {
  catalog.borrow("asha", "1");
  assert.equal(catalog.getBook("1").available, 0);
  assert.throws(() => catalog.borrow("bilal", "1"), /not available/);
  assert.throws(() => catalog.borrow("asha", "1"), /already has/);
  assert.equal(catalog.search({ availableOnly: true }).length, 1);
});

test("members can borrow at most three books", () => {
  for (const isbn of ["3", "4", "5", "6"]) catalog.addBook({ isbn, title: `Book ${isbn}`, author: "A", year: 2000 });
  ["3", "4", "5"].forEach((isbn) => catalog.borrow("asha", isbn));
  assert.throws(() => catalog.borrow("asha", "6"), /limit of 3/);
});

test("returning makes the book available again and is recorded", () => {
  catalog.borrow("asha", "1");
  catalog.giveBack("asha", "1");
  assert.equal(catalog.getBook("1").available, 1);
  assert.throws(() => catalog.giveBack("asha", "1"), /did not borrow/);
  assert.deepEqual(catalog.history.map((e) => e.type), ["borrow", "return"]);
});

test("stats summarise the collection", () => {
  catalog.borrow("asha", "2");
  catalog.borrow("bilal", "2");
  const stats = catalog.stats();
  assert.equal(stats.titles, 2);
  assert.equal(stats.copies, 3);
  assert.equal(stats.onLoan, 2);
  assert.equal(stats.mostBorrowed, "Eloquent JavaScript");
  assert.deepEqual(stats.byDecade, { "1930s": 1, "2010s": 1 });
});

test("toJSON leaves out the runtime-only 'available' field", () => {
  assert.equal("available" in catalog.toJSON()[0], false);
});
