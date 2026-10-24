// Library Catalog: an in-memory library that stores books, members and loans.
// Data structures used and why:
//   Map  books by ISBN      -> instant lookup by a unique key
//   Map  tag -> Set of ISBNs -> instant "all books with this tag", no duplicates
//   Map  member -> Set of ISBNs on loan
//   Array of loan events    -> ordered history

export function createCatalog() {
  const books = new Map();
  const tagIndex = new Map();
  const loans = new Map();
  const history = [];

  function addBook({ isbn, title, author, year, tags = [], copies = 1 }) {
    if (!isbn || !title || !author) throw new Error("isbn, title and author are required");
    if (books.has(isbn)) throw new Error(`A book with ISBN ${isbn} already exists`);
    const book = { isbn, title, author, year, tags: [...new Set(tags)], copies, available: copies };
    books.set(isbn, book);
    for (const tag of book.tags) {
      if (!tagIndex.has(tag)) tagIndex.set(tag, new Set());
      tagIndex.get(tag).add(isbn);
    }
    return book;
  }

  function getBook(isbn) {
    const book = books.get(isbn);
    if (!book) throw new Error(`No book with ISBN ${isbn}`);
    return book;
  }

  function search({ text = "", tag, availableOnly = false } = {}) {
    const query = text.trim().toLowerCase();
    const pool = tag ? [...(tagIndex.get(tag) ?? [])].map((isbn) => books.get(isbn)) : [...books.values()];
    return pool
      .filter((b) => !query || `${b.title} ${b.author}`.toLowerCase().includes(query))
      .filter((b) => !availableOnly || b.available > 0)
      .sort((a, b) => a.title.localeCompare(b.title));
  }

  function borrow(member, isbn) {
    const book = getBook(isbn);
    const onLoan = loans.get(member) ?? new Set();
    if (onLoan.has(isbn)) throw new Error(`${member} already has "${book.title}"`);
    if (onLoan.size >= 3) throw new Error(`${member} has reached the limit of 3 books`);
    if (book.available === 0) throw new Error(`"${book.title}" is not available right now`);
    book.available--;
    onLoan.add(isbn);
    loans.set(member, onLoan);
    history.push({ type: "borrow", member, isbn, at: new Date().toISOString() });
    return book;
  }

  function giveBack(member, isbn) {
    const onLoan = loans.get(member);
    if (!onLoan?.has(isbn)) throw new Error(`${member} did not borrow ${isbn}`);
    onLoan.delete(isbn);
    getBook(isbn).available++;
    history.push({ type: "return", member, isbn, at: new Date().toISOString() });
  }

  function loansOf(member) {
    return [...(loans.get(member) ?? [])].map((isbn) => books.get(isbn).title);
  }

  function stats() {
    const all = [...books.values()];
    const borrowCounts = history
      .filter((e) => e.type === "borrow")
      .reduce((counts, e) => counts.set(e.isbn, (counts.get(e.isbn) ?? 0) + 1), new Map());
    const [topIsbn] = [...borrowCounts].sort((a, b) => b[1] - a[1])[0] ?? [];
    return {
      titles: all.length,
      copies: all.reduce((sum, b) => sum + b.copies, 0),
      onLoan: all.reduce((sum, b) => sum + (b.copies - b.available), 0),
      tags: [...tagIndex.keys()].sort(),
      mostBorrowed: topIsbn ? books.get(topIsbn).title : null,
      byDecade: countByDecade(all),
    };
  }

  function countByDecade(list) {
    const counts = {};
    for (const book of [...list].sort((a, b) => a.year - b.year)) {
      const decade = `${Math.floor(book.year / 10) * 10}s`;
      counts[decade] = (counts[decade] ?? 0) + 1;
    }
    return counts;
  }

  function toJSON() {
    return [...books.values()].map(({ available, ...book }) => book);
  }

  return { addBook, getBook, search, borrow, giveBack, loansOf, stats, toJSON, history };
}
