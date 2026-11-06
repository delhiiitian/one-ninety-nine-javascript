# Project 9: Notes App (full stack)

A complete small web application: a Node.js server with a JSON REST API and file storage, and a browser front end that creates, searches, pins and deletes notes. It uses only built-in Node modules and plain browser JavaScript, so you can see every moving part.

Book: Chapter 9 (Real-world integration), Project 9.

## Run it

```bash
node projects/09-notes-app/server.js
# open http://localhost:3000

PORT=4000 NOTES_FILE=/tmp/my-notes.json LOG_REQUESTS=1 node projects/09-notes-app/server.js
node --test projects/09-notes-app/*.test.js
```

## API

| Method | Path | What it does |
| --- | --- | --- |
| GET | `/api/notes?q=text&tag=work` | List notes, pinned first, optional search and tag filter |
| POST | `/api/notes` | Create a note: `{ "title", "body", "tags": [], "pinned" }` |
| GET | `/api/notes/:id` | Get one note |
| PATCH | `/api/notes/:id` | Change some fields |
| DELETE | `/api/notes/:id` | Delete a note |
| GET | `/api/health` | Health check for monitoring |

## Files

| File | Job |
| --- | --- |
| `store.js` | Validates notes, keeps them in memory, saves to JSON safely |
| `server.js` | HTTP server: routing, JSON parsing, error to status-code mapping, static files |
| `public/index.html`, `style.css`, `app.js` | The web page: forms, fetch calls, rendering, event delegation, search debounce |
| `server.test.js` | API tests against a real server on a random port |

## Concepts used

`node:http`, routing, REST, JSON, environment variables, `fetch`, the DOM, events, async error handling, custom errors, file storage.
