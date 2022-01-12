import AsyncStorage from "@react-native-async-storage/async-storage";
import { INITIAL_INSTRUCTIONS_SHOWN_STORAGE_KEY } from "../constants";

export const getStoredInstructionsState = async () => {
  try {
    const res = await AsyncStorage.getItem(
      INITIAL_INSTRUCTIONS_SHOWN_STORAGE_KEY,
    );
    return Boolean(res);
  } catch (err) {
    console.warn(err);
    return false;
  }
};
