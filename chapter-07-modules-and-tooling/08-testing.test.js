// 7.8 Testing your code with the built-in test runner
// Run: node --test chapter-07-modules-and-tooling/08-testing.test.js
// (Plain `node` on this file also works and prints the same report.)

import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { mean, median } from "./lib/stats.js";
import { addGst } from "./lib/money.js";

// A test is a small program that checks another program.
// Arrange (set up) -> Act (call the code) -> Assert (check the result).

describe("mean()", () => {
  test("averages a list of numbers", () => {
    const marks = [70, 80, 90];   // arrange
    const result = mean(marks);   // act
    assert.equal(result, 80);     // assert
  });

  test("throws on an empty list", () => {
    assert.throws(() => mean([]), /at least one number/);
  });
});

describe("median()", () => {
  test("odd count picks the middle value", () => {
    assert.equal(median([9, 1, 5]), 5);
  });

  test("even count averages the two middle values", () => {
    assert.equal(median([1, 2, 3, 4]), 2.5);
  });

  test("does not change the original array", () => {
    const data = [3, 1, 2];
    median(data);
    assert.deepEqual(data, [3, 1, 2]);
  });
});

test("addGst adds 18% and rounds to paise", () => {
  assert.equal(addGst(100), 118);
  assert.equal(addGst(9.99), 11.79);
});
