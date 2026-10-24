// Checkout: turns a cart plus a list of rules into a final bill.
// All amounts are in paise (whole numbers) to avoid decimal rounding errors.

export function subtotalOf(lines) {
  return lines.reduce((sum, line) => sum + line.price * line.qty, 0);
}

// Higher-order: takes rule functions, returns a checkout function.
export function createCheckout(rules, { taxPercent = 0 } = {}) {
  return function checkout(lines, { coupon } = {}) {
    validateLines(lines);
    const subtotal = subtotalOf(lines);
    const order = { lines, subtotal, coupon };

    const adjustments = rules.map((rule) => rule(order)).filter(Boolean);
    const afterAdjustments = subtotal + adjustments.reduce((sum, a) => sum + a.amount, 0);
    const taxable = Math.max(0, afterAdjustments);
    const tax = Math.round((taxable * taxPercent) / 100);

    return { subtotal, adjustments, tax, total: taxable + tax };
  };
}

function validateLines(lines) {
  if (!Array.isArray(lines) || lines.length === 0) throw new Error("Cart is empty");
  for (const line of lines) {
    if (!Number.isInteger(line.price) || line.price < 0) throw new Error(`Bad price for ${line.name}`);
    if (!Number.isInteger(line.qty) || line.qty < 1) throw new Error(`Bad quantity for ${line.name}`);
  }
}

export const rupees = (paise) => `Rs ${(paise / 100).toFixed(2)}`;

export function formatBill(lines, bill) {
  const row = (label, paise) => `${label.padEnd(34)}${rupees(paise).padStart(12)}`;
  return [
    ...lines.map((l) => row(`${l.qty} x ${l.name}`, l.price * l.qty)),
    "-".repeat(46),
    row("Subtotal", bill.subtotal),
    ...bill.adjustments.map((a) => row(a.label, a.amount)),
    row("GST", bill.tax),
    "=".repeat(46),
    row("TOTAL", bill.total),
  ].join("\n");
}
