// 2.8 break and continue: controlling a loop from inside
// Run: node chapter-02-control-flow/08-break-and-continue.js

// break: stop the loop completely.
const inbox = ["newsletter", "bill", "URGENT: server down", "promo", "invite"];
for (const subject of inbox) {
  if (subject.startsWith("URGENT")) {
    console.log("Found urgent mail, stopping search:", subject);
    break;
  }
  console.log("Skimming:", subject);
}

// continue: skip this round and move to the next one.
const transactions = [500, -20, 300, 0, -75, 1200];
let deposits = 0;
for (const amount of transactions) {
  if (amount <= 0) continue; // ignore withdrawals and empty rows
  deposits += amount;
}
console.log("Total deposits:", deposits);

// Labels let break exit an outer loop (use sparingly).
const seating = [
  ["taken", "taken", "free"],
  ["taken", "free", "free"],
];
let found = null;
search: for (let row = 0; row < seating.length; row++) {
  for (let seat = 0; seat < seating[row].length; seat++) {
    if (seating[row][seat] === "free") {
      found = { row: row + 1, seat: seat + 1 };
      break search;
    }
  }
}
console.log("First free seat:", found);
