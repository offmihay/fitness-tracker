import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Tabs } from "expo-router";
import React from "react";
import { tabProps } from "@/src/components/navigation/options";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";

import * as NavigationBar from "expo-navigation-bar";

export default function TabLayout() {
  const theme = useCustomTheme();
  const { isSignedIn } = useAuth();
  if (!isSignedIn) {
    return <Redirect href={"/sign-in"} />;
  }

  NavigationBar.setBackgroundColorAsync(theme.colors.background);
  return (
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
  );
}
