import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { createApp } from "./server.js";

let server;
let base;
let dir;

before(async () => {
  dir = await fs.mkdtemp(path.join(os.tmpdir(), "notes-"));
  server = await createApp({ notesFile: path.join(dir, "notes.json") });
  await new Promise((resolve) => server.listen(0, resolve)); // port 0 = any free port
  base = `http://localhost:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve) => server.close(resolve));
  await fs.rm(dir, { recursive: true, force: true });
});

const call = async (method, url, body) => {
  const res = await fetch(base + url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body === undefined ? undefined : typeof body === "string" ? body : JSON.stringify(body),
  });
  return { status: res.status, data: res.status === 204 ? null : await res.json() };
};

test("full create, read, update, delete cycle", async () => {
  const created = await call("POST", "/api/notes", { title: " Groceries ", body: "Milk, eggs", tags: ["Home", "home", " "] });
  assert.equal(created.status, 201);
  assert.equal(created.data.title, "Groceries");
  assert.deepEqual(created.data.tags, ["home"]);

  const id = created.data.id;
  assert.equal((await call("GET", `/api/notes/${id}`)).data.body, "Milk, eggs");

  const updated = await call("PATCH", `/api/notes/${id}`, { pinned: true });
  assert.equal(updated.data.pinned, true);
  assert.equal(updated.data.title, "Groceries");

  assert.equal((await call("DELETE", `/api/notes/${id}`)).status, 204);
  assert.equal((await call("GET", `/api/notes/${id}`)).status, 404);
});

test("notes are saved to the JSON file", async () => {
  await call("POST", "/api/notes", { title: "Persisted" });
  const saved = JSON.parse(await fs.readFile(path.join(dir, "notes.json"), "utf8"));
  assert.ok(saved.some((n) => n.title === "Persisted"));
});

test("search and pinned-first ordering", async () => {
  const a = await call("POST", "/api/notes", { title: "Learn closures", body: "chapter 3" });
  await call("POST", "/api/notes", { title: "Learn promises", body: "chapter 8" });
  await call("PATCH", `/api/notes/${a.data.id}`, { pinned: true });
  const { data } = await call("GET", "/api/notes?q=learn");
  assert.deepEqual(data.map((n) => n.title), ["Learn closures", "Learn promises"]);
  assert.equal((await call("GET", "/api/notes?q=PROMISES")).data.length, 1);
});

test("bad input gets a 400 with a clear message", async () => {
  assert.deepEqual(await call("POST", "/api/notes", { body: "no title" }), { status: 400, data: { error: "title is required" } });
  assert.equal((await call("POST", "/api/notes", "{broken")).data.error, "request body must be valid JSON");
  assert.equal((await call("POST", "/api/notes", { title: "x", tags: "nope" })).status, 400);
});

test("unknown routes and static files", async () => {
  assert.equal((await call("GET", "/api/nothing")).status, 404);
  const page = await fetch(`${base}/`);
  assert.equal(page.status, 200);
  assert.match(await page.text(), /<title>Notes<\/title>/);
  assert.equal((await fetch(`${base}/missing.css`)).status, 404);
});
