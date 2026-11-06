// Shorten long text for previews, cards and notifications.

export function truncate(text, maxLength, { ending = "...", wordBoundary = true } = {}) {
  const s = String(text);
  if (s.length <= maxLength) return s;
  let cut = s.slice(0, Math.max(0, maxLength - ending.length));
  if (wordBoundary && cut.includes(" ")) cut = cut.slice(0, cut.lastIndexOf(" "));
  return cut.trimEnd() + ending;
}

// Hide most of a sensitive value: "9876543210" -> "******3210"
export function mask(value, visible = 4, char = "*") {
  const s = String(value);
  return char.repeat(Math.max(0, s.length - visible)) + s.slice(-visible);
}
