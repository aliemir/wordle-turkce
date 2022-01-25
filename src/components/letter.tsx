import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
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

  const animatedValue = useSharedValue(1);

  React.useEffect(() => {
    animatedValue.value = withSequence(withTiming(1.2), withTiming(1));
  }, [type]);

  React.useEffect(() => {
    animatedValue.value = withSequence(
      withTiming(1.1, { duration: 180 }),
      withTiming(1, { duration: 180 }),
    );
  }, [letter]);

  const letterStyle = useAnimatedStyle(() => {
    return {
      borderRadius: theme.borderRadii.s,
      width: size - theme.spacing.s,
      height: size - theme.spacing.s,
      transform: [
        {
          scale: animatedValue.value,
        },
      ],
    };
  }, []);

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[{ backgroundColor: bgColor }, letterStyle]}>
        <Text
          allowFontScaling={false}
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
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: theme.spacing.s / 2,
  },
  text: {
    color: theme.colors.bodyPrimary,
    fontFamily: theme.fontFamilies.Bold,
    textAlign: "center",
  },
});

export default Letter;
