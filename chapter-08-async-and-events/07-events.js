// 8.7 Events and EventEmitter: "tell me when something happens"
// Run: node chapter-08-async-and-events/07-events.js

import { EventEmitter, once } from "node:events";

// Like a doorbell: anyone can listen for it; whoever presses it does not need to know who listens.
const doorbell = new EventEmitter();

doorbell.on("ring", (visitor) => console.log(`Dog barks at ${visitor}`));
doorbell.on("ring", (visitor) => console.log(`Owner opens the door for ${visitor}`));
doorbell.once("ring", () => console.log("(First ring of the day logged)"));

doorbell.emit("ring", "the postman");
doorbell.emit("ring", "a neighbour");

// Your own classes can emit events by extending EventEmitter.
class Order extends EventEmitter {
  constructor(id) {
    super();
    this.id = id;
  }
  async process() {
    this.emit("status", "received");
    await new Promise((r) => setTimeout(r, 50));
    this.emit("status", "packed");
    await new Promise((r) => setTimeout(r, 50));
    this.emit("status", "shipped");
    this.emit("done", { id: this.id, deliveredIn: "2 days" });
  }
}

const order = new Order("ORD-42");
order.on("status", (s) => console.log(`[${order.id}] status: ${s}`));
order.process();

// Wait for a single event with a promise.
const [summary] = await once(order, "done");
console.log("Done event:", summary);

// Errors: emit "error" with a listener, or Node throws.
order.on("error", (e) => console.log("Order error:", e.message));
order.emit("error", new Error("Address not found"));

// Remove listeners you no longer need to avoid memory leaks.
const log = () => {};
doorbell.on("ring", log);
doorbell.off("ring", log);
console.log("ring listeners:", doorbell.listenerCount("ring"));
