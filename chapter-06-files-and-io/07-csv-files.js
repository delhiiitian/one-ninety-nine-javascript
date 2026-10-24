// 6.7 Reading and writing CSV (spreadsheet) files
// Run: node chapter-06-files-and-io/07-csv-files.js

import fs from "node:fs";
import path from "node:path";

const csvPath = path.join(import.meta.dirname, "data", "sales.csv");
const text = fs.readFileSync(csvPath, "utf8").trim();

// Turn CSV text into an array of objects using the header row as keys.
// (Simple version: assumes no commas inside values. Use a library like csv-parse for real-world files.)
function parseCsv(csv) {
  const [headerLine, ...rows] = csv.split(/\r?\n/);
  const headers = headerLine.split(",");
  return rows.map((row) => {
    const values = row.split(",");
    return Object.fromEntries(headers.map((h, i) => [h, values[i]]));
  });
}

const sales = parseCsv(text).map((s) => ({
  ...s,
  quantity: Number(s.quantity),
  unit_price: Number(s.unit_price),
}));
console.table(sales);

// Summarise revenue per product.
const revenue = {};
for (const sale of sales) {
  revenue[sale.product] = (revenue[sale.product] ?? 0) + sale.quantity * sale.unit_price;
}
console.log("Revenue per product:", revenue);

// Write a new CSV. Quote values that contain commas or quotes.
function toCsvValue(value) {
  const s = String(value);
  return /[",\n]/.test(s) ? `"${s.replaceAll('"', '""')}"` : s;
}
function toCsv(rows) {
  const headers = Object.keys(rows[0]);
  const lines = rows.map((row) => headers.map((h) => toCsvValue(row[h])).join(","));
  return [headers.join(","), ...lines].join("\n") + "\n";
}

const summary = Object.entries(revenue).map(([product, total]) => ({ product, total, note: "Q1, 2026" }));
const outPath = path.join(import.meta.dirname, "output", "revenue.csv");
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, toCsv(summary));
console.log(fs.readFileSync(outPath, "utf8"));
