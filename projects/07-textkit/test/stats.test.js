import { test } from "node:test";
import assert from "node:assert/strict";
import { countWords, countSentences, readingTime, topWords, truncate, mask } from "../src/index.js";

test("counts words including other scripts and contractions", () => {
  assert.equal(countWords("It's a fine day, isn't it?"), 6);
  assert.equal(countWords("नमस्ते दुनिया"), 2);
  assert.equal(countWords(""), 0);
});

test("counts sentences", () => {
  assert.equal(countSentences("Hi. How are you? Great!"), 3);
  assert.equal(countSentences("no punctuation"), 1);
});

test("reading time", () => {
  assert.equal(readingTime("short"), "less than a minute");
  assert.equal(readingTime("word ".repeat(660)), "3 min read");
});

test("topWords ignores stop words and short words", () => {
  assert.deepEqual(topWords("The cat and the hat. The cat sat.", 2), [
    { word: "cat", count: 2 },
    { word: "hat", count: 1 },
  ]);
});

test("truncate and mask", () => {
  assert.equal(truncate("JavaScript is a fun language", 18), "JavaScript is...");
  assert.equal(truncate("short", 10), "short");
  assert.equal(mask("9876543210"), "******3210");
});
