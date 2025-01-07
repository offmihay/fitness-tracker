import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { SettingsProvider } from "../hooks/SettingsContext";
import { tokenCache } from "../utils/secureStore";
import { Appearance } from "react-native";
import { PaperProvider } from "react-native-paper";
import { useSettings } from "../hooks/useSettings";
import { CombinedDarkTheme, CombinedLightTheme } from "../theme/theme";
import { ThemeProvider } from "@react-navigation/native";
// import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useEffect, useState } from "react";

const ThemeProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { settings } = useSettings();
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());
  const currentTheme = settings.theme || colorScheme;

  useEffect(() => {
    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      setColorScheme(colorScheme);
    });
    return () => sub.remove();
  }, []);

  const theme = currentTheme === "dark" ? CombinedDarkTheme : CombinedLightTheme;

  return (
    <PaperProvider theme={theme}>
      {/* @ts-ignore */}
      <ThemeProvider value={theme}>{children}</ThemeProvider>
    </PaperProvider>
  );
};

const queryClient = new QueryClient();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
          <ClerkLoaded>
            <QueryClientProvider client={queryClient}>
              <SettingsProvider>
                <ThemeProviders>{children}</ThemeProviders>
              </SettingsProvider>
            </QueryClientProvider>
          </ClerkLoaded>
        </ClerkProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default Providers;
