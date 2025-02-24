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
import { AuthContextProvider } from "./AuthContextProvider";
import { router } from "expo-router";
import { LoadingProvider } from "./LoadingProvider";

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

  const getErrorMessage = (error: Error, fallbackKey: string) => {
    const errorCause = error.cause as string | number;
    if (!errorCause) {
      return t(`errors.${fallbackKey}`);
    }
    const errorCauseMessage = t(`errors.${errorCause}`);
    const localeErrorCauseMessage =
      errorCause.toString() !== errorCauseMessage ? errorCauseMessage : undefined;
    const message = localeErrorCauseMessage || t(`errors.${fallbackKey}`);
    return message;
  };

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: 1, retryDelay: 2000 },
    },
    queryCache: new QueryCache({
      onError: (error, query) => {
        if (error.cause !== "invalid_token" && !query.meta?.disableGlobalErrorHandler) {
          Burnt.toast({
            title: t("common.error"),
            preset: "error",
            message: getErrorMessage(error, "loading_data_error"),
            haptic: "warning",
          });
        }
        throw error;
      },
    }),
    mutationCache: new MutationCache({
      onError: (error, _variables, _context, mutation) => {
        if (!mutation.meta?.disableGlobalErrorHandler) {
          Burnt.toast({
            title: t("common.error"),
            preset: "error",
            message: getErrorMessage(error, "mutation_data_error"),
            haptic: "error",
          });
        }

        throw error;
      },
    }),
  });

  return (
    <QueryClientProvider client={queryClient}>
      <LoadingProvider>
        <SettingsProvider>
          <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache} telemetry={false}>
            <ClerkLoaded>
              <AuthContextProvider>
                <ThemeProviders>
                  <KeyboardProvider>
                    <GestureHandlerRootView style={{ flex: 1 }}>
                      <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
                    </GestureHandlerRootView>
                  </KeyboardProvider>
                </ThemeProviders>
              </AuthContextProvider>
            </ClerkLoaded>
          </ClerkProvider>
        </SettingsProvider>
      </LoadingProvider>
    </QueryClientProvider>
  );
};

export default AppProviders;
