// 9.4 A REST API: create, read, update and delete (CRUD) over HTTP
// Run: node chapter-09-real-world/04-rest-api.js  (add --serve to keep it running)

import http from "node:http";

// REST maps actions to HTTP methods, like a library desk:
//   GET /books        list books          POST /books       add a book
//   GET /books/:id    see one book        PUT /books/:id    replace a book
//   DELETE /books/:id remove a book
const books = new Map();
let nextId = 1;

async function readBody(req) {
  let raw = "";
  for await (const chunk of req) raw += chunk;
  return raw ? JSON.parse(raw) : {};
}

function send(res, status, data) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(data === undefined ? "" : JSON.stringify(data));
}

const server = http.createServer(async (req, res) => {
  try {
    const [, resource, idText] = req.url.split("/"); // "/books/3" -> ["", "books", "3"]
    if (resource !== "books") return send(res, 404, { error: "Not found" });
    const id = Number(idText);

    if (req.method === "GET" && !idText) return send(res, 200, [...books.values()]);
    if (req.method === "POST" && !idText) {
      const { title, author } = await readBody(req);
      if (!title || !author) return send(res, 400, { error: "title and author are required" });
      const book = { id: nextId++, title, author };
      books.set(book.id, book);
      return send(res, 201, book); // 201 = Created
    }
    if (!books.has(id)) return send(res, 404, { error: `Book ${idText} not found` });
    if (req.method === "GET") return send(res, 200, books.get(id));
    if (req.method === "PUT") {
      const updated = { ...(await readBody(req)), id };
      books.set(id, updated);
      return send(res, 200, updated);
    }
    if (req.method === "DELETE") {
      books.delete(id);
      return send(res, 204); // 204 = No Content
    }
    send(res, 405, { error: "Method not allowed" });
  } catch (error) {
    send(res, 400, { error: `Bad request: ${error.message}` });
  }
});

server.listen(3003, async () => {
  if (process.argv.includes("--serve")) return console.log("Books API on http://localhost:3003/books");
  const api = async (method, path, body) => {
    const res = await fetch(`http://localhost:3003${path}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body && JSON.stringify(body),
    });
    const text = await res.text();
    console.log(`${method.padEnd(6)} ${path.padEnd(9)} -> ${res.status} ${text}`);
  };
  await api("POST", "/books", { title: "Godaan", author: "Premchand" });
  await api("POST", "/books", { title: "Malgudi Days", author: "R. K. Narayan" });
  await api("POST", "/books", { title: "No author" });
  await api("GET", "/books");
  await api("PUT", "/books/1", { title: "Godaan (Classic)", author: "Munshi Premchand" });
  await api("DELETE", "/books/2");
  await api("GET", "/books/2");
  await api("GET", "/books");
  server.close();
});
