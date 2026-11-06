// 9.7 The DOM: changing a web page with JavaScript (runs in the browser)
// Open chapter-09-real-world/public/07-dom-basics.html in a browser.

// The DOM (Document Object Model) is the page as a tree of objects JavaScript can edit,
// like a dollhouse you can rearrange while people are looking at it.

// 1. Find elements
const title = document.querySelector("#title");        // by id
const hint = document.querySelector(".hint");          // by class
const list = document.getElementById("list");

// 2. Change text, styles and attributes
title.textContent = "My shopping list";
hint.style.color = "gray";
title.setAttribute("data-updated", "yes");

// 3. Create and add new elements
const items = [
  { name: "Tomatoes", qty: 2, unit: "kg" },
  { name: "Milk", qty: 1, unit: "litre" },
  { name: "Bread", qty: 1, unit: "loaf" },
];
for (const item of items) {
  const li = document.createElement("li");
  li.textContent = `${item.name}: ${item.qty} ${item.unit}`; // textContent is safe from HTML injection
  li.classList.add("item");
  list.append(li);
}

// 4. Read from the page
const count = document.querySelectorAll("li.item").length;
document.querySelector("#summary").textContent = `${count} items to buy`;

// 5. Remove an element
hint.remove();
