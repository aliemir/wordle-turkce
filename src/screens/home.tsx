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
import { getCurrentWordleIndex } from "../utils/get-current-wordle-index";

const HomeScreen: React.FC = () => {
  const [settled, setSettled] = React.useState(false);
  const [unitSize, setUnitSize] = React.useState<number | undefined>(undefined);

  console.log(getCurrentWordleIndex());

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

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="light" />
      <Header />
      <View style={styles.gridWrapper}>
        {settled && (
          <View onLayout={onGridLayout} style={styles.grid}>
            {unitSize
              ? [1, 2, 3, 4, 5, 6].map((_) => (
                  <View key={_} style={styles.gridRow}>
                    <Letter letter="A" size={unitSize} />
                    <Letter letter="" size={unitSize} />
                    <Letter letter="A" size={unitSize} />
                    <Letter letter="" size={unitSize} />
                    <Letter letter="A" size={unitSize} />
                  </View>
                ))
              : null}
          </View>
        )}
      </View>
      <View style={styles.keyboardWrapper}>
        <Keyboard />
      </View>
      <Result />
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
