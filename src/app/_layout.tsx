import "intl-pluralrules";
import "../i18n/config";
import "../styles/global.css";
import AppProviders from "../providers/AppProviders";
import "react-native-get-random-values";
import { Slot, Stack } from "expo-router";
import React, { PropsWithChildren, useContext, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useAuthContext } from "../providers/AuthContextProvider";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import * as NavigationBar from "expo-navigation-bar";
import { Platform, StatusBar } from "react-native";
import LoadingModal from "../shared/modal/LoadingModal";
import { useManualLoading } from "../hooks/useLoading";
import { LoadingContext } from "../providers/LoadingProvider";

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 250,
  fade: true,
});

const Layout = ({ children }: PropsWithChildren) => {
  const { isLoading } = useAuthContext();
  const theme = useCustomTheme();

  const loadingContext = useContext(LoadingContext);
  if (!loadingContext) return null;

  const { isLoading: isLoaderSpinning } = loadingContext;

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
      <LoadingModal isVisible={isLoaderSpinning} />
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
      </Layout>
    </AppProviders>
  );
};

export default RootLayout;
