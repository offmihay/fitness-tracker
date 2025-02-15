import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign-up" />
      <Stack.Screen name="welcome" />
      <Stack.Screen
        name="sign-in"
        options={{
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
