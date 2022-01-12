import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import theme from "../theme";
import { Ionicons } from "@expo/vector-icons";

const Result: React.FC = () => {
  return (
    <View style={styles.modal}>
      <Text style={styles.title}>Başarısız</Text>

      <Text style={styles.word}>ŞAPKA</Text>
      <Text style={styles.title}>Bir sonraki bulmaca</Text>

      <Text style={styles.time}>16 saat 32 dakika</Text>

      <TouchableOpacity style={styles.button}>
        <Ionicons
          name="share-outline"
          size={26}
          color={theme.colors.bodyTetriary}
        />
        <Text style={styles.shareText}>Paylaş</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Result;

const styles = StyleSheet.create({
  modal: {
    position: "absolute",
    left: "5%",
    top: "25%",
    width: "90%",
    backgroundColor: theme.colors.backgroundColorTetriary,
    borderRadius: theme.borderRadii.l,
    paddingHorizontal: theme.spacing.l,
    paddingTop: theme.spacing.l * 2,
    paddingBottom: theme.spacing.l,
    shadowColor: theme.colors.backgroundColorPrimary,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.64,
    shadowRadius: 6.27,

    elevation: 10,
  },
  title: {
    textAlign: "center",
    color: theme.colors.bodySecondary,
    marginBottom: theme.spacing.m,
    fontSize: 16,
    letterSpacing: 2,
    fontFamily: theme.fontFamilies.Bold,
  },
  word: {
    textAlign: "center",
    color: theme.colors.bodyPrimary,
    marginBottom: theme.spacing.l * 2,
    fontSize: 32,
    letterSpacing: 8,
    fontFamily: theme.fontFamilies.Bold,
  },
  time: {
    textAlign: "center",
    color: theme.colors.bodyPrimary,
    marginBottom: theme.spacing.l * 2,
    fontSize: 24,
    letterSpacing: 2,
    fontFamily: theme.fontFamilies.Bold,
  },
  button: {
    width: "100%",
    backgroundColor: theme.colors.green,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing.m,
    borderRadius: theme.borderRadii.m,
  },
  shareText: {
    marginLeft: theme.spacing.s,
    color: theme.colors.bodyTetriary,
    fontFamily: theme.fontFamilies.Bold,
    fontSize: 22,
    letterSpacing: 1,
  },
});
