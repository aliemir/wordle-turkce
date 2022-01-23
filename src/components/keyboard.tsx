import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "../theme";
import { KeyStatus } from "../@types/wordle-state";
import { toLower } from "../utils/to-lower";

type KeyboardProps = {
  onKeyPress?: (key: string) => void;
  disabled?: string;
  onRemove?: () => void;
  onSubmit?: () => void;
  correctKeys?: string[];
  missKeys?: string[];
  wrongKeys?: string[];
};

type KeyProps = {
  onPress?: () => void;
  isActionKey?: boolean;
  status?: KeyStatus;
};

const KEYS_BY_ROW = ["QWERTYUIOPĞÜ", "ASDFGHJKLŞİ", "ZXCVBNMÖÇ"];
const SCREEN_WIDTH = Dimensions.get("screen").width;
const MAX_ROW_KEY_COUNT = Math.max(...KEYS_BY_ROW.map((el) => el.length));
const BOTTOM_ROW_KEY_COUNT = KEYS_BY_ROW[KEYS_BY_ROW.length - 1].length;
const KEY_GAP = 4;
const KEY_WIDTH = (SCREEN_WIDTH - KEY_GAP) / MAX_ROW_KEY_COUNT;
const KEY_HEIGHT = KEY_WIDTH * 1.5;
const ACTION_KEY_WIDTH =
  (KEY_WIDTH * (MAX_ROW_KEY_COUNT - BOTTOM_ROW_KEY_COUNT)) / 2;

const Key: React.FC<KeyProps> = ({
  children,
  onPress,
  isActionKey,
  status,
}) => {
  const bgColor = React.useMemo(() => {
    switch (status) {
      case "correct":
        return theme.colors.green;
      case "misplaced":
        return theme.colors.yellow;
      case "wrong":
        return theme.colors.backgroundColorSecondary;
      default:
        return theme.colors.backgroundColorTetriary;
    }
  }, [status]);

  return (
    <View
      style={{
        paddingHorizontal: KEY_GAP / 2,
        width: isActionKey ? ACTION_KEY_WIDTH : KEY_WIDTH,
      }}
    >
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.6}
        style={{
          backgroundColor: bgColor,
          borderRadius: KEY_GAP,
          padding: theme.spacing.s,
          height: KEY_HEIGHT,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isActionKey ? (
          children
        ) : (
          <Text
            style={{
              color: theme.colors.bodyTetriary,
              fontWeight: "bold",
              fontSize: (KEY_WIDTH * 2) / 4,
            }}
          >
            {children}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const Keyboard: React.FC<KeyboardProps> = ({
  onKeyPress,
  onRemove,
  onSubmit,
  correctKeys,
  missKeys,
  wrongKeys,
}) => {
  return (
    <View>
      {KEYS_BY_ROW.map((row, i, arr) => (
        <View
          key={row}
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: KEY_GAP * 2,
          }}
        >
          {arr.length - 1 === i ? (
            <Key isActionKey onPress={onSubmit}>
              <Ionicons
                name="checkmark-done"
                size={(KEY_WIDTH * 2) / 2}
                color={theme.colors.bodyTetriary}
              />
            </Key>
          ) : null}
          {row.split("").map((key) => (
            <Key
              key={key}
              onPress={() => onKeyPress?.(toLower(key))}
              status={
                correctKeys?.includes(toLower(key))
                  ? "correct"
                  : missKeys?.includes(toLower(key))
                  ? "misplaced"
                  : wrongKeys?.includes(toLower(key))
                  ? "wrong"
                  : "default"
              }
            >
              {key}
            </Key>
          ))}
          {arr.length - 1 === i ? (
            <Key isActionKey onPress={onRemove}>
              <Ionicons
                name="backspace-outline"
                size={(KEY_WIDTH * 2) / 2}
                color={theme.colors.bodyTetriary}
              />
            </Key>
          ) : null}
        </View>
      ))}
    </View>
  );
};

export default Keyboard;
