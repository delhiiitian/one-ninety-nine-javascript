// 4.9 JSON: the language data speaks on the web
// Run: node chapter-04-data-structures/09-json.js

const product = {
  id: 101,
  name: "Wireless Mouse",
  price: 799,
  inStock: true,
  tags: ["electronics", "computer"],
  dimensions: { widthCm: 6, heightCm: 11 },
};

// JavaScript object -> JSON text (to send or save)
const json = JSON.stringify(product);
console.log(json);
console.log(typeof json); // "string"

// Pretty print with 2-space indentation
console.log(JSON.stringify(product, null, 2));

// Choose which keys to include
console.log(JSON.stringify(product, ["id", "name"]));

// JSON text -> JavaScript object (to use)
const incoming = '{"orderId": 55, "items": [{"sku": "A1", "qty": 2}], "paid": false}';
const order = JSON.parse(incoming);
console.log(order.items[0].qty);

// What JSON cannot hold: functions and undefined vanish, Dates become strings
const tricky = { when: new Date("2026-01-01T00:00:00Z"), run() {}, nothing: undefined };
console.log(JSON.stringify(tricky)); // {"when":"2026-01-01T00:00:00.000Z"}

// Reviver: turn date strings back into Date objects while parsing
const revived = JSON.parse('{"when":"2026-01-01T00:00:00.000Z"}', (key, value) =>
  key === "when" ? new Date(value) : value,
);
console.log(revived.when instanceof Date);

// Invalid JSON throws, so wrap parsing of outside data in try/catch
try {
  JSON.parse("{name: 'no quotes'}");
} catch (error) {
  console.log("Bad JSON:", error.name);
}
