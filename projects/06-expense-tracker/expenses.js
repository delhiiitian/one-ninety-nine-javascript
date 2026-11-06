// Business logic: add, list, delete and summarise expenses. Amounts are stored in paise.
export const CATEGORIES = ["food", "transport", "rent", "bills", "shopping", "health", "other"];

export function createExpenseService(store) {
  async function add({ amount, category, note = "", date = today() }) {
    const paise = Math.round(Number(amount) * 100);
    if (!Number.isFinite(paise) || paise <= 0) throw new Error("Amount must be a positive number");
    const cat = String(category ?? "").toLowerCase();
    if (!CATEGORIES.includes(cat)) throw new Error(`Category must be one of: ${CATEGORIES.join(", ")}`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date))) {
      throw new Error("Date must look like 2026-01-31");
    }

    const data = await store.load();
    const expense = { id: data.nextId++, date, category: cat, amount: paise, note: String(note).trim() };
    data.expenses.push(expense);
    await store.save(data);
    return expense;
  }

  async function list({ month, category } = {}) {
    const { expenses } = await store.load();
    return expenses
      .filter((e) => !month || e.date.startsWith(month))
      .filter((e) => !category || e.category === category)
      .sort((a, b) => a.date.localeCompare(b.date) || a.id - b.id);
  }

  async function remove(id) {
    const data = await store.load();
    const index = data.expenses.findIndex((e) => e.id === Number(id));
    if (index === -1) throw new Error(`No expense with id ${id}`);
    const [removed] = data.expenses.splice(index, 1);
    await store.save(data);
    return removed;
  }

  async function summary(filters) {
    const expenses = await list(filters);
    const byCategory = {};
    for (const e of expenses) byCategory[e.category] = (byCategory[e.category] ?? 0) + e.amount;
    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    const days = new Set(expenses.map((e) => e.date)).size;
    return { count: expenses.length, total, byCategory, averagePerDay: days ? Math.round(total / days) : 0 };
  }

  async function exportCsv(filters) {
    const rows = (await list(filters)).map((e) =>
      [e.id, e.date, e.category, (e.amount / 100).toFixed(2), csvSafe(e.note)].join(","),
    );
    return ["id,date,category,amount,note", ...rows].join("\n") + "\n";
  }

  return { add, list, remove, summary, exportCsv };
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function csvSafe(text) {
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

export const formatRupees = (paise) => `Rs ${(paise / 100).toFixed(2)}`;
