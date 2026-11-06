// 3.6 Closures: functions that remember
// Run: node chapter-03-functions/06-closures.js

// A closure is a function bundled with the variables around it when it was created.
function createCounter() {
  let count = 0; // private: nothing outside can touch it directly
  return function () {
    count++;
    return count;
  };
}

const clickCounter = createCounter();
console.log(clickCounter()); // 1
console.log(clickCounter()); // 2
const likeCounter = createCounter(); // a brand new, separate memory
console.log(likeCounter());  // 1

// Function factories: build customised functions.
function makeDiscount(percent) {
  return (price) => price - (price * percent) / 100;
}
const festivalSale = makeDiscount(20);
const clearanceSale = makeDiscount(50);
console.log(festivalSale(1000), clearanceSale(1000));

// Private data with a small "bank account" API.
function createAccount(owner) {
  let balance = 0;
  return {
    deposit(amount) {
      balance += amount;
      return balance;
    },
    getBalance() {
      return `${owner} has ${balance}`;
    },
  };
}
const account = createAccount("Arjun");
account.deposit(500);
account.deposit(250);
console.log(account.getBalance());
console.log(account.balance); // undefined: the balance is truly hidden

// Remember once, reuse: a tiny cache (memoisation).
function memoize(fn) {
  const cache = new Map();
  return (n) => {
    if (!cache.has(n)) cache.set(n, fn(n));
    return cache.get(n);
  };
}
const slowSquare = (n) => n * n;
const fastSquare = memoize(slowSquare);
console.log(fastSquare(12), fastSquare(12));
