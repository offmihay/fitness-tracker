import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, Text } from "react-native";

export default function Layout() {
  const { t } = useTranslation();
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="index"
        options={{
          title: t("settings.title"),
        }}
      />
      <Stack.Screen
        name="personal-info"
        options={{
          title: t("settings.personal-info.title"),
          headerBackTitle: t("settings.headerBackTitle"),
        }}
      />
    </Stack>
  );
}
