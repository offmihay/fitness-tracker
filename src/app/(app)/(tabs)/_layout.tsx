import { Tabs } from "expo-router";
import React, { useEffect } from "react";
import { tabProps } from "@/src/components/navigation/options";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import * as NavigationBar from "expo-navigation-bar";
import { Platform } from "react-native";

export default function TabLayout() {
  const theme = useCustomTheme();

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync(theme.colors.background);
    }
  }, [theme.colors.background]);

  return (
    <Tabs {...tabProps}>
      <Tabs.Screen name="tournaments" />
      <Tabs.Screen name="home" />
      <Tabs.Screen name="settings" />
    </Tabs>
  );
}
