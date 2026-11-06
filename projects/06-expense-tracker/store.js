// Storage layer: saves and loads expenses as a JSON file on disk.
// Nothing else in the app knows a file is involved, so swapping in a database later is easy.
import fs from "node:fs/promises";
import path from "node:path";

export function createStore(filePath) {
  async function load() {
    try {
      const text = await fs.readFile(filePath, "utf8");
      const data = JSON.parse(text);
      if (!Array.isArray(data.expenses)) throw new Error("missing expenses array");
      return data;
    } catch (error) {
      if (error.code === "ENOENT") return { nextId: 1, expenses: [] }; // first run
      throw new Error(`Could not read ${filePath}: ${error.message}`, { cause: error });
    }
  }

  async function save(data) {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    const temp = `${filePath}.tmp`;
    await fs.writeFile(temp, JSON.stringify(data, null, 2) + "\n");
    await fs.rename(temp, filePath); // atomic replace: never leaves a half-written file
  }

  return { load, save, filePath };
}
