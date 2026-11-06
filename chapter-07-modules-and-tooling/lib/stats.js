// Functions tested in 7.8 (testing with node:test).
export function mean(numbers) {
  if (numbers.length === 0) throw new Error("mean() needs at least one number");
  return numbers.reduce((sum, n) => sum + n, 0) / numbers.length;
}

export function median(numbers) {
  if (numbers.length === 0) throw new Error("median() needs at least one number");
  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}
