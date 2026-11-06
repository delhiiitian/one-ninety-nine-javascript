// Number Guessing Game: the rules of the game, with no input or output.
// Keeping the rules separate from the screen makes them easy to test.

export const DIFFICULTIES = {
  easy: { max: 50, attempts: 10 },
  medium: { max: 100, attempts: 7 },
  hard: { max: 500, attempts: 9 },
};

export function randomSecret(max, random = Math.random) {
  return Math.floor(random() * max) + 1;
}

export function createGame({ secret, max, attempts }) {
  const history = [];
  let low = 1;
  let high = max;
  let status = "playing"; // "playing" | "won" | "lost"

  function hint(guess) {
    const distance = Math.abs(secret - guess);
    if (distance <= 2) return "burning hot";
    if (distance <= 5) return "very warm";
    if (distance <= 15) return "warm";
    return "cold";
  }

  function guess(rawGuess) {
    if (status !== "playing") {
      return { result: "over", message: "The game is over. Start a new one!" };
    }

    const value = Number(rawGuess);
    if (!Number.isInteger(value)) {
      return { result: "invalid", message: `"${rawGuess}" is not a whole number.` };
    }
    if (value < 1 || value > max) {
      return { result: "invalid", message: `Pick a number between 1 and ${max}.` };
    }
    if (history.includes(value)) {
      return { result: "invalid", message: `You already tried ${value}.` };
    }

    history.push(value);
    const left = attempts - history.length;

    if (value === secret) {
      status = "won";
      return { result: "correct", message: `Correct! ${secret} in ${history.length} tries.` };
    }

    if (value < secret) low = Math.max(low, value + 1);
    else high = Math.min(high, value - 1);

    if (left === 0) {
      status = "lost";
      return { result: "lost", message: `Out of attempts. The number was ${secret}.` };
    }

    const direction = value < secret ? "higher" : "lower";
    return {
      result: direction,
      message: `Go ${direction} (${hint(value)}). Range ${low}-${high}. ${left} attempt${left === 1 ? "" : "s"} left.`,
    };
  }

  return {
    guess,
    get status() {
      return status;
    },
    get history() {
      return [...history];
    },
  };
}

// Score: more points for fewer attempts and harder levels.
export function score(level, triesUsed) {
  const { attempts, max } = DIFFICULTIES[level];
  const bonus = Math.round(Math.log2(max));
  return Math.max(0, (attempts - triesUsed + 1) * 10 * bonus);
}
