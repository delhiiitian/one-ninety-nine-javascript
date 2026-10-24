// 4.2 Array methods: map, filter, reduce and friends
// Run: node chapter-04-data-structures/02-array-methods.js

const students = [
  { name: "Aarav", marks: 82, city: "Delhi" },
  { name: "Bela", marks: 45, city: "Pune" },
  { name: "Chirag", marks: 91, city: "Delhi" },
  { name: "Divya", marks: 67, city: "Chennai" },
];

// map: transform each item -> new array of the same length
const names = students.map((s) => s.name);
console.log("Names:", names);

// filter: keep only items that pass a test
const passed = students.filter((s) => s.marks >= 50);
console.log("Passed:", passed.map((s) => s.name));

// reduce: combine everything into one value
const totalMarks = students.reduce((sum, s) => sum + s.marks, 0);
console.log("Average:", totalMarks / students.length);

// reduce can also build objects: count students per city
const perCity = students.reduce((counts, s) => {
  counts[s.city] = (counts[s.city] ?? 0) + 1;
  return counts;
}, {});
console.log("Per city:", perCity);

// find / findIndex: the first match
console.log("Topper:", students.find((s) => s.marks > 90)?.name);

// some / every: yes-or-no questions about the whole list
console.log("Anyone failed?", students.some((s) => s.marks < 50));

// Chaining methods reads like a sentence
const delhiToppers = students
  .filter((s) => s.city === "Delhi")
  .sort((a, b) => b.marks - a.marks)
  .map((s) => `${s.name} (${s.marks})`);
console.log("Delhi ranking:", delhiToppers);

// flat and flatMap: un-nest arrays
const tags = [["js", "web"], ["node"], ["js", "api"]];
console.log([...new Set(tags.flat())]);
console.log(["hello world", "good morning"].flatMap((s) => s.split(" ")));

// Group items (Node 21+, modern browsers)
if (Object.groupBy) {
  console.log(Object.groupBy(students, (s) => (s.marks >= 50 ? "pass" : "fail")));
}
