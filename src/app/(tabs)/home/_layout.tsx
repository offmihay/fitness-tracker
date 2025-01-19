import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { stackProps } from "@/src/components/navigation/options";

export default function Layout() {
  const { t } = useTranslation();
  return (
    <Stack {...stackProps}>
      <Stack.Screen
        name="index"
        options={{
          title: t("home.title"),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="tournament"
        options={{
          title: t("home.title"),
        }}
      />
    </Stack>
  );
}
