// textkit public API. Users import everything from here:
//   import { slugify, titleCase, stats } from "textkit";
// Internal file layout can change without breaking anyone.
export * from "./case.js";
export { slugify, uniqueSlug } from "./slug.js";
export { countWords, countSentences, readingTime, topWords, stats } from "./stats.js";
export { truncate, mask } from "./truncate.js";

export const VERSION = "1.0.0";
