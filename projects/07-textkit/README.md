# Project 7: textkit

A real, publishable npm-style package of text utilities: case conversion (`camelCase`, `snake_case`...), URL slugs, word counts, reading time, truncation and masking. It comes with a command-line tool and a test suite, organised the way professional packages are.

Book: Chapter 7 (Modules and tooling), Project 7.

## Run it

```bash
cd projects/07-textkit
npm test
npm run demo
node bin/textkit.js slug "Café Menu: Top 10 Dishes!"
node bin/textkit.js case camel "total price in rupees"
echo "Some text to analyse. It has two sentences." | node bin/textkit.js stats

# Use it from another project on your computer:
npm link            # inside projects/07-textkit
textkit --version   # now available as a command
```

## Layout

```
07-textkit/
  package.json     name, version, entry points, bin, scripts
  src/
    index.js       public API: re-exports everything
    case.js        case conversion
    slug.js        slugs
    stats.js       counts and reading time
    truncate.js    truncate and mask
  bin/textkit.js   command-line interface
  test/            one test file per module
```

## Concepts used

ES modules (named, default, re-exports), `package.json` fields (`exports`, `bin`, `scripts`, `engines`), npm scripts, the `node:test` runner, a CLI entry point.
