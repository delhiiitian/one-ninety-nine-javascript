# Project 6: Expense Tracker

A command-line money diary. Record what you spend, list it by month or category, see a summary with a bar chart, delete mistakes, and export to CSV for Excel or Google Sheets. Data is saved in a JSON file so it survives between runs.

Book: Chapter 6 (Files and I/O), Project 6.

## Run it

```bash
export EXPENSES_FILE=./my-expenses.json        # optional: where to save (default ~/.expense-tracker.json)
node projects/06-expense-tracker/cli.js add 250 food "Lunch with team" --date 2026-01-15
node projects/06-expense-tracker/cli.js add 1200 transport "Train to Jaipur"
node projects/06-expense-tracker/cli.js list --month 2026-01
node projects/06-expense-tracker/cli.js summary
node projects/06-expense-tracker/cli.js export expenses.csv
node --test projects/06-expense-tracker/*.test.js
```

## Files

| File | Job |
| --- | --- |
| `store.js` | Loads and saves the JSON file safely (handles first run, atomic writes, corrupted files) |
| `expenses.js` | Business rules: validation, filtering, summaries, CSV export |
| `cli.js` | Parses commands and flags, prints results |
| `expenses.test.js` | Tests that use a temporary folder so your real data is never touched |

## Concepts used

`fs/promises`, `path`, `os`, JSON files, CSV, command-line arguments with `parseArgs`, async/await, error codes like `ENOENT`.
