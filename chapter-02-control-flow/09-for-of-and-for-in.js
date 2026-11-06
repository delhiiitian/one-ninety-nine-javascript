// 2.9 for...of and for...in: looping over collections
// Run: node chapter-02-control-flow/09-for-of-and-for-in.js

// for...of walks over VALUES of arrays, strings, maps and sets.
const playlist = ["Intro", "Chorus", "Outro"];
for (const song of playlist) {
  console.log("Now playing:", song);
}

for (const letter of "JS!") {
  console.log("Letter:", letter);
}

// Need the index too? Use entries().
for (const [index, song] of playlist.entries()) {
  console.log(`${index + 1}/${playlist.length}: ${song}`);
}

// for...in walks over KEYS (property names) of an object.
const stock = { apples: 12, bananas: 0, cherries: 40 };
for (const fruit in stock) {
  console.log(`${fruit}: ${stock[fruit]}`);
}

// Modern alternative for objects: Object.entries + for...of.
for (const [fruit, count] of Object.entries(stock)) {
  if (count === 0) console.log(`Reorder ${fruit}!`);
}

// Avoid for...in on arrays: it gives string indexes, not values.
for (const key in playlist) {
  console.log(typeof key, key);
}
