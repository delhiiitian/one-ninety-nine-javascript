// Bill Splitter: the command-line interface (input and output live here).
// Quick:       node projects/01-bill-splitter/cli.js 1850 --tip 10 --tax 5 --people 3
// Interactive: node projects/01-bill-splitter/cli.js

import readline from "node:readline/promises";
import { calculateBill, formatReceipt } from "./bill.js";

function readFlags(args) {
  const flags = { amount: args[0] };
  for (let i = 1; i < args.length; i += 2) {
    const key = args[i].replace(/^--/, "");
    flags[key] = args[i + 1];
  }
  return flags;
}

async function askQuestions() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  try {
    const amount = await rl.question("Bill amount (Rs): ");
    const taxPercent = (await rl.question("Tax % [0]: ")) || 0;
    const tipPercent = (await rl.question("Tip % [10]: ")) || 10;
    const people = (await rl.question("How many people? [2]: ")) || 2;
    const namesText = await rl.question("Names, comma separated (optional): ");
    const names = namesText ? namesText.split(",").map((n) => n.trim()) : [];
    return { amount, taxPercent, tipPercent, people, names };
  } finally {
    rl.close();
  }
}

async function main() {
  const args = process.argv.slice(2);
  const input = args.length
    ? (({ tip, tax, people, names, amount }) => ({
        amount,
        tipPercent: tip ?? 0,
        taxPercent: tax ?? 0,
        people: people ?? 1,
        names: names ? names.split(",") : [],
      }))(readFlags(args))
    : await askQuestions();

  try {
    const bill = calculateBill(input);
    console.log(formatReceipt(bill, input.names));
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
}

main();
