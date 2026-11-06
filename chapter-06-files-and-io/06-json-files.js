// 6.6 Saving and loading JSON files
// Run: node chapter-06-files-and-io/06-json-files.js

import fs from "node:fs";
import path from "node:path";

const settingsPath = path.join(import.meta.dirname, "data", "settings.json");

// Load: read text, then parse it into an object.
const settings = JSON.parse(fs.readFileSync(settingsPath, "utf8"));
console.log(`${settings.appName} uses the ${settings.theme} theme`);

// Two small helpers you will reuse in almost every project.
function loadJson(filePath, fallback) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return fallback; // first run: no file yet
    throw error; // broken JSON is a real problem, so surface it
  }
}

function saveJson(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  // Write to a temporary file then rename: a crash mid-write cannot corrupt the real file.
  const temp = `${filePath}.tmp`;
  fs.writeFileSync(temp, JSON.stringify(data, null, 2) + "\n");
  fs.renameSync(temp, filePath);
}

// A visit counter that remembers between runs.
const counterPath = path.join(import.meta.dirname, "output", "visits.json");
const state = loadJson(counterPath, { visits: 0, history: [] });
state.visits += 1;
state.history.push(new Date().toISOString());
state.history = state.history.slice(-3); // keep the last 3 only
saveJson(counterPath, state);
console.log(`This script has run ${state.visits} time(s). Recent runs:`, state.history);

// Change a setting and save a copy.
const updated = { ...settings, theme: "light", recentFiles: [...settings.recentFiles, "plan.txt"] };
saveJson(path.join(import.meta.dirname, "output", "settings-copy.json"), updated);
console.log("Saved settings-copy.json with theme:", updated.theme);
