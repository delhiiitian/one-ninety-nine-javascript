// 1.9 Dates and time
// Run: node chapter-01-basics/09-dates-and-time.js

const now = new Date();
console.log("Right now:", now.toISOString());

// Create a specific date. Months start at 0 (January = 0, December = 11).
const launch = new Date(2026, 0, 15, 9, 30); // 15 Jan 2026, 09:30 local time
console.log("Year:", launch.getFullYear());
console.log("Month (0-based):", launch.getMonth());
console.log("Day of month:", launch.getDate());
console.log("Day of week (0 = Sunday):", launch.getDay());

// ISO strings are the safest way to store and exchange dates.
const meeting = new Date("2026-03-01T10:00:00Z");
console.log("Meeting timestamp (ms since 1970):", meeting.getTime());

// Date math works with milliseconds.
const msPerDay = 24 * 60 * 60 * 1000;
const dueDate = new Date(meeting.getTime() + 7 * msPerDay);
console.log("Due one week later:", dueDate.toISOString().slice(0, 10));

const daysBetween = Math.round((dueDate - meeting) / msPerDay);
console.log("Days between:", daysBetween);

// Friendly formatting for people, in their language and time zone.
const formatter = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "full",
  timeStyle: "short",
  timeZone: "Asia/Kolkata",
});
console.log("For Indian readers:", formatter.format(meeting));
console.log("For US readers:", meeting.toLocaleDateString("en-US", { timeZone: "UTC" }));
