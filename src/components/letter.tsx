import React from "react";
import { View, Text, StyleSheet } from "react-native";
import theme from "../theme";

type Props = {
  letter?: string;
  type?: "default" | "wrong" | "misplaced" | "correct";
  size?: number;
};

const Letter: React.FC<Props> = ({ letter, size = 60, type }) => {
  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.letter,
          {
            width: size - theme.spacing.s,
            height: size - theme.spacing.s,
          },
        ]}
      >
        <Text
          style={[
            styles.text,
            {
              lineHeight: size,
              fontSize: size * 0.65,
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
