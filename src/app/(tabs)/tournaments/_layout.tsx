import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { globalScreenOptions } from "../_layout";

export default function Layout() {
  const { t } = useTranslation();
  return (
    <Stack screenOptions={globalScreenOptions}>
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
