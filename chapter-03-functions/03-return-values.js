// 3.3 Return values: getting answers back from functions
// Run: node chapter-03-functions/03-return-values.js

// return sends a value back and ends the function immediately.
function calculateBmi(weightKg, heightM) {
  return weightKg / (heightM * heightM);
}
const bmi = calculateBmi(70, 1.75);
console.log("BMI:", bmi.toFixed(1));

// A function without return gives back undefined.
function logOnly(message) {
  console.log("LOG:", message);
}
const result = logOnly("saved");
console.log("result is", result);

// Return early to handle special cases first.
function grade(score) {
  if (score < 0 || score > 100) return "Invalid score";
  if (score >= 90) return "A";
  if (score >= 75) return "B";
  if (score >= 50) return "C";
  return "Fail";
}
console.log([95, 80, 55, 30, 120].map(grade));

// Return several values by returning an object (or an array).
function splitBill(total, people) {
  const share = Math.floor((total / people) * 100) / 100;
  const remainder = Math.round((total - share * people) * 100) / 100;
  return { share, remainder };
}
const { share, remainder } = splitBill(1000, 3);
console.log(`Each pays ${share}, someone covers ${remainder} extra`);

// Return values can be fed straight into other functions.
console.log("Rounded BMI:", Math.round(calculateBmi(70, 1.75)));
