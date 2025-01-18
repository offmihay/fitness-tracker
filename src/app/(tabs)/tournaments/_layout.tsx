import { stackProps } from "@/src/components/navigation/router-options";
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
          title: t("tournaments.title"),
        }}
      />
      <Stack.Screen
        name="create"
        options={{
          title: t("tournaments.create.title"),
        }}
      />
    </Stack>
  );
}
