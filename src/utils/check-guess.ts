import { KeyStatus } from "../@types/wordle-state";

export const checkGuess = (guess: string, wordle: string) => {
  // prepare to check
  const guess_splitted = guess.split("");
  const dirty_wordle = wordle.split("");

  const checked: { key: string; type: KeyStatus }[] = guess_splitted.map(
    (key) => ({ key: key, type: "wrong" }),
  );

  // Correct Keys
  for (let idx = 0; idx < guess.length; idx++) {
    if (dirty_wordle[idx] === guess[idx]) {
      checked[idx].type = "correct";
      dirty_wordle[idx] = "_";
      guess_splitted[idx] = "~";
    }
  }
  // Misplaced Keys
  for (let idx = 0; idx < guess.length; idx++) {
    const i = dirty_wordle.findIndex((el) => el === guess[idx]);

    if (i > -1) {
      checked[idx].type = "misplaced";
      dirty_wordle[i] = "_";
      guess_splitted[idx] = "~";
    }
  }

  return checked;
};
