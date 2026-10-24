// Notes app server: a JSON REST API plus the web page that uses it.
// Run: node projects/09-notes-app/server.js    then open http://localhost:3000
// Settings via environment variables: PORT (default 3000), NOTES_FILE (default ./data/notes.json)
import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { createStore, NotFoundError, ValidationError } from "./store.js";

const PUBLIC_DIR = path.join(import.meta.dirname, "public");
const MIME = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8" };
const MAX_BODY = 100_000; // bytes: refuse huge uploads

function sendJson(res, status, data) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(status === 204 ? "" : JSON.stringify(data));
}

async function readJson(req) {
  let raw = "";
  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > MAX_BODY) throw new ValidationError("request body too large");
  }
  try {
    return raw ? JSON.parse(raw) : {};
  } catch {
    throw new ValidationError("request body must be valid JSON");
  }
}

async function serveStatic(res, pathname) {
  const file = path.join(PUBLIC_DIR, path.normalize(pathname === "/" ? "/index.html" : pathname));
  if (!file.startsWith(PUBLIC_DIR + path.sep)) return sendJson(res, 403, { error: "Forbidden" });
  try {
    const content = await fs.readFile(file);
    res.writeHead(200, { "Content-Type": MIME[path.extname(file)] ?? "application/octet-stream" });
    res.end(content);
  } catch {
    sendJson(res, 404, { error: "Not found" });
  }
}

export async function createApp({ notesFile } = {}) {
  const store = await createStore(notesFile);

  // Route table: [method, pattern, handler]. Patterns capture the note id.
  const routes = [
    ["GET", /^\/api\/notes$/, (req, res, url) =>
      sendJson(res, 200, store.list({ q: url.searchParams.get("q") ?? undefined, tag: url.searchParams.get("tag") ?? undefined }))],
    ["POST", /^\/api\/notes$/, async (req, res) => sendJson(res, 201, await store.create(await readJson(req)))],
    ["GET", /^\/api\/notes\/([\w-]+)$/, (req, res, url, id) => sendJson(res, 200, store.get(id))],
    ["PATCH", /^\/api\/notes\/([\w-]+)$/, async (req, res, url, id) => sendJson(res, 200, await store.update(id, await readJson(req)))],
    ["DELETE", /^\/api\/notes\/([\w-]+)$/, async (req, res, url, id) => {
      await store.remove(id);
      sendJson(res, 204);
    }],
    ["GET", /^\/api\/health$/, (req, res) => sendJson(res, 200, { status: "ok" })],
  ];

  return http.createServer(async (req, res) => {
    const url = new URL(req.url, "http://localhost");
    const started = Date.now();
    res.on("finish", () => {
      if (process.env.LOG_REQUESTS) console.log(`${req.method} ${url.pathname} ${res.statusCode} ${Date.now() - started}ms`);
    });
    try {
      for (const [method, pattern, handler] of routes) {
        const match = url.pathname.match(pattern);
        if (match && req.method === method) return await handler(req, res, url, match[1]);
      }
      if (url.pathname.startsWith("/api/")) return sendJson(res, 404, { error: "Unknown API route" });
      if (req.method === "GET") return await serveStatic(res, url.pathname);
      sendJson(res, 405, { error: "Method not allowed" });
    } catch (error) {
      if (error instanceof ValidationError) return sendJson(res, 400, { error: error.message });
      if (error instanceof NotFoundError) return sendJson(res, 404, { error: error.message });
      console.error(error); // unexpected: log the details, hide them from the client
      sendJson(res, 500, { error: "Something went wrong" });
    }
  });
}

// Start the server only when this file is run directly (not when imported by tests).
if (import.meta.filename === process.argv[1]) {
  const port = Number(process.env.PORT ?? 3000);
  const notesFile = process.env.NOTES_FILE ?? path.join(import.meta.dirname, "data", "notes.json");
  const server = await createApp({ notesFile });
  server.listen(port, () => console.log(`Notes app running at http://localhost:${port} (saving to ${notesFile})`));
}
