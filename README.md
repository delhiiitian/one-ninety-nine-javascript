# 199 JavaScript: runnable code

All the code for the book **199 JavaScript: Learn JavaScript in 199 Pages**, part of the "199" series. Each subtopic in the book shows only the key lines; the complete, runnable file lives here.

## Quick start

You need [Node.js](https://nodejs.org) 22 or newer. No packages to install.

```bash
git clone https://github.com/delhiiitian/one-ninety-nine-javascript.git
cd one-ninety-nine-javascript
node chapter-01-basics/01-hello-world.js   # run any example
npm run examples                           # run every chapter example
npm test                                   # run all project tests
```

Browser examples (9.7 and 9.8) live in `chapter-09-real-world/public/`. Serve them with `node chapter-09-real-world/09-serving-web-pages.js --serve`.

## Contents

### 1. JavaScript basics

- 1.1 [Hello world](chapter-01-basics/01-hello-world.js)
- 1.2 [Variables](chapter-01-basics/02-variables.js)
- 1.3 [Data types](chapter-01-basics/03-data-types.js)
- 1.4 [Numbers and math](chapter-01-basics/04-numbers-and-math.js)
- 1.5 [Strings](chapter-01-basics/05-strings.js)
- 1.6 [Template literals](chapter-01-basics/06-template-literals.js)
- 1.7 [Type conversion](chapter-01-basics/07-type-conversion.js)
- 1.8 [User input](chapter-01-basics/08-user-input.js)
- 1.9 [Dates and time](chapter-01-basics/09-dates-and-time.js)
- **Project 1: [Bill Splitter](projects/01-bill-splitter/)**

### 2. Control flow

- 2.1 [Comparison operators](chapter-02-control-flow/01-comparison-operators.js)
- 2.2 [Logical operators](chapter-02-control-flow/02-logical-operators.js)
- 2.3 [If else](chapter-02-control-flow/03-if-else.js)
- 2.4 [Switch](chapter-02-control-flow/04-switch.js)
- 2.5 [Ternary and nullish](chapter-02-control-flow/05-ternary-and-nullish.js)
- 2.6 [For loop](chapter-02-control-flow/06-for-loop.js)
- 2.7 [While and do while](chapter-02-control-flow/07-while-and-do-while.js)
- 2.8 [Break and continue](chapter-02-control-flow/08-break-and-continue.js)
- 2.9 [For of and for in](chapter-02-control-flow/09-for-of-and-for-in.js)
- **Project 2: [Number Guessing Game](projects/02-number-guessing-game/)**

### 3. Functions

- 3.1 [Function basics](chapter-03-functions/01-function-basics.js)
- 3.2 [Parameters and defaults](chapter-03-functions/02-parameters-and-defaults.js)
- 3.3 [Return values](chapter-03-functions/03-return-values.js)
- 3.4 [Arrow functions](chapter-03-functions/04-arrow-functions.js)
- 3.5 [Scope and hoisting](chapter-03-functions/05-scope-and-hoisting.js)
- 3.6 [Closures](chapter-03-functions/06-closures.js)
- 3.7 [Higher order functions](chapter-03-functions/07-higher-order-functions.js)
- 3.8 [Recursion](chapter-03-functions/08-recursion.js)
- 3.9 [Pure functions](chapter-03-functions/09-pure-functions.js)
- **Project 3: [Checkout Calculator](projects/03-checkout-calculator/)**

### 4. Data structures

- 4.1 [Arrays](chapter-04-data-structures/01-arrays.js)
- 4.2 [Array methods](chapter-04-data-structures/02-array-methods.js)
- 4.3 [Objects](chapter-04-data-structures/03-objects.js)
- 4.4 [Object methods](chapter-04-data-structures/04-object-methods.js)
- 4.5 [Destructuring](chapter-04-data-structures/05-destructuring.js)
- 4.6 [Spread and rest](chapter-04-data-structures/06-spread-and-rest.js)
- 4.7 [Maps](chapter-04-data-structures/07-maps.js)
- 4.8 [Sets](chapter-04-data-structures/08-sets.js)
- 4.9 [Json](chapter-04-data-structures/09-json.js)
- **Project 4: [Library Catalog](projects/04-library-catalog/)**

### 5. Error handling

- 5.1 [Types of errors](chapter-05-error-handling/01-types-of-errors.js)
- 5.2 [Try catch](chapter-05-error-handling/02-try-catch.js)
- 5.3 [Finally](chapter-05-error-handling/03-finally.js)
- 5.4 [Throwing errors](chapter-05-error-handling/04-throwing-errors.js)
- 5.5 [Custom errors](chapter-05-error-handling/05-custom-errors.js)
- 5.6 [Input validation](chapter-05-error-handling/06-input-validation.js)
- 5.7 [Error propagation](chapter-05-error-handling/07-error-propagation.js)
- 5.8 [Retry and fallback](chapter-05-error-handling/08-retry-and-fallback.js)
- 5.9 [Logging errors](chapter-05-error-handling/09-logging-errors.js)
- **Project 5: [Signup Form Validator](projects/05-form-validator/)**

### 6. Files and I/O

- 6.1 [Reading files](chapter-06-files-and-io/01-reading-files.js)
- 6.2 [Writing files](chapter-06-files-and-io/02-writing-files.js)
- 6.3 [Async file operations](chapter-06-files-and-io/03-async-file-operations.js)
- 6.4 [Paths](chapter-06-files-and-io/04-paths.js)
- 6.5 [Directories](chapter-06-files-and-io/05-directories.js)
- 6.6 [Json files](chapter-06-files-and-io/06-json-files.js)
- 6.7 [Csv files](chapter-06-files-and-io/07-csv-files.js)
- 6.8 [Streams](chapter-06-files-and-io/08-streams.js)
- 6.9 [Stdin and stdout](chapter-06-files-and-io/09-stdin-and-stdout.js)
- **Project 6: [Expense Tracker](projects/06-expense-tracker/)**

### 7. Modules and tooling

- 7.1 [Why modules](chapter-07-modules-and-tooling/01-why-modules.js)
- 7.2 [Export and import](chapter-07-modules-and-tooling/02-export-and-import.js)
- 7.3 [Default exports](chapter-07-modules-and-tooling/03-default-exports.js)
- 7.4 [Commonjs](chapter-07-modules-and-tooling/04-commonjs.cjs)
- 7.5 [Npm and package json](chapter-07-modules-and-tooling/05-npm-and-package-json.js)
- 7.6 [Npm scripts](chapter-07-modules-and-tooling/06-npm-scripts.js)
- 7.7 [Built in modules](chapter-07-modules-and-tooling/07-built-in-modules.js)
- 7.8 [Testing](chapter-07-modules-and-tooling/08-testing.test.js)
- 7.9 [Debugging tools](chapter-07-modules-and-tooling/09-debugging-tools.js)
- **Project 7: [textkit package](projects/07-textkit/)**

### 8. Async, events and objects

- 8.1 [Event loop](chapter-08-async-and-events/01-event-loop.js)
- 8.2 [Async callbacks](chapter-08-async-and-events/02-async-callbacks.js)
- 8.3 [Promises](chapter-08-async-and-events/03-promises.js)
- 8.4 [Async await](chapter-08-async-and-events/04-async-await.js)
- 8.5 [Promise combinators](chapter-08-async-and-events/05-promise-combinators.js)
- 8.6 [Async error handling](chapter-08-async-and-events/06-async-error-handling.js)
- 8.7 [Events](chapter-08-async-and-events/07-events.js)
- 8.8 [Classes](chapter-08-async-and-events/08-classes.js)
- 8.9 [Iterators and generators](chapter-08-async-and-events/09-iterators-and-generators.js)
- **Project 8: [Async Job Queue](projects/08-async-job-queue/)**

### 9. Real-world integration

- 9.1 [Http server](chapter-09-real-world/01-http-server.js)
- 9.2 [Routing](chapter-09-real-world/02-routing.js)
- 9.3 [Fetch client](chapter-09-real-world/03-fetch-client.js)
- 9.4 [Rest api](chapter-09-real-world/04-rest-api.js)
- 9.5 [Environment config](chapter-09-real-world/05-environment-config.js)
- 9.6 [Cli arguments](chapter-09-real-world/06-cli-arguments.js)
- 9.7 [Dom basics](chapter-09-real-world/public/07-dom-basics.html)
- 9.8 [Dom events](chapter-09-real-world/public/08-dom-events.html)
- 9.9 [Serving web pages](chapter-09-real-world/09-serving-web-pages.js)
- **Project 9: [Notes App (full stack)](projects/09-notes-app/)**

## How the book and the repo fit together

Every subtopic page ends with a **Full code** link to one file here, named `chapter-NN-topic/NN-subtopic.js`. Every project has its own folder under `projects/` with a README, the source, and tests written with Node's built-in test runner.

## License

MIT
