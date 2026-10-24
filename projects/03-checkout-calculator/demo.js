// Checkout Calculator demo: a stationery shop with today's offers.
// Run: node projects/03-checkout-calculator/demo.js [COUPON]

import { createCheckout, formatBill } from "./checkout.js";
import { buyXGetYFree, categoryDiscount, deliveryFee, limitedCoupon, spendAndSave } from "./rules.js";

const todaysRules = [
  buyXGetYFree("PEN-BLUE", 2, 1),
  categoryDiscount("notebooks", 10),
  spendAndSave(100000, 5000),        // spend Rs 1000, save Rs 50
  limitedCoupon("WELCOME5", 5, 100),
  deliveryFee(4000, 50000),          // Rs 40 delivery, free above Rs 500
];

const checkout = createCheckout(todaysRules, { taxPercent: 12 });

const cart = [
  { sku: "PEN-BLUE", name: "Blue gel pen", category: "pens", price: 2000, qty: 6 },
  { sku: "NB-A5", name: "A5 ruled notebook", category: "notebooks", price: 12000, qty: 4 },
  { sku: "BAG-01", name: "Canvas tote bag", category: "bags", price: 49900, qty: 1 },
];

const coupon = process.argv[2];
console.log(formatBill(cart, checkout(cart, { coupon })));
if (!coupon) console.log("\nTip: try `node projects/03-checkout-calculator/demo.js WELCOME5`");
