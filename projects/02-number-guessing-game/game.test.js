import { test } from "node:test";
import assert from "node:assert/strict";
import { createGame, randomSecret, score } from "./game.js";

const newGame = () => createGame({ secret: 42, max: 100, attempts: 3 });

test("tells the player to go higher or lower and narrows the range", () => {
  const game = newGame();
  const first = game.guess("10");
  assert.equal(first.result, "higher");
  assert.match(first.message, /Range 11-100/);
  const second = game.guess(90);
  assert.equal(second.result, "lower");
  assert.match(second.message, /Range 11-89/);
});

test("winning ends the game", () => {
  const game = newGame();
  assert.equal(game.guess(42).result, "correct");
  assert.equal(game.status, "won");
  assert.equal(game.guess(1).result, "over");
});

test("running out of attempts loses the game", () => {
  const game = newGame();
  game.guess(1);
  game.guess(2);
  const last = game.guess(3);
  assert.equal(last.result, "lost");
  assert.match(last.message, /was 42/);
});

test("invalid and repeated guesses do not use up attempts", () => {
  const game = newGame();
  assert.equal(game.guess("abc").result, "invalid");
  assert.equal(game.guess(500).result, "invalid");
  game.guess(10);
  assert.equal(game.guess(10).result, "invalid");
  assert.deepEqual(game.history, [10]);
});

test("hints get warmer as the guess gets closer", () => {
  assert.match(newGame().guess(41).message, /burning hot/);
  assert.match(newGame().guess(30).message, /\(warm\)/);
  assert.match(newGame().guess(1).message, /cold/);
});

test("random secret stays inside the range", () => {
  assert.equal(randomSecret(100, () => 0), 1);
  assert.equal(randomSecret(100, () => 0.9999), 100);
});

test("fewer tries give a higher score", () => {
  assert.ok(score("medium", 2) > score("medium", 6));
});
