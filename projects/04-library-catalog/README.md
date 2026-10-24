# Project 4: Library Catalog

A small library system: add books, search by text or tag, borrow and return copies, and see statistics. It is the kind of logic that sits behind a college library portal or a book-lending app.

Book: Chapter 4 (Data structures), Project 4.

## Run it

```bash
node projects/04-library-catalog/demo.js
node --test projects/04-library-catalog/*.test.js
```

## Files

| File | Job |
| --- | --- |
| `catalog.js` | `createCatalog()`: books in a `Map`, a tag index of `Set`s, loans per member, an event history array |
| `books.json` | Sample data loaded by the demo (ISBNs are illustrative) |
| `demo.js` | Loads the sample books and walks through searching, borrowing and returning |
| `catalog.test.js` | Tests for every rule |

## Concepts used

Arrays and array methods, objects, destructuring, spread and rest, `Map`, `Set`, JSON.
