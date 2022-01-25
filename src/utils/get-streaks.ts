import { IWordleState } from "../@types/wordle-state";

export const getStreaks = (
  nextStatus: IWordleState["wordleStatus"],
  currentStreak: number,
  currentBest: number,
) => {
  const isCompleted = nextStatus === "completed";
  const isFailed = nextStatus === "failed";

  const nextCurrentStreak = isCompleted
    ? currentStreak + 1
    : isFailed
    ? 0
    : currentStreak;

  const nextBestStreak =
    nextCurrentStreak > currentBest ? nextCurrentStreak : currentBest;

  return {
    currentStreak: nextCurrentStreak,
    bestStreak: nextBestStreak,
  };
};
