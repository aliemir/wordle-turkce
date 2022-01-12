import Wordles from "../data/wordles";
import { getCurrentWordleIndex } from "./get-current-wordle-index";

export const getCurrentWordle = () => {
  const index = getCurrentWordleIndex();
  return Wordles[index];
};
