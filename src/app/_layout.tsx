import "intl-pluralrules";
import "../i18n/config";
import { ThemeProvider } from "@react-navigation/native";
import "../styles/global.css";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { CombinedDarkTheme, CombinedLightTheme } from "../theme/theme";
import { SettingsProvider } from "../hooks/SettingsContext";
import { useColorScheme } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSettings } from "../hooks/useSettings";
import { AuthProvider } from "../hooks/AuthContext";

const queryClient = new QueryClient();

const App = () => {
  const { settings } = useSettings();
  const colorScheme = useColorScheme();
  const currentColorScheme = settings.theme || colorScheme;

  const themeObj = currentColorScheme === "dark" ? CombinedDarkTheme : CombinedLightTheme;

  return (
    <PaperProvider theme={themeObj}>
      <ThemeProvider value={themeObj}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </PaperProvider>
  );
};

const RootLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SettingsProvider>
          <App />
        </SettingsProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default RootLayout;
