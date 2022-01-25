import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Platform,
  ToastAndroid,
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
import { dictionary } from "../data/all-words";
import Instructions from "../components/instructions";
import { toLower, toUpper } from "../utils/to-lower";
import { checkGuess } from "../utils/check-guess";
import { getNextStatus } from "../utils/get-next-status";
import { getStreaks } from "../utils/get-streaks";
import { useInstructions } from "../utils/use-instructions";

const HomeScreen: React.FC = () => {
  const [settled, setSettled] = React.useState(false);
  const [unitSize, setUnitSize] = React.useState<number | undefined>(undefined);
  const [state, setWordleState, loaded] = useWordleState();
  const [activeTyping, setActiveTyping] = React.useState<string[]>([]);
  const {
    visible: instructionsVisible,
    toggle: toggleInstructions,
    isInitial: isInitialInstructions,
  } = useInstructions();

  const currentWordle = React.useMemo(() => {
    return getCurrentWordle(state?.wordleIndex ?? 0);
  }, [state]);

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
      if (!dictionary[toLower(activeTyping.join(""))]) {
        if (Platform.OS === "android") {
          ToastAndroid.show("Kelime Bulunamadı.", ToastAndroid.SHORT);
        }
        return;
      }
      // able to submit

      const checked = checkGuess(activeTyping.join(""), currentWordle);

      setActiveTyping([]);

      const nextStatus = getNextStatus(checked, state?.wordleRows ?? []);

      const streaks = getStreaks(
        nextStatus,
        state?.currentStreak ?? 0,
        state?.bestStreak ?? 0,
      );

      if (nextStatus === "completed") {
        if (Platform.OS === "android") {
          ToastAndroid.show("Tebrikler!", ToastAndroid.SHORT);
        }
      }

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
    toggleInstructions();
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

  const showResults = React.useMemo(
    () =>
      state?.wordleStatus === "completed" || state?.wordleStatus === "failed",
    [state],
  );

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
                .flatMap((row) => row.filter((key) => key.type === "misplaced"))
                .map((key) => key.key)}
              correctKeys={state?.wordleRows
                .flatMap((row) => row.filter((key) => key.type === "correct"))
                .map((key) => key.key)}
              wrongKeys={state?.wordleRows
                .flatMap((row) => row.filter((key) => key.type === "wrong"))
                .map((key) => key.key)}
            />
          </View>
          {showResults ? <Result /> : null}
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
