import { WORDLE_INTERVAL_MS } from "../constants";
import { getCurrentWordleIndex } from "./get-current-wordle-index";

export const getNextWordleTimeDiff = () => {
  const currentIndex = getCurrentWordleIndex();
  const nextWordleTime = WORDLE_INTERVAL_MS * (currentIndex + 1);
  const now = Date.now();
  const diff = nextWordleTime - now;

  return diff;
};
