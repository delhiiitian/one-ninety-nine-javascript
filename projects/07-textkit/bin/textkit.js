#!/usr/bin/env node
// textkit command-line tool.
//   node projects/07-textkit/bin/textkit.js slug "Hello World, Again!"
//   node projects/07-textkit/bin/textkit.js case snake "Total Price In Rupees"
//   node projects/07-textkit/bin/textkit.js stats README.md
//   echo "some text" | node projects/07-textkit/bin/textkit.js stats

import fs from "node:fs/promises";
import * as textkit from "../src/index.js";

const CASES = {
  camel: textkit.camelCase,
  pascal: textkit.pascalCase,
  snake: textkit.snakeCase,
  kebab: textkit.kebabCase,
  constant: textkit.constantCase,
  title: textkit.titleCase,
};

async function readInput(fileOrText) {
  if (fileOrText) {
    try {
      return await fs.readFile(fileOrText, "utf8");
    } catch {
      return fileOrText; // not a file: treat the argument itself as text
    }
  }
  let data = "";
  if (!process.stdin.isTTY) for await (const chunk of process.stdin) data += chunk;
  return data;
}

const [command, ...args] = process.argv.slice(2);

try {
  switch (command) {
    case "slug":
      console.log(textkit.slugify(args.join(" ")));
      break;
    case "case": {
      const [style, ...words] = args;
      const convert = CASES[style];
      if (!convert) throw new Error(`Unknown case "${style}". Use: ${Object.keys(CASES).join(", ")}`);
      console.log(convert(words.join(" ")));
      break;
    }
    case "stats": {
      const result = textkit.stats(await readInput(args[0]));
      console.log(`${result.words} words, ${result.sentences} sentences, ${result.characters} characters`);
      console.log(`Reading time: ${result.readingTime}`);
      console.log("Top words:", result.topWords.map((w) => `${w.word} (${w.count})`).join(", "));
      break;
    }
    case "truncate":
      console.log(textkit.truncate(args.slice(1).join(" "), Number(args[0])));
      break;
    case "--version":
      console.log(textkit.VERSION);
      break;
    default:
      console.log("Usage: textkit <slug|case|stats|truncate|--version> ...");
  }
} catch (error) {
  console.error(`textkit: ${error.message}`);
  process.exitCode = 1;
}
