import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Tabs } from "expo-router";
import React from "react";
import { tabProps } from "@/src/components/navigation/options";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import * as NavigationBar from "expo-navigation-bar";
import { Platform } from "react-native";
import Toast from "react-native-toast-message";
import toastConfig from "@/src/shared/toast/toastConfig";

export default function TabLayout() {
  const theme = useCustomTheme();
  const { isSignedIn } = useAuth();
  if (!isSignedIn) {
    return <Redirect href={"/sign-in"} />;
  }
  Platform.OS === "android" && NavigationBar.setBackgroundColorAsync(theme.colors.background);
  return (
    <>
      <Tabs {...tabProps}>
        <Tabs.Screen
          name="index"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen name="tournaments" />
        <Tabs.Screen name="home" />
        <Tabs.Screen name="settings" />
      </Tabs>
      <Toast config={toastConfig(theme)} topOffset={Platform.OS === "android" ? 20 : 65} />
    </>
  );
}
