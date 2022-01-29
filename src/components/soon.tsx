import React from "react";
import { View, Text, StyleSheet } from "react-native";
import theme from "../theme";

export const Soon: React.FC = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>Yeni bölümler çok yakında...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing.l * 2,
  },
  text: {
    textAlign: "center",
    color: theme.colors.bodyPrimary,
    fontSize: 20,
    fontFamily: theme.fontFamilies.Bold,
  },
});
