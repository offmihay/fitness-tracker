import { useAuth } from "@clerk/clerk-expo";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Platform } from "react-native";

export const globalScreenOptions = {
  headerTitleStyle: {
    fontWeight: 600 as const,
  },
  headerTitleAlign: "center" as const,
  tabBarHideOnKeyboard: Platform.OS === "android" ? true : false,
};

export default function TabLayout() {
  const { t } = useTranslation();
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Redirect href={"/sign-in"} />;
  }

  return (
    <Tabs screenOptions={globalScreenOptions}>
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          title: t("home.title"),
          tabBarIcon: ({ color, size }) => <AntDesign name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="tournaments"
        options={{
          headerShown: false,
          title: t("tournaments.title"),
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="sports-tennis" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          title: t("settings.title"),
          tabBarIcon: ({ color, size }) => <Feather name="settings" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
