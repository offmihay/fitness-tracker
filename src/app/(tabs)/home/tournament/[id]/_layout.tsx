import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { globalScreenOptions } from "../../../_layout";

export default function Layout() {
  const { t } = useTranslation();
  return (
    <Stack screenOptions={globalScreenOptions}>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Tournament",
        }}
      />
      <Stack.Screen
        name="rules"
        options={{
          headerTitle: "Rules",
          headerBackTitle: t("settings.headerBackTitle"),
        }}
      />
    </Stack>
  );
}
