import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { KeyStatus } from "../@types/wordle-state";
import theme from "../theme";

type Props = {
  letter?: string;
  type?: KeyStatus;
  size?: number;
};

const Letter: React.FC<Props> = ({ letter, size = 60, type }) => {
  const bgColor = React.useMemo(() => {
    switch (type) {
      case "correct":
        return theme.colors.green;
      case "misplaced":
        return theme.colors.yellow;
      case "wrong":
        return theme.colors.backgroundColorSecondary;
      default:
        return theme.colors.backgroundColorTetriary;
    }
  }, [type]);

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.letter,
          {
            backgroundColor: bgColor,
            width: size - theme.spacing.s,
            height: size - theme.spacing.s,
          },
        ]}
      >
        <Text
          style={[
            styles.text,
            {
              lineHeight: size - theme.spacing.s,
              fontSize: (size - theme.spacing.s) * 0.7,
            },
          ]}
        >
          {letter}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: theme.spacing.s / 2,
  },
  letter: {
    borderRadius: theme.borderRadii.s,
    backgroundColor: theme.colors.backgroundColorSecondary,
  },
  text: {
    color: theme.colors.bodyPrimary,
    fontFamily: theme.fontFamilies.Bold,
    textAlign: "center",
  },
});

export default Letter;
