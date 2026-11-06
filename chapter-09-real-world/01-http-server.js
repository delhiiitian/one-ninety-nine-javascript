// 9.1 Your first web server with node:http
// Run: node chapter-09-real-world/01-http-server.js          (quick demo, then exits)
//      node chapter-09-real-world/01-http-server.js --serve  (keeps running: open http://localhost:3000)

import http from "node:http";

// A server is like a shop counter: it waits for requests and hands back responses.
const server = http.createServer((request, response) => {
  console.log(`-> ${request.method} ${request.url}`);

  response.statusCode = 200;                                  // 200 = OK
  response.setHeader("Content-Type", "text/plain; charset=utf-8");
  response.end(`Hello from Node.js! You asked for ${request.url}\n`);
});

const port = Number(process.env.PORT ?? 3000);

server.listen(port, async () => {
  console.log(`Server listening on http://localhost:${port}`);

  if (process.argv.includes("--serve")) return; // stay running, Ctrl+C to stop

  // Demo mode: act as our own first visitor, then shut down.
  const res = await fetch(`http://localhost:${port}/welcome`);
  console.log("<-", res.status, res.headers.get("content-type"));
  console.log("<-", await res.text());
  server.close(() => console.log("Server stopped"));
});
