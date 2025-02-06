import { stackProps } from "@/src/components/navigation/options";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack {...stackProps}>
      <Stack.Screen name="index" />
      <Stack.Screen name="choose-location" />
      <Stack.Screen name="organizer" />
    </Stack>
  );
}
