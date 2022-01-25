import React from "react";
import { loadAsync } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Platform, UIManager } from "react-native";
import {
  Merriweather_400Regular,
  Merriweather_400Regular_Italic,
  Merriweather_700Bold,
  Merriweather_700Bold_Italic,
} from "@expo-google-fonts/merriweather";
import HomeScreen from "./src/screens/home";
import { WordleStateProvider } from "./src/contexts/wordle-state-context";

const fonts = {
  Regular: Merriweather_400Regular,
  RegularItalic: Merriweather_400Regular_Italic,
  Bold: Merriweather_700Bold,
  BoldItalic: Merriweather_700Bold_Italic,
};

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);

  React.useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await loadAsync(fonts);
      } catch (e) {
        console.warn(e);
      } finally {
        setFontsLoaded(true);
      }
    }

    prepare();
  }, []);

  React.useEffect(() => {
    async function hide() {
      try {
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
      }
    }

    if (fontsLoaded) {
      hide();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <WordleStateProvider>
      <HomeScreen />
    </WordleStateProvider>
  );
}
