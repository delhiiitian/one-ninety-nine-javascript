// 7.6 npm scripts: one-word commands for common tasks
// Run: node chapter-07-modules-and-tooling/06-npm-scripts.js
// Also try from the repository root: npm run examples   and   npm test

// Scripts live in package.json under "scripts". npm run <name> executes them.
// They save you from remembering long commands, and every teammate runs them the same way.

// When npm runs a script it sets environment variables you can read:
const lifecycle = process.env.npm_lifecycle_event;
if (lifecycle) {
  console.log(`Started by "npm run ${lifecycle}"`);
} else {
  console.log("Started directly with node (not through npm)");
}

// A script can be any shell command. Common examples:
const commonScripts = {
  start: "node src/server.js",
  dev: "node --watch src/server.js",          // restart automatically on file changes
  test: "node --test",                         // run tests (see 7.8)
  lint: "eslint .",                            // check code style
  format: "prettier --write .",                // auto-format code
  build: "esbuild src/app.js --bundle --outfile=dist/app.js",
  pretest: "npm run lint",                     // "pre" scripts run automatically before "test"
};
console.table(Object.entries(commonScripts).map(([name, command]) => ({ name, command })));

// Pass extra arguments after --  e.g.  npm run test -- --test-only
console.log("Extra arguments received:", process.argv.slice(2));

// npx runs a package's command without installing it globally:
//   npx prettier --check .
