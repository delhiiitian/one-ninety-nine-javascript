// Number Guessing Game: play it in the terminal.
// Run: node projects/02-number-guessing-game/play.js [easy|medium|hard]

import readline from "node:readline/promises";
import { DIFFICULTIES, createGame, randomSecret, score } from "./game.js";

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

async function chooseLevel() {
  const fromArgs = process.argv[2];
  if (fromArgs in DIFFICULTIES) return fromArgs;
  while (true) {
    const answer = (await rl.question("Choose a level (easy / medium / hard): ")).trim().toLowerCase();
    if (answer in DIFFICULTIES) return answer;
    console.log("Please type easy, medium or hard.");
  }
}

async function playRound(level) {
  const { max, attempts } = DIFFICULTIES[level];
  const game = createGame({ secret: randomSecret(max), max, attempts });
  console.log(`\nI am thinking of a number between 1 and ${max}. You have ${attempts} attempts.`);

  while (game.status === "playing") {
    const answer = await rl.question("Your guess: ");
    const { result, message } = game.guess(answer.trim());
    console.log(message);
    if (result === "correct") {
      console.log(`Score: ${score(level, game.history.length)} points`);
    }
  }
}

let keepPlaying = true;
while (keepPlaying) {
  const level = await chooseLevel();
  await playRound(level);
  const again = await rl.question("\nPlay again? (y/n): ");
  keepPlaying = again.trim().toLowerCase().startsWith("y");
  process.argv[2] = undefined; // ask for the level next time
}
console.log("Thanks for playing!");
rl.close();
