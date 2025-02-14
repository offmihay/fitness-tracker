import { Stack } from "expo-router";
import { stackProps } from "@/src/components/navigation/options";
import { WizardProvider } from "@/src/components/wizard/WizardContext";

export default function RegisterLayout() {
  return (
    <WizardProvider>
      <Stack {...stackProps}>
        <Stack.Screen name="index" />
        <Stack.Screen name="sport-featured" />
        <Stack.Screen name="residence" />
      </Stack>
    </WizardProvider>
  );
}
