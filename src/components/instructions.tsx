import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import theme from "../theme";
import Letter from "./letter";

const Instructions: React.FC<{ isInitial?: boolean; onStart?: () => void }> = ({
  isInitial,
  onStart,
}) => {
  return (
    <View style={styles.page}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 12,
        }}
      >
        <Letter letter="" size={42} />
        <Letter letter="" size={42} />
        <Letter letter="" size={42} />
        <Letter letter="" size={42} />
        <Letter letter="" size={42} />
      </View>
      <Text style={styles.text} allowFontScaling={false}>
        Her bulmaca beş harfli bir kelimeden oluşur ve yalnızca{" "}
        <Text
          allowFontScaling={false}
          style={[
            styles.text,
            {
              fontFamily: theme.fontFamilies.BoldItalic,
              textDecorationLine: "underline",
            },
          ]}
        >
          altı
        </Text>{" "}
        deneme hakkınız bulunur.
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 12,
        }}
      >
        <Letter letter="A" size={42} type="misplaced" />
        <Letter letter="R" size={42} type="misplaced" />
        <Letter letter="T" size={42} type="wrong" />
        <Letter letter="I" size={42} type="correct" />
        <Letter letter="Ş" size={42} type="correct" />
      </View>
      <Text allowFontScaling={false} style={styles.text}>
        Aranan kelimede bulunan ama yanlış yerdeki harfler{" "}
        <Text
          allowFontScaling={false}
          style={[
            styles.text,
            {
              backgroundColor: theme.colors.yellow,
              fontFamily: theme.fontFamilies.Bold,
            },
          ]}
        >
          {" sarı, "}
        </Text>{" "}
        doğru yerdeki harfler{" "}
        <Text
          allowFontScaling={false}
          style={[
            styles.text,
            {
              backgroundColor: theme.colors.green,
              fontFamily: theme.fontFamilies.Bold,
            },
          ]}
        >
          {" yeşil "}
        </Text>{" "}
        renkle gösterilir. Aranan kelimede bulunmayan harflerse{" "}
        <Text
          allowFontScaling={false}
          style={[
            styles.text,
            {
              backgroundColor: theme.colors.backgroundColorSecondary,
              fontFamily: theme.fontFamilies.Bold,
            },
          ]}
        >
          {" gri "}
        </Text>{" "}
        renkte gösterilir
      </Text>
      {isInitial && (
        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.button} onPress={onStart}>
            <Text allowFontScaling={false} style={styles.buttonLabel}>
              Başla!
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Instructions;

const styles = StyleSheet.create({
  page: {
    paddingVertical: theme.spacing.l * 2,
    paddingHorizontal: theme.spacing.m,
    flex: 1,
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    color: theme.colors.bodyTetriary,
    fontFamily: theme.fontFamilies.Regular,
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 24,
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    backgroundColor: theme.colors.green,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.m * 3,
    borderRadius: theme.borderRadii.m,
  },
  buttonLabel: {
    textAlign: "center",
    marginTop: 3,
    color: theme.colors.bodyTetriary,
    fontFamily: theme.fontFamilies.Bold,
    fontSize: 24,
    lineHeight: 28,
  },
});
