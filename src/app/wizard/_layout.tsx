import { Stack } from "expo-router";
import { stackProps } from "@/src/components/navigation/options";
import { WizardProvider } from "@/src/components/wizard/WizardContext";

export default function WizardLayout() {
  return (
    <WizardProvider>
      <Stack {...stackProps} screenOptions={{ ...stackProps.screenOptions, gestureEnabled: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="sport-featured" />
        <Stack.Screen name="residence" />
      </Stack>
    </WizardProvider>
  );
}
