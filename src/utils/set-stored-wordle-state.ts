import AsyncStorage from "@react-native-async-storage/async-storage";
import { IWordleState } from "../@types/wordle-state";
import { WORDLE_STORAGE_KEY } from "../constants";

export const setStoredWordleState = async (state?: IWordleState) => {
  try {
    if (state) {
      const stringified = JSON.stringify(state);
      await AsyncStorage.setItem(WORDLE_STORAGE_KEY, stringified);
    } else {
      await AsyncStorage.removeItem(WORDLE_STORAGE_KEY);
    }
  } catch (err) {
    console.warn(err);
  }
};
