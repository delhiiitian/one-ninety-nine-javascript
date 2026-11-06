// 8.9 Iterators and generators: producing values one at a time
// Run: node chapter-08-async-and-events/09-iterators-and-generators.js

// A generator function (function*) can pause with `yield` and resume later,
// like a ticket machine that prints the next number only when someone presses the button.
function* ticketMachine(start = 1) {
  let number = start;
  while (true) {
    yield `Token ${number++}`;
  }
}

const machine = ticketMachine(101);
console.log(machine.next().value); // Token 101
console.log(machine.next().value); // Token 102

// Generators work with for...of and spread.
function* range(from, to, step = 1) {
  for (let i = from; i <= to; i += step) yield i;
}
console.log([...range(1, 10, 3)]);

// Lazy pipelines: values are computed only when needed (handles infinite sequences).
function* take(iterable, n) {
  let count = 0;
  for (const item of iterable) {
    if (count++ >= n) return;
    yield item;
  }
}
console.log([...take(ticketMachine(1), 3)]);

// Make your own objects iterable with Symbol.iterator.
class Playlist {
  constructor(...songs) {
    this.songs = songs;
  }
  *[Symbol.iterator]() {
    for (const song of this.songs) yield `Now playing: ${song}`;
  }
}
for (const line of new Playlist("Kesariya", "Naatu Naatu")) console.log(line);

// Async generators: perfect for paged API results.
async function* fetchPages(totalPages) {
  for (let page = 1; page <= totalPages; page++) {
    await new Promise((r) => setTimeout(r, 30)); // pretend network call
    yield { page, items: [`item-${page}a`, `item-${page}b`] };
  }
}
for await (const { page, items } of fetchPages(3)) {
  console.log(`page ${page}:`, items.join(", "));
}
