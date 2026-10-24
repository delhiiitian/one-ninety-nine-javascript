// 1.8 Getting input from the user
// Run: node chapter-01-basics/08-user-input.js Asha 21
// Or interactively: node chapter-01-basics/08-user-input.js --ask

import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

// Option 1: command-line arguments. process.argv holds every word you typed.
// [0] is the node program, [1] is this file, the rest are your arguments.
const [, , nameArg = "friend", ageArg = "20"] = process.argv;

if (!process.argv.includes("--ask")) {
  const age = Number(ageArg);
  console.log(`Hello ${nameArg}! Next year you will be ${age + 1}.`);
} else {
  // Option 2: ask questions while the program runs.
  const rl = readline.createInterface({ input, output });
  const name = await rl.question("What is your name? ");
  const age = Number(await rl.question("How old are you? "));
  rl.close();
  console.log(`Hello ${name}! Next year you will be ${age + 1}.`);
}
