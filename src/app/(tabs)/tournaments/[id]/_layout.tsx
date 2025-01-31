import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { stackProps } from "@/src/components/navigation/options";

export default function Layout() {
  return (
    <Stack {...stackProps}>
      <Stack.Screen name="index" />
      <Stack.Screen name="rules" />
    </Stack>
  );
}
