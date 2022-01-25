import React from "react";
import { getStoredInstructionsState } from "./get-stored-instructions-state";
import { setStoredInstructionsState } from "./set-stored-instructions-state";

export const useInstructions = () => {
  const [instructionsVisible, setInstructionsVisible] = React.useState(false);
  const [isInitialInstructions, setIsInitialInstructions] =
    React.useState(false);

  React.useEffect(() => {
    const getInitialState = async () => {
      const initial = await getStoredInstructionsState();
      setIsInitialInstructions(!initial);
      setInstructionsVisible(!initial);
    };

    getInitialState();
  }, []);

  const toggle = React.useCallback(() => {
    setInstructionsVisible((p) => !p);
    if (isInitialInstructions) {
      setStoredInstructionsState();
      setIsInitialInstructions(false);
    }
  }, [isInitialInstructions]);

  return {
    visible: instructionsVisible,
    toggle,
    isInitial: isInitialInstructions,
  };
};
