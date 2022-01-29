import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Share,
  LayoutAnimation,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import theme from "../theme";
import { getCurrentWordle } from "../utils/get-current-wordle";
import { useWordleState } from "../contexts/wordle-state-context";
import {
  MAX_GUESS_COUNT,
  WORDLE_SHARE_CORRECT,
  WORDLE_SHARE_MISPLACED,
  WORDLE_SHARE_WRONG,
} from "../constants";
import { toUpper } from "../utils/to-lower";

const Result: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  const [state, setState] = useWordleState();

  const handleShare = React.useCallback(() => {
    const shareTitle = `Wordle Türkçe #${(state?.wordleIndex ?? 1) + 1} ${
      state?.wordleRows.length
    }/${MAX_GUESS_COUNT}`;

    const shareBlocks = state?.wordleRows
      ?.map((row) => {
        return row
          .map((key) => {
            switch (key.type) {
              case "correct":
                return WORDLE_SHARE_CORRECT;
              case "misplaced":
                return WORDLE_SHARE_MISPLACED;
              default:
                return WORDLE_SHARE_WRONG;
            }
          })
          .join("");
      })
      .join("\n");

    const shareMessage = `${shareTitle}\n\n${shareBlocks}`;

    Share.share({
      message: shareMessage,
    });
  }, [state]);

  React.useEffect(() => {
    setTimeout(() => {
      LayoutAnimation.configureNext(
        LayoutAnimation.create(
          250,
          LayoutAnimation.Types.easeIn,
          LayoutAnimation.Properties.opacity,
        ),
      );
      setVisible(true);
    }, 500);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.modal}>
      <Text style={styles.title} allowFontScaling={false}>
        {state?.wordleStatus === "completed" ? "Başarılı!" : "Başarısız :("}
      </Text>

      <Text style={styles.word} allowFontScaling={false}>
        {toUpper(getCurrentWordle(state?.wordleIndex ?? 0) ?? "")}
      </Text>
      <View
        style={{
          // backgroundColor: "red",
          flexDirection: "row",
          paddingBottom: 12,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text
            allowFontScaling={false}
            style={[styles.word, { textAlign: "center" }]}
          >
            {state?.currentStreak ?? 0}
          </Text>
          <Text
            allowFontScaling={false}
            style={[styles.title, { textAlign: "center" }]}
          >
            Güncel Seri
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text
            allowFontScaling={false}
            style={[styles.word, { textAlign: "center" }]}
          >
            {state?.bestStreak ?? 0}
          </Text>
          <Text
            allowFontScaling={false}
            style={[styles.title, { textAlign: "center" }]}
          >
            En İyi Seri
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.button, { marginBottom: 16 }]}
        onPress={() => {
          setVisible(false);
          setState({
            wordleIndex: (state?.wordleIndex ?? 0) + 1,
            currentStreak: state?.currentStreak ?? 0,
            bestStreak: state?.bestStreak ?? 0,
            wordleRows: [],
            wordleStatus: "inprogress",
          });
        }}
      >
        <Ionicons
          name="play-outline"
          size={26}
          color={theme.colors.bodyTetriary}
        />
        <Text allowFontScaling={false} style={styles.shareText}>
          Yeni Kelime
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: theme.colors.yellow,
            paddingVertical: theme.spacing.s,
          },
        ]}
        onPress={handleShare}
      >
        <Ionicons
          name="share-outline"
          size={21}
          color={theme.colors.bodyTetriary}
        />
        <Text
          allowFontScaling={false}
          style={[styles.shareText, { fontSize: 18 }]}
        >
          Paylaş
        </Text>
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
    marginBottom: theme.spacing.l,
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
