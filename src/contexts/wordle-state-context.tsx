import React from "react";
import { IWordleState } from "../@types/wordle-state";
import { getStoredWordleState } from "../utils/get-stored-wordle-state";
import { setStoredWordleState } from "../utils/set-stored-wordle-state";

const WordleStateContext = React.createContext<{
  state?: IWordleState;
  setState: (nextState?: IWordleState) => void;
  loaded?: boolean;
}>({ setState: () => undefined });

// wordleIndex: number;
// wordleStatus: "failed" | "completed" | "inprogress";
// wordleRows: Array<Array<string>>;

export const WordleStateProvider: React.FC = ({ children }) => {
  const [loaded, setLoaded] = React.useState(false);
  const [state, setState] = React.useState<IWordleState | undefined>(undefined);

  const setWordleState = React.useCallback((nextState) => {
    setState(nextState);
    setStoredWordleState(nextState);
  }, []);

  const getStoredState = React.useCallback(async () => {
    const stored = await getStoredWordleState();
    if (stored) {
      // is not stale
      // @ts-ignore
      setWordleState({ currentStreak: 0, bestStreak: 0, ...stored });
    } else {
      // create an empty one with current index
      const emptyState: IWordleState = {
        wordleIndex: 0,
        currentStreak: 0,
        bestStreak: 0,
        wordleRows: [],
        wordleStatus: "inprogress",
      };

      setWordleState(emptyState);
    }
    setLoaded(true);
  }, []);

  React.useEffect(() => {
    getStoredState();
  }, [getStoredState]);

  return (
    <WordleStateContext.Provider
      value={{ state, setState: setWordleState, loaded }}
    >
      {children}
    </WordleStateContext.Provider>
  );
};

export const useWordleState = () => {
  const { state, setState, loaded } = React.useContext(WordleStateContext);

  return [state, setState, loaded] as [
    IWordleState | undefined,
    (nextState?: IWordleState) => void,
    boolean,
  ];
};
