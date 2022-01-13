import { WORDLE_INTERVAL_MS, WORDLE_START_MS } from "../constants";
import Wordles from "../data/wordles";

export const getCurrentWordleIndex = () => {
  const now = Date.now();
  const diff = now - WORDLE_START_MS;
  let currentIndex = Math.floor(diff / WORDLE_INTERVAL_MS);
  currentIndex = currentIndex < 0 ? 0 : currentIndex;
  return currentIndex < Wordles.length ? currentIndex : Wordles.length - 1;
};
