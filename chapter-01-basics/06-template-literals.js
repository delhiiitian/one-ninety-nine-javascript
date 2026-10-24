// 1.6 Template literals: text with values inside
// Run: node chapter-01-basics/06-template-literals.js

const customer = "Meera";
const items = 3;
const total = 749.5;

// Backticks allow ${...} placeholders.
console.log(`Hi ${customer}, you bought ${items} items.`);

// Any expression works inside ${ }.
console.log(`Total with 18% GST: ${(total * 1.18).toFixed(2)}`);
console.log(`You ${items > 2 ? "qualify" : "do not qualify"} for free delivery.`);

// Template literals can span several lines, which is perfect for messages.
const receipt = `
-----------------------------
  RECEIPT for ${customer}
  Items : ${items}
  Total : Rs ${total}
-----------------------------`;
console.log(receipt);

// Building a small HTML snippet (how web pages are often generated).
const product = { name: "Notebook", price: 60 };
const html = `<li class="product">${product.name} - Rs ${product.price}</li>`;
console.log(html);

// Compare with old-style concatenation:
console.log("Hi " + customer + ", you bought " + items + " items.");
