// 2.3 if, else if, else: making decisions
// Run: node chapter-02-control-flow/03-if-else.js

function describeTemperature(celsius) {
  if (celsius >= 35) {
    return "Hot: stay hydrated";
  } else if (celsius >= 20) {
    return "Pleasant: great day for a walk";
  } else if (celsius >= 5) {
    return "Cool: take a jacket";
  } else {
    return "Cold: wear a coat";
  }
}

for (const temp of [40, 25, 10, -3]) {
  console.log(`${temp} C -> ${describeTemperature(temp)}`);
}

// Real use: delivery charges in an online shop.
function deliveryFee(orderTotal, isPrimeMember) {
  if (isPrimeMember) {
    return 0;
  }
  if (orderTotal >= 500) {
    return 0;
  }
  return 40;
}

console.log("Fee for 300, not member:", deliveryFee(300, false));
console.log("Fee for 300, member:", deliveryFee(300, true));
console.log("Fee for 800, not member:", deliveryFee(800, false));

// Guard clause style: exit early instead of nesting deeply.
function withdraw(balance, amount) {
  if (amount <= 0) return "Amount must be positive";
  if (amount > balance) return "Insufficient funds";
  return `Withdrawn ${amount}. New balance ${balance - amount}`;
}
console.log(withdraw(1000, 1500));
console.log(withdraw(1000, 200));
