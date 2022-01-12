import { WORDLE_INTERVAL_MS, WORDLE_START_MS } from "../constants";
import Wordles from "../data/wordles";

export const getCurrentWordleIndex = () => {
  const now = Date.now();
  const diff = now - WORDLE_START_MS;
  const currentIndex = Math.floor(diff / WORDLE_INTERVAL_MS);
  return currentIndex < Wordles.length ? currentIndex : Wordles.length - 1;
};
