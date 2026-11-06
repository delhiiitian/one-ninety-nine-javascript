// 2.4 switch: choosing one path from many
// Run: node chapter-02-control-flow/04-switch.js

function trafficAction(light) {
  switch (light) {
    case "green":
      return "Go";
    case "yellow":
      return "Slow down";
    case "red":
      return "Stop";
    default:
      return "Signal broken: proceed with caution";
  }
}

for (const light of ["green", "yellow", "red", "blue"]) {
  console.log(`${light} -> ${trafficAction(light)}`);
}

// Several cases can share one block. Without return or break, execution "falls through".
function daysInMonth(month) {
  switch (month) {
    case "feb":
      return 28;
    case "apr":
    case "jun":
    case "sep":
    case "nov":
      return 30;
    default:
      return 31;
  }
}
console.log("Days in June:", daysInMonth("jun"));

// A classic menu handler using break.
const command = "list";
switch (command) {
  case "add":
    console.log("Adding an item...");
    break;
  case "list":
    console.log("Listing all items...");
    break;
  default:
    console.log("Unknown command");
}

// An object lookup is a popular alternative to switch.
const statusText = { 200: "OK", 404: "Not Found", 500: "Server Error" };
console.log(statusText[404] ?? "Unknown status");
