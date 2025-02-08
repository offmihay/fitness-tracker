import { stackProps } from "@/src/components/navigation/options";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack {...stackProps}>
      <Stack.Screen name="index" />
      <Stack.Screen name="change-name" />
    </Stack>
  );
}
