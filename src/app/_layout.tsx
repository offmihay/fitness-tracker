import "intl-pluralrules";
import "../i18n/config";
import "../styles/global.css";
import AppProviders from "../providers/AppProviders";
import AuthGuard from "../components/auth/AuthGuard";
import "react-native-get-random-values";
import { Stack, usePathname } from "expo-router";
import { modalRoutes, stackProps } from "../components/navigation/options";
import { useCustomTheme } from "../hooks/useCustomTheme";
import { Platform } from "react-native";
import Toast from "react-native-toast-message";
import toastConfig from "../shared/toast/toastConfig";
import React from "react";

if (process.env.NODE_ENV === "development") {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (!args[0]?.includes("Clerk has been loaded with development keys")) {
      originalWarn(...args);
    }
  };
}

const Layout = () => {
  const theme = useCustomTheme();
  const pathName = usePathname();
  const isModal = modalRoutes.includes(pathName);
  const toastTopOffset = Platform.OS === "android" ? 20 : 65;

  return (
    <>
      <Stack {...stackProps} screenOptions={{ ...stackProps.screenOptions, gestureEnabled: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="register" options={{ presentation: "modal" }} />
        <Stack.Screen name="wizard" />
      </Stack>
      {!isModal && <Toast config={toastConfig(theme)} topOffset={toastTopOffset} />}
    </>
  );
};

const RootLayout = () => (
  <AppProviders>
    <AuthGuard>
      <Layout />
    </AuthGuard>
  </AppProviders>
);

export default RootLayout;
