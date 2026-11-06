// Pricing rules. Each rule is a small function: (order) => adjustment or null.
// Rules are built by factory functions (closures), so shops can configure them
// without touching the checkout code.

// "Buy 2 get 1 free" style deals on one product.
export function buyXGetYFree(sku, buy, free) {
  return function rule(order) {
    const line = order.lines.find((l) => l.sku === sku);
    if (!line) return null;
    const groups = Math.floor(line.qty / (buy + free));
    if (groups === 0) return null;
    return { label: `Buy ${buy} get ${free} free on ${line.name}`, amount: -groups * free * line.price };
  };
}

// Percentage off one category, e.g. 10% off all "stationery".
export function categoryDiscount(category, percent) {
  return (order) => {
    const total = order.lines
      .filter((l) => l.category === category)
      .reduce((sum, l) => sum + l.price * l.qty, 0);
    if (total === 0) return null;
    return { label: `${percent}% off ${category}`, amount: -Math.round((total * percent) / 100) };
  };
}

// Flat amount off when the order is big enough.
export function spendAndSave(minimum, saving) {
  return (order) =>
    order.subtotal >= minimum ? { label: `Spend ${minimum / 100}, save ${saving / 100}`, amount: -saving } : null;
}

// A coupon code that works only a limited number of times (remembers usage via closure).
export function limitedCoupon(code, percent, maxUses) {
  let used = 0;
  return (order) => {
    if (order.coupon !== code) return null;
    if (used >= maxUses) return { label: `Coupon ${code} has expired`, amount: 0 };
    used++;
    return { label: `Coupon ${code} (${percent}%)`, amount: -Math.round((order.subtotal * percent) / 100) };
  };
}

// Delivery charge: free above a threshold.
export function deliveryFee(fee, freeAbove) {
  return (order) => (order.subtotal >= freeAbove ? null : { label: "Delivery", amount: fee });
}
