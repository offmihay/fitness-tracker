import "intl-pluralrules";
import "../i18n/config";
import "../styles/global.css";
import AppProviders from "../providers/AppProviders";
import "react-native-get-random-values";
import { Slot, Stack } from "expo-router";
import React, { PropsWithChildren, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useAuthContext } from "../providers/AuthContextProvider";

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 250,
  fade: true,
});

const Layout = ({ children }: PropsWithChildren) => {
  const { isLoading } = useAuthContext();

  useEffect(() => {
    if (isLoading) return;
    SplashScreen.hide();
  }, [isLoading]);

  return children;
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
