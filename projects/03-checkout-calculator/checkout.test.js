import { test } from "node:test";
import assert from "node:assert/strict";
import { createCheckout, subtotalOf } from "./checkout.js";
import { buyXGetYFree, categoryDiscount, deliveryFee, limitedCoupon, spendAndSave } from "./rules.js";

const pen = { sku: "PEN", name: "Pen", category: "pens", price: 1000, qty: 3 };
const book = { sku: "NB", name: "Notebook", category: "notebooks", price: 5000, qty: 2 };

test("subtotal multiplies price by quantity", () => {
  assert.equal(subtotalOf([pen, book]), 13000);
});

test("buy 2 get 1 free charges for 2 of every 3", () => {
  const rule = buyXGetYFree("PEN", 2, 1);
  assert.equal(rule({ lines: [pen] }).amount, -1000);
  assert.equal(rule({ lines: [{ ...pen, qty: 2 }] }), null);
});

test("category discount only touches that category", () => {
  const rule = categoryDiscount("notebooks", 10);
  assert.equal(rule({ lines: [pen, book] }).amount, -1000);
});

test("spend-and-save and delivery depend on the subtotal", () => {
  assert.equal(spendAndSave(10000, 500)({ subtotal: 9999 }), null);
  assert.equal(spendAndSave(10000, 500)({ subtotal: 10000 }).amount, -500);
  assert.equal(deliveryFee(4000, 50000)({ subtotal: 100 }).amount, 4000);
  assert.equal(deliveryFee(4000, 50000)({ subtotal: 60000 }), null);
});

test("a limited coupon stops working after its uses run out", () => {
  const coupon = limitedCoupon("ONCE", 10, 1);
  assert.equal(coupon({ subtotal: 1000, coupon: "ONCE" }).amount, -100);
  assert.equal(coupon({ subtotal: 1000, coupon: "ONCE" }).amount, 0);
  assert.equal(coupon({ subtotal: 1000, coupon: "OTHER" }), null);
});

test("checkout applies rules, then tax, and never goes below zero", () => {
  const checkout = createCheckout([buyXGetYFree("PEN", 2, 1)], { taxPercent: 10 });
  const bill = checkout([pen, book]);
  assert.equal(bill.subtotal, 13000);
  assert.equal(bill.tax, 1200);
  assert.equal(bill.total, 13200);

  const generous = createCheckout([() => ({ label: "Everything free", amount: -999999 })]);
  assert.equal(generous([pen]).total, 0);
});

test("checkout rejects broken carts", () => {
  const checkout = createCheckout([]);
  assert.throws(() => checkout([]), /empty/);
  assert.throws(() => checkout([{ ...pen, qty: 0 }]), /quantity/);
  assert.throws(() => checkout([{ ...pen, price: 9.99 }]), /price/);
});
