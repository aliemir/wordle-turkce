import React from "react";
import { IWordleState } from "../@types/wordle-state";
import { getCurrentWordleIndex } from "../utils/get-current-wordle-index";
import { getStoredWordleState } from "../utils/get-stored-wordle-state";
import { setStoredWordleState } from "../utils/set-stored-wordle-state";

const WordleStateContext = React.createContext<{
  state?: IWordleState;
  setState: (nextState?: IWordleState) => void;
}>({ setState: () => undefined });

// wordleIndex: number;
// wordleStatus: "failed" | "completed" | "inprogress";
// wordleRows: Array<Array<string>>;

export const WordleStateProvider: React.FC = ({ children }) => {
  const [wordleIndex, setWordleIndex] = React.useState(getCurrentWordleIndex());

  React.useEffect(() => {
    const currIndex = getCurrentWordleIndex();
    setWordleIndex(currIndex);
  }, []);

  const [state, setState] = React.useState<IWordleState | undefined>(undefined);

  const setWordleState = React.useCallback((nextState) => {
    setState(nextState);
    setStoredWordleState(nextState);
  }, []);

  const getStoredState = React.useCallback(async () => {
    const stored = await getStoredWordleState();
    if (stored && stored.wordleIndex === wordleIndex) {
      // is not stale
      setWordleState(stored);
    } else {
      // create an empty one with current index
      const emptyState: IWordleState = {
        wordleIndex: wordleIndex,
        wordleRows: [],
        wordleStatus: "inprogress",
      };

      setWordleState(emptyState);
    }
  }, [wordleIndex]);

  React.useEffect(() => {
    getStoredState();
  }, [getStoredState]);

  return (
    <WordleStateContext.Provider value={{ state, setState: setWordleState }}>
      {children}
    </WordleStateContext.Provider>
  );
};

export const useWordleState = () => {
  const { state, setState } = React.useContext(WordleStateContext);

  return [state, setState] as [
    IWordleState | undefined,
    (nextState?: IWordleState) => void,
  ];
};
