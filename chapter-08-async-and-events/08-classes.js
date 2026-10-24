// 8.8 Classes and prototypes: blueprints for objects
// Run: node chapter-08-async-and-events/08-classes.js

// A class is a blueprint, like a house plan. Each object made from it is one house.
class BankAccount {
  #balance = 0; // private field: only code inside the class can touch it
  static bankName = "JS Bank"; // shared by the class itself

  constructor(owner, openingDeposit = 0) {
    this.owner = owner;
    this.deposit(openingDeposit);
  }

  deposit(amount) {
    if (amount < 0) throw new RangeError("Deposit must be positive");
    this.#balance += amount;
    return this; // returning this allows chaining
  }

  withdraw(amount) {
    if (amount > this.#balance) throw new Error("Insufficient funds");
    this.#balance -= amount;
    return this;
  }

  get balance() {
    return this.#balance; // a getter looks like a property from outside
  }

  toString() {
    return `${this.owner}: ${this.#balance} (${BankAccount.bankName})`;
  }
}

const account = new BankAccount("Lata", 1000);
account.deposit(500).withdraw(200);
console.log(String(account));
console.log("Balance via getter:", account.balance);

// Inheritance: a specialised blueprint that reuses the general one.
class SavingsAccount extends BankAccount {
  constructor(owner, deposit, rate) {
    super(owner, deposit); // run the parent constructor first
    this.rate = rate;
  }
  addInterest() {
    return this.deposit(Math.round(this.balance * this.rate));
  }
}

const savings = new SavingsAccount("Manav", 10000, 0.04);
savings.addInterest();
console.log(String(savings));
console.log(savings instanceof SavingsAccount, savings instanceof BankAccount);

// Under the hood, methods live on a shared prototype object, not on each instance.
console.log(Object.getPrototypeOf(account) === BankAccount.prototype);
console.log("Own keys only:", Object.keys(account));
