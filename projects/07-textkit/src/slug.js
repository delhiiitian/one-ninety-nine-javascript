// Slugs: turn titles into clean, URL-friendly strings.
// "Café Menu: Top 10 Dishes!" -> "cafe-menu-top-10-dishes"

export function slugify(text, { maxLength = 60, separator = "-" } = {}) {
  const slug = String(text)
    .normalize("NFKD")                 // split "é" into "e" + accent mark
    .replace(/[\u0300-\u036f]/g, "")   // drop the accent marks
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, separator) // anything else becomes the separator
    .replace(new RegExp(`^${separator}+|${separator}+$`, "g"), "");

  if (slug.length <= maxLength) return slug;
  // Cut at a word boundary so we never end with half a word.
  const cut = slug.slice(0, maxLength + 1);
  return cut.slice(0, cut.lastIndexOf(separator)) || slug.slice(0, maxLength);
}

// Make a slug unique within a set of existing ones: "post", "post-2", "post-3"...
export function uniqueSlug(text, existing) {
  const base = slugify(text);
  let candidate = base;
  for (let n = 2; existing.has(candidate); n++) candidate = `${base}-${n}`;
  existing.add(candidate);
  return candidate;
}
