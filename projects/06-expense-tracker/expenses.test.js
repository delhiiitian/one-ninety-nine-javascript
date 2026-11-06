import { test, beforeEach, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { createStore } from "./store.js";
import { createExpenseService } from "./expenses.js";

const dir = await fs.mkdtemp(path.join(os.tmpdir(), "expenses-"));
let file;
let service;

beforeEach(async () => {
  file = path.join(dir, `${Date.now()}-${Math.random()}.json`);
  service = createExpenseService(createStore(file));
});
after(() => fs.rm(dir, { recursive: true, force: true }));

test("adds an expense and saves it to disk in paise", async () => {
  const e = await service.add({ amount: "249.50", category: "Food", note: " Dosa ", date: "2026-01-05" });
  assert.deepEqual(e, { id: 1, date: "2026-01-05", category: "food", amount: 24950, note: "Dosa" });
  const saved = JSON.parse(await fs.readFile(file, "utf8"));
  assert.equal(saved.nextId, 2);
  assert.equal(saved.expenses.length, 1);
});

test("rejects bad amounts, categories and dates", async () => {
  await assert.rejects(service.add({ amount: -5, category: "food" }), /positive/);
  await assert.rejects(service.add({ amount: 5, category: "games" }), /Category/);
  await assert.rejects(service.add({ amount: 5, category: "food", date: "05/01/2026" }), /Date/);
});

test("lists by month and category, sorted by date", async () => {
  await service.add({ amount: 100, category: "food", date: "2026-02-01" });
  await service.add({ amount: 50, category: "transport", date: "2026-01-20" });
  await service.add({ amount: 70, category: "food", date: "2026-01-02" });
  assert.deepEqual((await service.list({ month: "2026-01" })).map((e) => e.amount), [7000, 5000]);
  assert.equal((await service.list({ category: "food" })).length, 2);
});

test("summary totals by category and averages per day", async () => {
  await service.add({ amount: 100, category: "food", date: "2026-01-01" });
  await service.add({ amount: 300, category: "rent", date: "2026-01-01" });
  await service.add({ amount: 200, category: "food", date: "2026-01-02" });
  const s = await service.summary();
  assert.equal(s.total, 60000);
  assert.deepEqual(s.byCategory, { food: 30000, rent: 30000 });
  assert.equal(s.averagePerDay, 30000);
});

test("delete removes by id and complains about unknown ids", async () => {
  await service.add({ amount: 10, category: "other" });
  await service.remove(1);
  assert.equal((await service.list()).length, 0);
  await assert.rejects(service.remove(1), /No expense/);
});

test("CSV export quotes notes that contain commas", async () => {
  await service.add({ amount: 10, category: "other", note: 'Tea, "special"', date: "2026-01-01" });
  const csv = await service.exportCsv();
  assert.equal(csv, 'id,date,category,amount,note\n1,2026-01-01,other,10.00,"Tea, ""special"""\n');
});

test("a corrupted data file gives a clear error instead of losing data", async () => {
  await fs.writeFile(file, "{ not json");
  await assert.rejects(service.list(), /Could not read/);
});
