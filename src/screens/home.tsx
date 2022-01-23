import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
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
import { KeyStatus } from "../@types/wordle-state";
import { getCurrentWordle } from "../utils/get-current-wordle";
import { AllWordsDictionary } from "../data/all-words";
import Instructions from "../components/instructions";
import { getStoredInstructionsState } from "../utils/get-stored-instructions-state";
import { setStoredInstructionsState } from "../utils/set-stored-instructions-state";
import Toast from "react-native-root-toast";
import { toLower, toUpper } from "../utils/to-lower";

const HomeScreen: React.FC = () => {
  const [settled, setSettled] = React.useState(false);
  const [unitSize, setUnitSize] = React.useState<number | undefined>(undefined);
  const [state, setWordleState, loaded] = useWordleState();
  const [activeTyping, setActiveTyping] = React.useState<string[]>([]);
  const [instructionsVisible, setInstructionsVisible] = React.useState(false);
  const [isInitialInstructions, setIsInitialInstructions] =
    React.useState(false);

  const currentWordle = React.useMemo(() => {
    return getCurrentWordle(state?.wordleIndex ?? 0);
  }, [state]);

  React.useEffect(() => {
    const getInitialState = async () => {
      const initial = await getStoredInstructionsState();
      setIsInitialInstructions(!initial);
      setInstructionsVisible(!initial);
    };

    getInitialState();
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
      LayoutAnimation.configureNext(
        LayoutAnimation.create(
          250,
          LayoutAnimation.Types.easeIn,
          LayoutAnimation.Properties.opacity,
        ),
      );
      // check validity
      const dict = AllWordsDictionary[toLower(activeTyping.join(""))];
      if (!dict) {
        Toast.show("Kelime Bulunamadı.", {
          duration: Toast.durations.SHORT,
          position: Toast.positions.CENTER,
          backgroundColor: theme.colors.backgroundColorSecondary,
          textColor: theme.colors.bodyTetriary,
          opacity: 1,
        });
        return;
      }
      // able to submit
      const checked: { key: string; type: KeyStatus }[] = activeTyping.map(
        (key, i) =>
          ({
            key: toLower(key),
            type:
              toLower(key) === currentWordle[i]
                ? "correct"
                : currentWordle.includes(toLower(key))
                ? "misplaced"
                : "wrong",
          } as { key: string; type: KeyStatus }),
      );

      setActiveTyping([]);
      const nextStatus = checked.every((el) => el.type === "correct")
        ? "completed"
        : state?.wordleRows.length === MAX_GUESS_COUNT - 1
        ? "failed"
        : "inprogress";
      if (nextStatus === "completed") {
        Toast.show("Tebrikler!", {
          duration: Toast.durations.SHORT,
          position: Toast.positions.CENTER,
          backgroundColor: theme.colors.backgroundColorSecondary,
          textColor: theme.colors.bodyTetriary,
          opacity: 1,
        });
      }
      const nextCurrentStreak =
        nextStatus === "completed"
          ? (state?.currentStreak ?? 0) + 1
          : nextStatus === "failed"
          ? 0
          : state?.currentStreak ?? 0;
      const streaks = {
        currentStreak: nextCurrentStreak,
        bestStreak:
          nextCurrentStreak > (state?.bestStreak ?? 0)
            ? nextCurrentStreak
            : state?.bestStreak ?? 0,
      };
      setWordleState({
        ...(state ?? {}),
        ...streaks,
        wordleIndex: state?.wordleIndex ?? 0,
        wordleRows: [...(state?.wordleRows ?? []), checked],
        wordleStatus: nextStatus,
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

  const onInfoPress = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        250,
        LayoutAnimation.Types.easeIn,
        LayoutAnimation.Properties.opacity,
      ),
    );
    setInstructionsVisible((p) => !p);
    if (isInitialInstructions) {
      setStoredInstructionsState();
      setIsInitialInstructions(false);
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

  if (!loaded) {
    return (
      <SafeAreaView style={styles.screen}>
        <StatusBar style="light" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="light" />
      <Header index={state?.wordleIndex ?? 0} onInfo={onInfoPress} />
      {!instructionsVisible ? (
        <>
          <View style={styles.gridWrapper}>
            {settled && (
              <View onLayout={onGridLayout} style={styles.grid}>
                {unitSize
                  ? Array.from({ length: MAX_GUESS_COUNT }).map((_, i) => (
                      <View key={i} style={styles.gridRow}>
                        {Array.from({ length: WORDLE_LENGTH }).map((_, j) => (
                          <Letter
                            key={`${i}-${j}`}
                            letter={toUpper(
                              combinedWordleRows?.[i]?.[j]?.key ?? "",
                            )}
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
        </>
      ) : (
        <Instructions isInitial={isInitialInstructions} onStart={onInfoPress} />
      )}
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
