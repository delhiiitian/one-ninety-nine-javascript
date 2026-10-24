// 9.6 Building command-line tools with arguments and flags
// Run: node chapter-09-real-world/06-cli-arguments.js convert 100 --from USD --to INR
//      node chapter-09-real-world/06-cli-arguments.js --help

import { parseArgs } from "node:util";

const RATES_TO_INR = { INR: 1, USD: 83.2, EUR: 90.1, GBP: 105.4 };

const HELP = `
Usage: currency convert <amount> --from <CODE> --to <CODE> [--decimals N]

Options:
  -f, --from       currency to convert from (default USD)
  -t, --to         currency to convert to (default INR)
  -d, --decimals   decimal places (default 2)
  -h, --help       show this help
Supported: ${Object.keys(RATES_TO_INR).join(", ")}`;

function run(argv) {
  const { values, positionals } = parseArgs({
    args: argv,
    allowPositionals: true,
    options: {
      from: { type: "string", short: "f", default: "USD" },
      to: { type: "string", short: "t", default: "INR" },
      decimals: { type: "string", short: "d", default: "2" },
      help: { type: "boolean", short: "h" },
    },
  });

  if (values.help || positionals.length === 0) return HELP;

  const [command, amountText] = positionals;
  if (command !== "convert") throw new Error(`Unknown command "${command}"`);
  const amount = Number(amountText);
  if (!Number.isFinite(amount)) throw new Error("Amount must be a number");

  const from = values.from.toUpperCase();
  const to = values.to.toUpperCase();
  for (const code of [from, to]) {
    if (!RATES_TO_INR[code]) throw new Error(`Unsupported currency ${code}`);
  }
  const result = (amount * RATES_TO_INR[from]) / RATES_TO_INR[to];
  return `${amount} ${from} = ${result.toFixed(Number(values.decimals))} ${to}`;
}

// When no arguments are given we show a few sample runs so the file is useful on its own.
const userArgs = process.argv.slice(2);
const samples = userArgs.length ? [userArgs] : [["convert", "100"], ["convert", "50", "-f", "eur", "-t", "gbp"], ["convert", "x"]];
for (const args of samples) {
  try {
    console.log(`$ currency ${args.join(" ")}\n${run(args)}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1; // non-zero tells scripts that something failed
  }
}
if (!userArgs.length) process.exitCode = 0; // the failing sample above was intentional
