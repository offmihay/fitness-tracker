import { stackProps } from "@/src/components/navigation/options";
import { Stack } from "expo-router";

export default function RecoverLayout() {
  return (
    <Stack {...stackProps}>
      <Stack.Screen name="index" />
      <Stack.Screen name="code" />
      <Stack.Screen name="new-password" />
    </Stack>
  );
}
