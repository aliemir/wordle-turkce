import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getNextWordleTimeDiff } from "./get-next-wordle-time-diff";
import { NOTIFICATIONS_STATUS_STORAGE_KEY } from "../constants";

export const getNotificationsLocalState = async () => {
  try {
    const res = await AsyncStorage.getItem(NOTIFICATIONS_STATUS_STORAGE_KEY);
    return Boolean(res);
  } catch (err) {
    console.warn(err);
    return false;
  }
};

export const setNotificationsLocalState = async (enabled?: boolean) => {
  try {
    if (enabled) {
      const res = await AsyncStorage.setItem(
        NOTIFICATIONS_STATUS_STORAGE_KEY,
        "enabled",
      );
    } else {
      await AsyncStorage.removeItem(NOTIFICATIONS_STATUS_STORAGE_KEY);
    }
  } catch (err) {
    console.warn(err);
  }
};

export const clearNotifications = async () => {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch (err) {
    console.warn(err);
  }
};

export const requestNotificationPermissions = async () => {
  return await Notifications.requestPermissionsAsync();
};

export const setNotificationForNext = async () => {
  try {
    const nextTimeMs = getNextWordleTimeDiff();
    const buffer = 1000 * 30; // 30 secs

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Yeni Bulmaca Hazır!",
        body: "İlk çözen siz olun!",
      },
      trigger: {
        seconds: (nextTimeMs + buffer) / 1000,
      },
    });
  } catch (err) {
    console.warn(err);
  }
};

export const resetNotifications = async () => {
  try {
    const permissions = await requestNotificationPermissions();
    if (permissions.granted) {
      await clearNotifications();
      await setNotificationForNext();
    }
  } catch (err) {
    console.warn(err);
  }
};

export const toggleNotifications = async (enable?: boolean) => {
  try {
    if (enable) {
      await resetNotifications();
      await setNotificationsLocalState(true);
    } else {
      await clearNotifications();
      await setNotificationsLocalState(false);
    }
    return true;
  } catch (err) {
    console.warn(err);
    return;
  }
};
