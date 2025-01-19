import { stackProps } from "@/src/components/navigation/options";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

export default function Layout() {
  const { t } = useTranslation();
  return (
    <Stack {...stackProps}>
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
