# Project 1: Bill Splitter

A command-line tool that adds tax and tip to a restaurant bill and splits it fairly between friends, down to the last paisa.

Book: Chapter 1 (Basics), Project 1.

## Run it

```bash
# Answer questions interactively
node projects/01-bill-splitter/cli.js

# Or pass everything at once
node projects/01-bill-splitter/cli.js 1850 --tax 5 --tip 10 --people 3 --names Asha,Bilal,Chen

# Tests
node --test projects/01-bill-splitter/*.test.js
```

## Files

| File | Job |
| --- | --- |
| `bill.js` | Pure calculation logic: convert to paise, add tax and tip, split, format a receipt |
| `cli.js` | Reads input (arguments or questions), prints the receipt, handles errors |
| `bill.test.js` | Automated checks for the calculation logic |

## Concepts used

Variables, numbers and `Math`, strings and padding, template literals, type conversion, user input with `process.argv` and `readline`.
