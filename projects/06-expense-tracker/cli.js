#!/usr/bin/env node
// Expense Tracker command-line app.
// Usage:
//   node projects/06-expense-tracker/cli.js add 250 food "Lunch with team" [--date 2026-01-15]
//   node projects/06-expense-tracker/cli.js list [--month 2026-01] [--category food]
//   node projects/06-expense-tracker/cli.js summary [--month 2026-01]
//   node projects/06-expense-tracker/cli.js delete 3
//   node projects/06-expense-tracker/cli.js export expenses.csv [--month 2026-01]
// Data is saved in ~/.expense-tracker.json (override with EXPENSES_FILE=path).

import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { parseArgs } from "node:util";
import { createStore } from "./store.js";
import { createExpenseService, formatRupees } from "./expenses.js";

const file = process.env.EXPENSES_FILE ?? path.join(os.homedir(), ".expense-tracker.json");
const service = createExpenseService(createStore(file));

let flags = {};

function printTable(expenses) {
  if (expenses.length === 0) return console.log("No expenses found.");
  for (const e of expenses) {
    console.log(`#${String(e.id).padEnd(4)}${e.date}  ${e.category.padEnd(10)}${formatRupees(e.amount).padStart(12)}  ${e.note}`);
  }
}

const commands = {
  async add([amount, category, note]) {
    const expense = await service.add({ amount, category, note, date: flags.date });
    console.log(`Added #${expense.id}: ${formatRupees(expense.amount)} on ${expense.category}`);
  },
  async list() {
    printTable(await service.list(flags));
  },
  async summary() {
    const s = await service.summary(flags);
    console.log(`${s.count} expenses, total ${formatRupees(s.total)}, average ${formatRupees(s.averagePerDay)} per day`);
    const sorted = Object.entries(s.byCategory).sort((a, b) => b[1] - a[1]);
    for (const [category, amount] of sorted) {
      const bar = "#".repeat(Math.max(1, Math.round((amount / s.total) * 30)));
      console.log(`  ${category.padEnd(10)}${formatRupees(amount).padStart(12)}  ${bar}`);
    }
  },
  async delete([id]) {
    const removed = await service.remove(id);
    console.log(`Deleted #${removed.id} (${removed.note || removed.category})`);
  },
  async export([outFile = "expenses.csv"]) {
    await fs.writeFile(outFile, await service.exportCsv(flags));
    console.log(`Exported to ${outFile}`);
  },
};

try {
  const parsed = parseArgs({
    allowPositionals: true,
    options: { date: { type: "string" }, month: { type: "string" }, category: { type: "string" } },
  });
  flags = parsed.values;
  const [command, ...rest] = parsed.positionals;
  const run = commands[command];
  if (!run) {
    console.log("Commands: add, list, summary, delete, export. See the top of cli.js for examples.");
  } else {
    await run(rest);
  }
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exitCode = 1;
}
