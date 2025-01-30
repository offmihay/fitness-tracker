import { StyleSheet, View } from "react-native";
import React from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useTranslation } from "react-i18next";
import UserAvatarList from "@/src/components/settings/personal-info/UserAvatarList";
import { useRouter } from "expo-router";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { Entypo, Feather, FontAwesome, Octicons } from "@expo/vector-icons";
import { Divider } from "react-native-paper";
import PersonalInfoList from "@/src/components/settings/personal-info/PersonalInfoList";
import FormBirthday from "@/src/components/settings/personal-info/forms/FormBirthday";
import LayoutScrollView from "@/src/components/navigation/layouts/LayoutScrollView";
import ButtonDefault from "@/src/shared/button/ButtonDefault";

type PersonalInfoProps = {};

const PersonalInfo = ({}: PersonalInfoProps) => {
  const { signOut } = useAuth();
  const { t } = useTranslation();
  const { user } = useUser();
  const theme = useCustomTheme();
  const router = useRouter();

  return (
    <LayoutScrollView name="personalInfo" alwaysBounceVertical={false}>
      <View style={styles.wrapper}>
        <View style={[{ backgroundColor: theme.colors.surface, borderRadius: 10 }]}>
          <UserAvatarList />
          <Divider />
          <PersonalInfoList
            label={t("settings.personalInfo.email")}
            value={user?.primaryEmailAddress?.emailAddress || "Not specified"}
            onPress={() => void 0}
            icon={<Entypo name="mail" size={20} color={theme.colors.primary} />}
            disabled
          />
          <Divider />
          <PersonalInfoList
            label={t("settings.personalInfo.name")}
            value={
              `${user?.firstName} ${user?.lastName}`.trim().length !== 0 && !!user?.firstName
                ? !!user.lastName
                  ? `${user?.firstName} ${user?.lastName}`
                  : user?.firstName
                : "Not specified"
            }
            onPress={() =>
              router.push({ pathname: "./change-name" }, { relativeToDirectory: true })
            }
            icon={<Feather name="user" size={20} color={theme.colors.primary} />}
          />
          <Divider />
          <FormBirthday
            renderTrigger={(onPress, value) => (
              <PersonalInfoList
                label={t("settings.personalInfo.birthday")}
                value={value || "Not specified"}
                onPress={onPress}
                icon={<FontAwesome name="birthday-cake" size={20} color={theme.colors.primary} />}
              />
            )}
          />
        </View>
        <View style={{ paddingHorizontal: 10, paddingBottom: 20 }}>
          <ButtonDefault
            onPress={() => signOut()}
            title={t("settings.personalInfo.signOut")}
            nodeLeft={(color) => <Octicons name="sign-out" size={20} color={color} />}
            type="white"
            className="mt-6"
          />
        </View>
      </View>
    </LayoutScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    overflow: "hidden",
  },
});

export default PersonalInfo;
