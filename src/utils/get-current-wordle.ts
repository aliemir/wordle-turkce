import Wordles from "../data/wordles";

export const getCurrentWordle = (index?: number) => {
  return Wordles[index ?? 0].madde;
};
