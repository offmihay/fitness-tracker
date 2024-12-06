import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

export default function Layout() {
  const { t } = useTranslation();
  const theme = useCustomTheme();
  return (
    <Stack screenOptions={{ headerShown: true, headerTintColor: theme.colors.text }}>
      <Stack.Screen
        name="index"
        options={{
          title: t("settings.title"),
        }}
      />
      <Stack.Screen
        name="personal-info"
        options={{
          title: t("settings.personalInfo.title"),
          headerBackTitle: t("settings.headerBackTitle"),
        }}
      />
    </Stack>
  );
}
