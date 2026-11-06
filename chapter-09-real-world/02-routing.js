// 9.2 Routing: different answers for different URLs
// Run: node chapter-09-real-world/02-routing.js  (add --serve to keep it running)

import http from "node:http";

const menu = [
  { id: 1, name: "Masala Chai", price: 30 },
  { id: 2, name: "Filter Coffee", price: 40 },
];

function sendJson(res, status, data) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

// A route table: "METHOD path" -> handler. Like a receptionist directing visitors.
const routes = {
  "GET /": (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Cafe API</h1><p>Try /menu or /menu/1</p>");
  },
  "GET /menu": (req, res, url) => {
    const max = Number(url.searchParams.get("maxPrice") ?? Infinity); // query string ?maxPrice=35
    sendJson(res, 200, menu.filter((item) => item.price <= max));
  },
  "GET /health": (req, res) => sendJson(res, 200, { status: "ok", uptime: process.uptime() }),
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const handler = routes[`${req.method} ${url.pathname}`];
  if (handler) return handler(req, res, url);

  // Dynamic route: /menu/:id
  const match = url.pathname.match(/^\/menu\/(\d+)$/);
  if (req.method === "GET" && match) {
    const item = menu.find((m) => m.id === Number(match[1]));
    return item ? sendJson(res, 200, item) : sendJson(res, 404, { error: "Item not found" });
  }

  sendJson(res, 404, { error: `No route for ${req.method} ${url.pathname}` });
});

server.listen(3001, async () => {
  console.log("Cafe API on http://localhost:3001");
  if (process.argv.includes("--serve")) return;
  for (const path of ["/menu", "/menu?maxPrice=35", "/menu/2", "/menu/9", "/nowhere"]) {
    const res = await fetch(`http://localhost:3001${path}`);
    console.log(`GET ${path.padEnd(18)} ${res.status}`, await res.text());
  }
  server.close();
});
