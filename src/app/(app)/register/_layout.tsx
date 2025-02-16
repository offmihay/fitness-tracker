import { Stack } from "expo-router";
import { stackProps } from "@/src/components/navigation/options";

export default function RegisterLayout() {
  return (
    <Stack {...stackProps}>
      <Stack.Screen name="index" />
      <Stack.Screen name="confirm" />
    </Stack>
  );
}
