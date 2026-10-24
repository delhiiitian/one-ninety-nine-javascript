// Bill Splitter: the calculation logic.
// Everything here is pure: numbers in, numbers out. No printing, no input.
// Money is handled in paise (1 rupee = 100 paise) so rounding never loses a paisa.

export function toPaise(rupees) {
  const value = Number(rupees);
  if (!Number.isFinite(value) || value < 0) {
    throw new Error(`"${rupees}" is not a valid amount`);
  }
  return Math.round(value * 100);
}

export function toRupees(paise) {
  return (paise / 100).toFixed(2);
}

export function calculateBill({ amount, tipPercent = 0, taxPercent = 0, people = 1 }) {
  const subtotal = toPaise(amount);
  const tipRate = Number(tipPercent);
  const taxRate = Number(taxPercent);
  const count = Number(people);

  if (!Number.isFinite(tipRate) || tipRate < 0 || tipRate > 100) {
    throw new Error("Tip must be between 0 and 100 percent");
  }
  if (!Number.isFinite(taxRate) || taxRate < 0 || taxRate > 100) {
    throw new Error("Tax must be between 0 and 100 percent");
  }
  if (!Number.isInteger(count) || count < 1) {
    throw new Error("Number of people must be a whole number of at least 1");
  }

  const tax = Math.round((subtotal * taxRate) / 100);
  const tip = Math.round((subtotal * tipRate) / 100); // tip on the pre-tax amount
  const total = subtotal + tax + tip;

  // Split fairly: everyone pays the base share, the leftover paise go
  // one each to the first few people, so the shares always add up to the total.
  const base = Math.floor(total / count);
  const leftover = total - base * count;
  const shares = Array.from({ length: count }, (_, i) => base + (i < leftover ? 1 : 0));

  return { subtotal, tax, tip, total, shares };
}

export function formatReceipt(bill, names = []) {
  const line = (label, paise) => `${label.padEnd(14)}Rs ${toRupees(paise).padStart(10)}`;
  const rows = [
    "=".repeat(28),
    "        BILL SPLITTER",
    "=".repeat(28),
    line("Subtotal", bill.subtotal),
    line("Tax", bill.tax),
    line("Tip", bill.tip),
    "-".repeat(28),
    line("TOTAL", bill.total),
    "-".repeat(28),
  ];
  bill.shares.forEach((share, i) => {
    rows.push(line(names[i] ?? `Person ${i + 1}`, share));
  });
  rows.push("=".repeat(28));
  return rows.join("\n");
}
