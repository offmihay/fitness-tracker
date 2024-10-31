import { useAuth } from "@clerk/clerk-expo";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";

export default function TabLayout() {
  const { t } = useTranslation();
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Redirect href={"/sign-in"} />;
  }

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: t("home.title"),
          tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="workouts"
        options={{
          title: t("workouts.title"),
          tabBarIcon: ({ color }) => <MaterialIcons name="sports-tennis" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          title: t("settings.title"),
          tabBarIcon: ({ color }) => <Feather name="settings" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
