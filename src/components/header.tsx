import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import theme from "../theme";

type Props = {
  onInfo?: () => void;
  index: number;
};

const Header: React.FC<Props> = ({ onInfo, index }) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.button} onPress={onInfo}>
        <Ionicons
          name="help-outline"
          color={theme.colors.bodySecondary}
          size={28}
        />
      </TouchableOpacity>
      <View style={styles.title}>
        <Text allowFontScaling={false} style={styles.number}>{`Bulmaca #${
          (index ?? 0) + 1
        }`}</Text>
      </View>
      <TouchableOpacity
        disabled
        style={[styles.button, { opacity: 0 }]}
      ></TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.m,
  },
  button: {
    backgroundColor: theme.colors.backgroundColorSecondary,
    borderRadius: theme.borderRadii.s,
    width: 42,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    justifyContent: "center",
  },
  number: {
    textAlign: "center",
    color: theme.colors.bodyPrimary,
    fontSize: 20,
    fontFamily: theme.fontFamilies.Bold,
  },
  date: {
    textAlign: "center",
    color: theme.colors.bodySecondary,
    fontSize: 14,
    fontFamily: theme.fontFamilies.Bold,
  },
});
