// Text statistics: words, sentences, reading time and most common words.

const STOP_WORDS = new Set("a an and are as at be by for from has in is it its of on or that the to was were will with".split(" "));

export function countWords(text) {
  return (String(text).match(/[\p{L}\p{M}\p{N}']+/gu) ?? []).length;
}

export function countSentences(text) {
  return (String(text).match(/[^.!?]+[.!?]+(\s|$)/g) ?? []).length || (String(text).trim() ? 1 : 0);
}

// Average adult reading speed is roughly 200-250 words per minute.
export function readingTime(text, wordsPerMinute = 220) {
  const minutes = countWords(text) / wordsPerMinute;
  return minutes < 1 ? "less than a minute" : `${Math.round(minutes)} min read`;
}

export function topWords(text, n = 5) {
  const counts = new Map();
  for (const word of String(text).toLowerCase().match(/[\p{L}\p{M}']+/gu) ?? []) {
    if (word.length < 3 || STOP_WORDS.has(word)) continue;
    counts.set(word, (counts.get(word) ?? 0) + 1);
  }
  return [...counts]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, n)
    .map(([word, count]) => ({ word, count }));
}

export function stats(text) {
  return {
    characters: String(text).length,
    words: countWords(text),
    sentences: countSentences(text),
    readingTime: readingTime(text),
    topWords: topWords(text),
  };
}
