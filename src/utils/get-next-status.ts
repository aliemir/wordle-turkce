import { IWordleState, KeyStatus } from "../@types/wordle-state";
import { MAX_GUESS_COUNT } from "../constants";

export const getNextStatus = (
  lastGuess: { key: string; type: KeyStatus }[],
  allGuesses: Array<{ key: string; type: KeyStatus }[]>,
): IWordleState["wordleStatus"] => {
  const isCompleted = lastGuess.every((el) => el.type === "correct");
  if (isCompleted) return "completed";

  const isFailed = allGuesses.length === MAX_GUESS_COUNT - 1;
  if (isFailed) return "failed";

  return "inprogress";
};
