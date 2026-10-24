import { test } from "node:test";
import assert from "node:assert/strict";
import { calculateBill, formatReceipt, toPaise } from "./bill.js";

test("adds tax and tip to the subtotal", () => {
  const bill = calculateBill({ amount: 1000, taxPercent: 5, tipPercent: 10, people: 2 });
  assert.equal(bill.tax, 5000);
  assert.equal(bill.tip, 10000);
  assert.equal(bill.total, 115000);
  assert.deepEqual(bill.shares, [57500, 57500]);
});

test("shares always add up to the total, even when it does not divide evenly", () => {
  const bill = calculateBill({ amount: 100, people: 3 });
  assert.deepEqual(bill.shares, [3334, 3333, 3333]);
  assert.equal(bill.shares.reduce((a, b) => a + b, 0), bill.total);
});

test("accepts amounts given as text, like user input", () => {
  assert.equal(calculateBill({ amount: "250.50" }).total, 25050);
});

test("rejects invalid input with a helpful message", () => {
  assert.throws(() => toPaise("abc"), /not a valid amount/);
  assert.throws(() => calculateBill({ amount: 100, people: 0 }), /at least 1/);
  assert.throws(() => calculateBill({ amount: 100, people: 2.5 }), /whole number/);
  assert.throws(() => calculateBill({ amount: 100, tipPercent: 150 }), /Tip/);
});

test("receipt shows each person's name and share", () => {
  const bill = calculateBill({ amount: 300, people: 2 });
  const receipt = formatReceipt(bill, ["Asha", "Bilal"]);
  assert.match(receipt, /Asha\s+Rs\s+150\.00/);
  assert.match(receipt, /TOTAL\s+Rs\s+300\.00/);
});
