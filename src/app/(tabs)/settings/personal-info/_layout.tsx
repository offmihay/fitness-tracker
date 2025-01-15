import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { globalScreenOptions } from "../../_layout";

export default function Layout() {
  const { t } = useTranslation();
  const theme = useCustomTheme();
  return (
    <Stack screenOptions={globalScreenOptions}>
      <Stack.Screen
        name="index"
        options={{
          title: t("settings.personalInfo.title"),
        }}
      />
      <Stack.Screen
        name="change-name"
        options={{
          title: t("settings.personalInfo.changeName.title"),
        }}
      />
    </Stack>
  );
}
