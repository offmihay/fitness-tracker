import { ThemeProvider } from "@react-navigation/native";
import "../styles/global.css";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { CombinedDarkTheme, CombinedLightTheme } from "./constants/theme";
import { SettingsProvider, useSettings } from "../context/SettingsContext";
import { useColorScheme } from "react-native";

const App = () => {
  const { settings } = useSettings();
  const colorScheme = useColorScheme();
  const currentColorScheme = settings.theme || colorScheme;

  const themeObj = currentColorScheme === "dark" ? CombinedDarkTheme : CombinedLightTheme;

  return (
    <PaperProvider theme={themeObj}>
      <ThemeProvider value={themeObj}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </PaperProvider>
  );
};

const RootLayout = () => {
  return (
    <SettingsProvider>
      <App />
    </SettingsProvider>
  );
};

export default RootLayout;
