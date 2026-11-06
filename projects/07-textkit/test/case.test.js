import { test } from "node:test";
import assert from "node:assert/strict";
import { words, camelCase, pascalCase, snakeCase, kebabCase, constantCase, titleCase } from "../src/index.js";

test("words() understands spaces, dashes, underscores and camelCase", () => {
  assert.deepEqual(words("userName_first-name  Last"), ["user", "name", "first", "name", "last"]);
});

test("every case style", () => {
  const input = "total price in rupees";
  assert.equal(camelCase(input), "totalPriceInRupees");
  assert.equal(pascalCase(input), "TotalPriceInRupees");
  assert.equal(snakeCase(input), "total_price_in_rupees");
  assert.equal(kebabCase(input), "total-price-in-rupees");
  assert.equal(constantCase(input), "TOTAL_PRICE_IN_RUPEES");
});

test("titleCase keeps small words lowercase except at the ends", () => {
  assert.equal(titleCase("the lord of the rings"), "The Lord of the Rings");
  assert.equal(titleCase("what are you looking at"), "What Are You Looking At");
});
