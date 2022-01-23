export type KeyStatus = "default" | "wrong" | "misplaced" | "correct";

export interface IWordleState {
  wordleIndex: number;
  currentStreak: number;
  bestStreak: number;
  wordleStatus: "failed" | "completed" | "inprogress";
  wordleRows: Array<Array<{ key: string; type: KeyStatus }>>;
}
