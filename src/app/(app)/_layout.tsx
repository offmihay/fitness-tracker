import { stackProps } from "@/src/components/navigation/options";
import { useAuthContext } from "@/src/providers/AuthContextProvider";
import LoadingModal from "@/src/shared/modal/LoadingModal";
import { Redirect, Stack } from "expo-router";

export default function AppLayout() {
  const { isSignedIn, isLoading } = useAuthContext();

  if (isLoading) {
    return <LoadingModal isVisible />;
  }

  if (!isSignedIn) {
    return <Redirect href="/welcome" />;
  }

  return (
    <Stack {...stackProps}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="register" options={{ presentation: "modal" }} />
    </Stack>
  );
}
