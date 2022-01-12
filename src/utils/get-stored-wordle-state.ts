import AsyncStorage from "@react-native-async-storage/async-storage";
import { IWordleState } from "../@types/wordle-state";
import { WORDLE_STORAGE_KEY } from "../constants";

export const getStoredWordleState = async () => {
  try {
    const fetchedString = await AsyncStorage.getItem(WORDLE_STORAGE_KEY);
    if (fetchedString) {
      const parsed = JSON.parse(fetchedString) as IWordleState;
      return parsed;
    }
  } catch (err) {
    console.warn(err);
    return undefined;
  }
};
