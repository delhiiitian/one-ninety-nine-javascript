# Project 2: Number Guessing Game

The computer picks a secret number. You guess, it says "higher" or "lower" with a warm/cold hint, and you try to win before the attempts run out.

Book: Chapter 2 (Control flow), Project 2.

## Run it

```bash
node projects/02-number-guessing-game/play.js          # asks for a level
node projects/02-number-guessing-game/play.js hard     # jump straight in
node --test projects/02-number-guessing-game/*.test.js
```

## Files

| File | Job |
| --- | --- |
| `game.js` | The rules: validates guesses, tracks attempts and range, decides win or loss, scores |
| `play.js` | The terminal loop: asks questions, prints messages, offers another round |
| `game.test.js` | Checks every rule without a human typing |

## Concepts used

`if`/`else if`, comparison and logical operators, `while` loops, `break`-free loop control with a status flag, `switch`-like lookups with objects, ternaries.
