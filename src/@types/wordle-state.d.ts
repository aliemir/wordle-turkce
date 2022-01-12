export interface IWordleState {
  wordleIndex: number;
  wordleStatus: "failed" | "completed" | "inprogress";
  wordleRows: Array<Array<string>>;
}
