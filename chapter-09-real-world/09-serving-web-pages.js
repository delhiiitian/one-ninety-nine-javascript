// 9.9 Serving web pages and an API from the same Node.js server
// Run: node chapter-09-real-world/09-serving-web-pages.js --serve
//      then open http://localhost:3004/07-dom-basics.html or /08-dom-events.html
// Without --serve it runs a quick self-check and exits.

import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";

const PUBLIC_DIR = path.join(import.meta.dirname, "public");
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".png": "image/png",
};

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");

  // API routes first
  if (url.pathname === "/api/time") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ now: new Date().toISOString() }));
  }

  // Everything else: a static file from the public folder (like a waiter fetching a dish from the shelf)
  const requested = url.pathname === "/" ? "/07-dom-basics.html" : url.pathname;
  const filePath = path.join(PUBLIC_DIR, path.normalize(requested));

  // Security: never serve files outside PUBLIC_DIR (blocks /../../etc/passwd tricks)
  if (!filePath.startsWith(PUBLIC_DIR + path.sep)) {
    res.writeHead(403);
    return res.end("Forbidden");
  }

  try {
    const content = await fs.readFile(filePath);
    const type = TYPES[path.extname(filePath)] ?? "application/octet-stream";
    res.writeHead(200, { "Content-Type": type });
    res.end(content);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Page not found");
  }
});

server.listen(3004, async () => {
  console.log("Open http://localhost:3004/07-dom-basics.html or /08-dom-events.html");
  if (process.argv.includes("--serve")) return;
  for (const p of ["/", "/08-dom-events.js", "/api/time", "/missing.html", "/..%2Fpackage.json"]) {
    const res = await fetch(`http://localhost:3004${p}`);
    console.log(`GET ${p.padEnd(20)} ${res.status} ${res.headers.get("content-type")}`);
  }
  server.close();
});
