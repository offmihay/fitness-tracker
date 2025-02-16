import { stackProps } from "@/src/components/navigation/options";
import { useAuthContext } from "@/src/providers/AuthContextProvider";
import { Redirect, Stack } from "expo-router";

export default function AppLayout() {
  const { isSignedIn } = useAuthContext();

  if (!isSignedIn) {
    return <Redirect href="/welcome" />;
  }

  return (
    <Stack {...stackProps} screenOptions={{ ...stackProps.screenOptions, gestureEnabled: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="register" options={{ presentation: "modal" }} />
    </Stack>
  );
}
