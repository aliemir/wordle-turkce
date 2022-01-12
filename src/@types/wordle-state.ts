export type KeyStatus = "default" | "wrong" | "misplaced" | "correct";

export interface IWordleState {
  wordleIndex: number;
  wordleStatus: "failed" | "completed" | "inprogress";
  wordleRows: Array<Array<{ key: string; type: KeyStatus }>>;
}
