// Notes app front end: talks to the API with fetch and keeps the page in sync.
const api = {
  async request(method, url, body) {
    const res = await fetch(url, {
      method,
      headers: body ? { "Content-Type": "application/json" } : {},
      body: body ? JSON.stringify(body) : undefined,
    });
    if (res.status === 204) return null;
    const data = await res.json();
    if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`);
    return data;
  },
  list: (q) => api.request("GET", `/api/notes${q ? `?q=${encodeURIComponent(q)}` : ""}`),
  create: (note) => api.request("POST", "/api/notes", note),
  update: (id, changes) => api.request("PATCH", `/api/notes/${id}`, changes),
  remove: (id) => api.request("DELETE", `/api/notes/${id}`),
};

const form = document.querySelector("#note-form");
const notesEl = document.querySelector("#notes");
const search = document.querySelector("#search");
const status = document.querySelector("#status");
const template = document.querySelector("#note-template");

function showStatus(message, isError = false) {
  status.textContent = message;
  status.className = isError ? "error" : "";
}

function render(notes) {
  notesEl.replaceChildren(
    ...notes.map((note) => {
      const card = template.content.firstElementChild.cloneNode(true);
      card.dataset.id = note.id;
      card.classList.toggle("pinned", note.pinned);
      card.querySelector(".note-title").textContent = note.title; // textContent: safe from HTML injection
      card.querySelector(".note-body").textContent = note.body;
      card.querySelector(".note-tags").textContent = note.tags.map((t) => `#${t}`).join(" ");
      card.querySelector('[data-action="pin"]').textContent = note.pinned ? "Unpin" : "Pin";
      return card;
    }),
  );
  if (notes.length === 0) notesEl.textContent = "No notes yet.";
}

async function refresh() {
  try {
    render(await api.list(search.value.trim()));
  } catch (error) {
    showStatus(`Could not load notes: ${error.message}`, true);
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(form);
  try {
    await api.create({
      title: data.get("title"),
      body: data.get("body"),
      tags: String(data.get("tags")).split(","),
    });
    form.reset();
    showStatus("Note saved");
    await refresh();
  } catch (error) {
    showStatus(error.message, true);
  }
});

// Event delegation: one listener for every card's buttons.
notesEl.addEventListener("click", async (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const card = button.closest(".note");
  try {
    if (button.dataset.action === "delete") await api.remove(card.dataset.id);
    if (button.dataset.action === "pin") await api.update(card.dataset.id, { pinned: !card.classList.contains("pinned") });
    await refresh();
  } catch (error) {
    showStatus(error.message, true);
  }
});

// Debounce: wait until typing pauses for 250 ms before searching.
let timer;
search.addEventListener("input", () => {
  clearTimeout(timer);
  timer = setTimeout(refresh, 250);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
    event.preventDefault();
    search.focus();
  }
});

refresh();
