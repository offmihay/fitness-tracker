import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { SettingsProvider } from "./SettingsProvider";
import { tokenCache } from "../services/secureStore";
import { Appearance } from "react-native";
import { PaperProvider } from "react-native-paper";
import { useSettings } from "../hooks/useSettings";
import { CombinedDarkTheme, CombinedLightTheme } from "../theme/theme";
import { ThemeProvider } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useEffect, useState } from "react";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { useTranslation } from "react-i18next";
import * as Burnt from "burnt";

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

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t } = useTranslation();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
      },
    },
    queryCache: new QueryCache({
      onError: (error) => {
        const localeError = t(`errors.${error.cause}`);
        const message = localeError != error.cause ? localeError : "errors.loading_data_error";

        Burnt.toast({
          title: t("common.error"),
          preset: "error",
          message: message,
        });
        throw error;
      },
    }),
    mutationCache: new MutationCache({
      onError: (error, variables, context, mutation) => {
        if (mutation.meta?.disableGlobalErrorHandler) {
          return;
        }
        const localeError = t(`errors.${error.cause}`);
        const message = localeError !== error.cause ? localeError : error.cause;
        Burnt.toast({
          title: t("common.error"),
          preset: "error",
          message: message || error.message,
        });
        throw error;
      },
    }),
  });

  return (
    <QueryClientProvider client={queryClient}>
      <KeyboardProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
              <ClerkLoaded>
                <SettingsProvider>
                  <ThemeProviders>{children}</ThemeProviders>
                </SettingsProvider>
              </ClerkLoaded>
            </ClerkProvider>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </KeyboardProvider>
    </QueryClientProvider>
  );
};

export default AppProviders;
