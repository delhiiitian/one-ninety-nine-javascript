import { test } from "node:test";
import assert from "node:assert/strict";
import { slugify, uniqueSlug } from "../src/index.js";

test("slugify removes accents, symbols and extra separators", () => {
  assert.equal(slugify("  Café Menu: Top 10 Dishes!  "), "cafe-menu-top-10-dishes");
  assert.equal(slugify("Salt & Pepper"), "salt-and-pepper");
});

test("long slugs are cut at a word boundary", () => {
  assert.equal(slugify("one two three four", { maxLength: 10 }), "one-two");
});

test("custom separator", () => {
  assert.equal(slugify("Hello World", { separator: "_" }), "hello_world");
});

test("uniqueSlug adds a number when the slug is taken", () => {
  const taken = new Set(["my-post"]);
  assert.equal(uniqueSlug("My Post", taken), "my-post-2");
  assert.equal(uniqueSlug("My Post", taken), "my-post-3");
});
