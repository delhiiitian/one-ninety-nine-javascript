// A small module about money. Only exported names are visible to other files.

const GST_RATE = 0.18; // private: not exported

export function addGst(amount) {
  return round2(amount * (1 + GST_RATE));
}

export function formatRupees(amount) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount);
}

export const CURRENCY = "INR";

function round2(n) {
  return Math.round(n * 100) / 100;
}
