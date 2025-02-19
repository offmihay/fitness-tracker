import "intl-pluralrules";
import "../i18n/config";
import "../styles/global.css";
import AppProviders from "../providers/AppProviders";
import "react-native-get-random-values";
import { Slot, Stack } from "expo-router";
import React, { PropsWithChildren, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useAuthContext } from "../providers/AuthContextProvider";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import * as NavigationBar from "expo-navigation-bar";
import { Platform, StatusBar } from "react-native";

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 250,
  fade: true,
});

const Layout = ({ children }: PropsWithChildren) => {
  const { isLoading } = useAuthContext();
  const theme = useCustomTheme();

  useEffect(() => {
    if (isLoading) return;
    SplashScreen.hide();
  }, [isLoading]);

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync(theme.colors.background);
    }
  }, [theme.colors.background]);

  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle={theme.dark ? "light-content" : "dark-content"}
      />
      {children}
    </>
  );
};

const RootLayout = () => {
  return (
    <AppProviders>
      <Layout>
        <Stack
          screenOptions={{
            animation: "fade",
            animationDuration: 150,
            headerShown: false,
          }}
        />
        {/* <Slot /> */}
      </Layout>
    </AppProviders>
  );
};

export default RootLayout;
