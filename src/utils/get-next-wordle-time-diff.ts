import { WORDLE_INTERVAL_MS, WORDLE_START_MS } from "../constants";
import { getCurrentWordleIndex } from "./get-current-wordle-index";

export const getNextWordleTimeDiff = () => {
  const currentIndex = getCurrentWordleIndex();
  const nextWordleTime =
    WORDLE_START_MS + WORDLE_INTERVAL_MS * (currentIndex + 1);
  const now = Date.now();

  const diff = nextWordleTime - now;

  return Math.abs(diff);
};
