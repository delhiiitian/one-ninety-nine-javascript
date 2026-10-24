// 8.4 async/await: asynchronous code that reads like a recipe
// Run: node chapter-08-async-and-events/04-async-await.js

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function boilWater() {
  await wait(100);
  return "hot water";
}
async function brewTea(water) {
  await wait(100);
  return `tea made with ${water}`;
}

// `async` makes a function return a promise.
// `await` pauses THIS function until the promise settles; the rest of the program keeps running.
async function makeTea() {
  console.log("Putting the kettle on");
  const water = await boilWater();
  const tea = await brewTea(water);
  return tea;
}

const result = await makeTea(); // top-level await works in ES modules
console.log(result);

// Sequential vs parallel: do not await one by one when steps are independent.
async function getPrice(item) {
  await wait(150);
  return { item, price: item.length * 10 };
}

console.time("sequential");
const a = await getPrice("bread");
const b = await getPrice("butter");
console.timeEnd("sequential"); // about 300 ms

console.time("parallel");
const [c, d] = await Promise.all([getPrice("bread"), getPrice("butter")]);
console.timeEnd("parallel"); // about 150 ms
console.log(a, b, c, d);

// Looping with await
for (const item of ["jam", "eggs"]) {
  const { price } = await getPrice(item);
  console.log(`${item}: ${price}`);
}
