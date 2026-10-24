// 6.9 Standard input and output: talking to the terminal and other programs
// Run: echo "hello from a pipe" | node chapter-06-files-and-io/09-stdin-and-stdout.js
// Or:  node chapter-06-files-and-io/09-stdin-and-stdout.js < chapter-06-files-and-io/data/notes.txt

// Every program has three standard streams:
//   stdin  - input  (keyboard, or another program's output via a pipe)
//   stdout - normal output
//   stderr - error and status messages (kept separate so pipes stay clean)

process.stdout.write("Line written without a newline... ");
process.stdout.write("done\n");
process.stderr.write("[status] reading input\n");

async function readAllStdin() {
  if (process.stdin.isTTY) return ""; // nothing piped in: someone is typing at a terminal
  let data = "";
  for await (const chunk of process.stdin) data += chunk;
  return data;
}

const input = await readAllStdin();
if (!input) {
  console.log("No piped input. Try: echo \"hi there\" | node chapter-06-files-and-io/09-stdin-and-stdout.js");
} else {
  const lines = input.split("\n").filter(Boolean);
  const words = input.split(/\s+/).filter(Boolean);
  // Output that other programs can read, like the Unix `wc` command.
  console.log(`lines=${lines.length} words=${words.length} chars=${input.length}`);
  console.log(lines.map((l) => l.toUpperCase()).join("\n"));
}

// Exit codes tell the shell whether things worked: 0 = success, anything else = failure.
process.exitCode = 0;
