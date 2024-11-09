import { useAuth } from "@clerk/clerk-expo";
import { MaterialIcons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, Text } from "react-native";

export default function Layout() {
  const { t } = useTranslation();
  const { signOut } = useAuth();
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
          title: t("settings.personalInfo.title"),
          headerBackTitle: t("settings.headerBackTitle"),
          headerBackTitleVisible: true,
          headerRight: (props) => (
            <TouchableOpacity onPress={() => signOut()}>
              <MaterialIcons name="logout" size={24} color={props.tintColor} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
