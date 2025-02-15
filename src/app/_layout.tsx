import "intl-pluralrules";
import "../i18n/config";
import "../styles/global.css";
import AppProviders from "../providers/AppProviders";
import AuthGuard from "../components/auth/AuthGuard";
import "react-native-get-random-values";
import { Stack } from "expo-router";
import { stackProps } from "../components/navigation/options";
import React, { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";

if (process.env.NODE_ENV === "development") {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (!args[0]?.includes("Clerk has been loaded with development keys")) {
      originalWarn(...args);
    }
  };
}

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 400,
  fade: true,
});

const Layout = () => {
  return (
    <Stack {...stackProps} screenOptions={{ ...stackProps.screenOptions, gestureEnabled: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="register" options={{ presentation: "modal" }} />
      <Stack.Screen name="wizard" />
    </Stack>
  );
};

const RootLayout = () => {
  const onLayoutRootView = useCallback(() => {
    SplashScreen.hide();
  }, []);

  return (
    <AppProviders>
      <AuthGuard onReady={onLayoutRootView}>
        <Layout />
      </AuthGuard>
    </AppProviders>
  );
};

export default RootLayout;
