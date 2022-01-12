import AsyncStorage from "@react-native-async-storage/async-storage";
import { INITIAL_INSTRUCTIONS_SHOWN_STORAGE_KEY } from "../constants";

export const setStoredInstructionsState = async () => {
  try {
    const res = await AsyncStorage.setItem(
      INITIAL_INSTRUCTIONS_SHOWN_STORAGE_KEY,
      "shown",
    );
  } catch (err) {
    console.warn(err);
  }
};
