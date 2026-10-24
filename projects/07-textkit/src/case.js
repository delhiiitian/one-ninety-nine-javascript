// Case conversion: split any text into words, then join them in the style you need.

export function words(text) {
  return String(text)
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2") // split camelCase: "userName" -> "user Name"
    .split(/[^A-Za-z0-9]+/)                 // split on spaces, dashes, underscores, punctuation
    .filter(Boolean)
    .map((w) => w.toLowerCase());
}

const capitalize = (w) => w.charAt(0).toUpperCase() + w.slice(1);

export const camelCase = (text) => words(text).map((w, i) => (i ? capitalize(w) : w)).join("");
export const pascalCase = (text) => words(text).map(capitalize).join("");
export const snakeCase = (text) => words(text).join("_");
export const kebabCase = (text) => words(text).join("-");
export const constantCase = (text) => snakeCase(text).toUpperCase();

const SMALL_WORDS = new Set(["a", "an", "and", "as", "at", "but", "by", "for", "in", "of", "on", "or", "the", "to"]);
export function titleCase(text) {
  return words(text)
    .map((w, i, all) => (i > 0 && i < all.length - 1 && SMALL_WORDS.has(w) ? w : capitalize(w)))
    .join(" ");
}
