import { stackProps } from "@/src/components/navigation/options";
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack {...stackProps}>
      <Stack.Screen name="sign-up" />
      <Stack.Screen name="welcome" />
      <Stack.Screen
        name="sign-in"
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="recover"
        options={{
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
