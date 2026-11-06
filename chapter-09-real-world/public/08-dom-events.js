// 9.8 Events in the browser: reacting to clicks, typing and forms
// Open chapter-09-real-world/public/08-dom-events.html in a browser.

const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const todos = document.querySelector("#todos");
const message = document.querySelector("#message");
const remaining = document.querySelector("#remaining");

function updateRemaining() {
  remaining.textContent = todos.querySelectorAll("li:not(.done)").length;
}

// 1. Form submit: one handler for both the button click and the Enter key.
form.addEventListener("submit", (event) => {
  event.preventDefault(); // stop the browser from reloading the page
  const text = input.value.trim();
  if (!text) {
    message.textContent = "Please type something first";
    message.className = "error";
    return;
  }
  const li = document.createElement("li");
  li.textContent = text;
  const remove = document.createElement("button");
  remove.textContent = "x";
  remove.dataset.action = "remove";
  li.append(" ", remove);
  todos.append(li);
  input.value = "";
  message.textContent = `Added "${text}"`;
  message.className = "";
  updateRemaining();
});

// 2. Event delegation: ONE listener on the list handles clicks on every item, even future ones.
todos.addEventListener("click", (event) => {
  const li = event.target.closest("li");
  if (!li) return;
  if (event.target.dataset.action === "remove") li.remove();
  else li.classList.toggle("done");
  updateRemaining();
});

// 3. Input event: react while the user types.
input.addEventListener("input", () => {
  if (input.value.length > 40) message.textContent = "That is a long to-do!";
});

// 4. Keyboard shortcut: press "/" to jump to the input box.
document.addEventListener("keydown", (event) => {
  if (event.key === "/" && document.activeElement !== input) {
    event.preventDefault();
    input.focus();
  }
});
