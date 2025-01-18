import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Tabs } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { tabProps } from "@/src/components/navigation/router-options";

export default function TabLayout() {
  const { t } = useTranslation();
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Redirect href={"/sign-in"} />;
  }

  return (
    <Tabs {...tabProps}>
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="tournaments"
        options={{
          headerShown: false,
          title: t("myTournaments.title"),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          title: t("home.title"),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          title: t("settings.title"),
        }}
      />
    </Tabs>
  );
}
