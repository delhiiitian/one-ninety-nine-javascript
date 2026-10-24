// 3.8 Recursion: a function that calls itself
// Run: node chapter-03-functions/08-recursion.js

// Every recursive function needs a base case (when to stop)
// and a recursive case (a smaller version of the same problem).
function countdown(n) {
  if (n === 0) {
    console.log("Happy New Year!");
    return;
  }
  console.log(n);
  countdown(n - 1);
}
countdown(3);

function factorial(n) {
  if (n <= 1) return 1;          // base case
  return n * factorial(n - 1);   // recursive case
}
console.log("5! =", factorial(5));

// Recursion is natural for tree-shaped data, like folders inside folders.
const folder = {
  name: "Documents",
  files: ["resume.pdf"],
  children: [
    { name: "Photos", files: ["goa.jpg", "manali.jpg"], children: [] },
    {
      name: "Work",
      files: ["report.docx"],
      children: [{ name: "Old", files: ["2019.xlsx"], children: [] }],
    },
  ],
};

function countFiles(dir) {
  let total = dir.files.length;
  for (const child of dir.children) total += countFiles(child);
  return total;
}
console.log("Total files:", countFiles(folder));

function printTree(dir, indent = "") {
  console.log(`${indent}${dir.name}/`);
  for (const file of dir.files) console.log(`${indent}  ${file}`);
  for (const child of dir.children) printTree(child, indent + "  ");
}
printTree(folder);

// Without a base case you get "Maximum call stack size exceeded".
try {
  const forever = () => forever();
  forever();
} catch (error) {
  console.log("Caught:", error.constructor.name, "-", error.message);
}
