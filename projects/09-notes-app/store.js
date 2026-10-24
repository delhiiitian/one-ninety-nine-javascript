// NoteStore: keeps notes in memory and saves them to a JSON file after every change.
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

export class NotFoundError extends Error {
  constructor(id) {
    super(`Note ${id} not found`);
    this.name = "NotFoundError";
  }
}

export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

export async function createStore(filePath) {
  let notes = [];
  if (filePath) {
    try {
      notes = JSON.parse(await fs.readFile(filePath, "utf8"));
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  }

  let saving = Promise.resolve();
  function persist() {
    if (!filePath) return Promise.resolve();
    // Chain saves so two quick changes never write the file at the same time.
    saving = saving.then(async () => {
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(`${filePath}.tmp`, JSON.stringify(notes, null, 2));
      await fs.rename(`${filePath}.tmp`, filePath);
    });
    return saving;
  }

  function clean(input, { partial = false } = {}) {
    const out = {};
    if (!partial || "title" in input) {
      const title = String(input.title ?? "").trim();
      if (!title) throw new ValidationError("title is required");
      if (title.length > 120) throw new ValidationError("title must be 120 characters or fewer");
      out.title = title;
    }
    if (!partial || "body" in input) out.body = String(input.body ?? "").slice(0, 5000);
    if ("pinned" in input) out.pinned = Boolean(input.pinned);
    if ("tags" in input) {
      if (!Array.isArray(input.tags)) throw new ValidationError("tags must be an array");
      out.tags = [...new Set(input.tags.map((t) => String(t).trim().toLowerCase()).filter(Boolean))];
    }
    return out;
  }

  function find(id) {
    const note = notes.find((n) => n.id === id);
    if (!note) throw new NotFoundError(id);
    return note;
  }

  return {
    list({ q, tag } = {}) {
      const query = q?.toLowerCase();
      return notes
        .filter((n) => !query || `${n.title} ${n.body}`.toLowerCase().includes(query))
        .filter((n) => !tag || n.tags.includes(tag))
        .sort((a, b) => Number(b.pinned) - Number(a.pinned) || b.updatedAt.localeCompare(a.updatedAt));
    },
    get: find,
    async create(input) {
      const now = new Date().toISOString();
      const note = { id: crypto.randomUUID(), pinned: false, tags: [], ...clean(input), createdAt: now, updatedAt: now };
      notes.push(note);
      await persist();
      return note;
    },
    async update(id, input) {
      const note = find(id);
      Object.assign(note, clean(input, { partial: true }), { updatedAt: new Date().toISOString() });
      await persist();
      return note;
    },
    async remove(id) {
      find(id);
      notes = notes.filter((n) => n.id !== id);
      await persist();
    },
  };
}
