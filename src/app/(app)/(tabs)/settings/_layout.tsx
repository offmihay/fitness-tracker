import { Stack } from "expo-router";
import { stackProps } from "@/src/components/navigation/options";

export default function Layout() {
  return (
    <Stack {...stackProps}>
      <Stack.Screen name="index" />
      <Stack.Screen name="personal-info" />
    </Stack>
  );
}
