# Project 3: Checkout Calculator

The pricing engine behind an online shop's checkout page. Offers such as "buy 2 get 1 free", category discounts, coupons and delivery fees are each written as a small function, and the checkout combines them into a final bill with GST.

Book: Chapter 3 (Functions), Project 3.

## Run it

```bash
node projects/03-checkout-calculator/demo.js
node projects/03-checkout-calculator/demo.js WELCOME5   # with a coupon
node --test projects/03-checkout-calculator/*.test.js
```

## Files

| File | Job |
| --- | --- |
| `rules.js` | Factory functions that build pricing rules (closures that remember their settings) |
| `checkout.js` | `createCheckout(rules)` returns a checkout function; also formats the bill |
| `demo.js` | A stationery shop's cart with today's offers |
| `checkout.test.js` | Tests for each rule and for the full checkout |

## Concepts used

Function declarations and arrows, default and destructured parameters, return values, closures, higher-order functions (`map`, `filter`, `reduce`), pure functions.
