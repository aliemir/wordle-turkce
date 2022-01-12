import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  StyleSheet,
  LayoutAnimation,
  LayoutChangeEvent,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import theme from "../theme";
import Letter from "../components/letter";
import Keyboard from "../components/keyboard";
import Header from "../components/header";
import Result from "../components/result";
import { useWordleState } from "../contexts/wordle-state-context";
import { MAX_GUESS_COUNT, WORDLE_LENGTH } from "../constants";
import { IWordleState, KeyStatus } from "../@types/wordle-state";
import { getCurrentWordle } from "../utils/get-current-wordle";
import { AllWordsDictionary } from "../data/all-words";
import { getCurrentWordleIndex } from "../utils/get-current-wordle-index";

const HomeScreen: React.FC = () => {
  const [settled, setSettled] = React.useState(false);
  const [unitSize, setUnitSize] = React.useState<number | undefined>(undefined);
  const [state, setWordleState] = useWordleState();
  const [activeTyping, setActiveTyping] = React.useState<string[]>([]);
  const currentWordleIndex = React.useMemo(() => {
    return getCurrentWordleIndex();
  }, []);
  const currentWordle = React.useMemo(() => {
    return getCurrentWordle();
  }, []);

  React.useLayoutEffect(() => {
    setTimeout(() => {
      LayoutAnimation.configureNext(
        LayoutAnimation.create(
          250,
          LayoutAnimation.Types.easeIn,
          LayoutAnimation.Properties.opacity,
        ),
      );
      setSettled(true);
    }, 300);
  }, []);

  const onGridLayout = React.useCallback(
    ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
      const byWidth = (layout.width - theme.spacing.m * 2 * 2) / 5;
      const byHeight = (layout.height - theme.spacing.l * 2 * 2) / 6;
      setUnitSize(Math.floor(Math.min(byWidth, byHeight)));
    },
    [],
  );

  const onSubmitTry = () => {
    if (activeTyping.length === WORDLE_LENGTH) {
      // check validity
      const dict =
        AllWordsDictionary[activeTyping.join("").toLocaleLowerCase("tr")];
      if (!dict) {
        console.log("not valid");
        return;
      }
      // able to submit
      const checked: { key: string; type: KeyStatus }[] = activeTyping.map(
        (key, i) =>
          ({
            key: key.toLocaleLowerCase("tr"),
            type:
              key.toLocaleLowerCase("tr") === currentWordle.madde[i]
                ? "correct"
                : currentWordle.madde.includes(key.toLocaleLowerCase("tr"))
                ? "misplaced"
                : "wrong",
          } as { key: string; type: KeyStatus }),
      );

      setActiveTyping([]);
      setWordleState({
        ...(state ?? {}),
        wordleIndex: currentWordleIndex,
        wordleRows: [...(state?.wordleRows ?? []), checked],
        wordleStatus: checked.every((el) => el.type === "correct")
          ? "completed"
          : state?.wordleRows.length === MAX_GUESS_COUNT - 1
          ? "failed"
          : "inprogress",
      });
    }
  };

  const onRemoveKey = () => {
    setActiveTyping((p) => p.slice(0, -1));
  };

  const onKeyPress = (key: string) => {
    if (activeTyping.length < WORDLE_LENGTH) {
      setActiveTyping((p) => [...p, key]);
    }
  };

  const combinedWordleRows = React.useMemo(() => {
    if (state && state?.wordleRows.length < MAX_GUESS_COUNT) {
      return [
        ...(state?.wordleRows ?? []),
        activeTyping.map((key, index) => {
          return {
            key: key,
            type: "default",
          } as { key: string; type: KeyStatus };
        }),
      ];
    } else {
      return state?.wordleRows;
    }
  }, [state, activeTyping]);

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="light" />
      <Header index={currentWordleIndex} />
      <View style={styles.gridWrapper}>
        {settled && (
          <View onLayout={onGridLayout} style={styles.grid}>
            {unitSize
              ? Array.from({ length: MAX_GUESS_COUNT }).map((_, i) => (
                  <View key={i} style={styles.gridRow}>
                    {Array.from({ length: WORDLE_LENGTH }).map((_, j) => (
                      <Letter
                        key={`${i}-${j}`}
                        letter={combinedWordleRows?.[i]?.[
                          j
                        ]?.key.toLocaleUpperCase("tr")}
                        type={combinedWordleRows?.[i]?.[j]?.type}
                        size={unitSize}
                      />
                    ))}
                  </View>
                ))
              : null}
          </View>
        )}
      </View>
      <View style={styles.keyboardWrapper}>
        <Keyboard
          onKeyPress={onKeyPress}
          onRemove={onRemoveKey}
          onSubmit={onSubmitTry}
          missKeys={state?.wordleRows
            .flatMap((row) => row)
            .filter((key) => key.type === "misplaced")
            .map((key) => key.key)}
          correctKeys={state?.wordleRows
            .flatMap((row) => row)
            .filter((key) => key.type === "correct")
            .map((key) => key.key)}
          wrongKeys={state?.wordleRows
            .flatMap((row) => row)
            .filter((key) => key.type === "wrong")
            .map((key) => key.key)}
        />
      </View>
      {state &&
      (state.wordleStatus === "completed" ||
        state.wordleStatus === "failed") ? (
        <Result />
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: theme.colors.backgroundColorPrimary,
    flex: 1,
    position: "relative",
  },
  gridWrapper: { flex: 1 },
  keyboardWrapper: { marginBottom: theme.spacing.l },
  grid: {
    paddingVertical: theme.spacing.l * 2,
    paddingHorizontal: theme.spacing.m * 2,
    flex: 1,
  },
  gridRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default HomeScreen;
