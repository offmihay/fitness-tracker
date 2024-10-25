import "intl-pluralrules";
import "../i18n/config";
import { ThemeProvider } from "@react-navigation/native";
import "../styles/global.css";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { CombinedDarkTheme, CombinedLightTheme } from "./theme/theme";
import { SettingsProvider, useSettings } from "../context/SettingsContext";
import { useColorScheme } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
      <SettingsProvider>
        <App />
      </SettingsProvider>
    </QueryClientProvider>
  );
};

export default RootLayout;
