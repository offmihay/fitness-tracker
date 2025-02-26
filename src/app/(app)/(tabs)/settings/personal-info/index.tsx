import { StyleSheet, View } from "react-native";
import React from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useTranslation } from "react-i18next";
import UserAvatarList from "@/src/components/settings/personal-info/UserAvatarList";
import { useRouter } from "expo-router";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import {
  Entypo,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import { Divider } from "react-native-paper";
import PersonalInfoList from "@/src/components/settings/personal-info/PersonalInfoList";
import FormBirthday from "@/src/components/settings/personal-info/forms/FormBirthday";
import LayoutScrollView from "@/src/components/navigation/layouts/LayoutScrollView";
import ButtonDefault from "@/src/shared/button/ButtonDefault";
import { useQueryClient } from "@tanstack/react-query";
import { useManualLoading } from "@/src/hooks/useLoading";

const PersonalInfo = () => {
  const { setIsLoading } = useManualLoading(true);
  const queryClient = useQueryClient();
  const { signOut } = useAuth();
  const { t } = useTranslation();
  const { user } = useUser();
  const theme = useCustomTheme();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    queryClient.clear();
  };

  return (
    <LayoutScrollView name="personalInfo">
      <View style={styles.wrapper}>
        <View style={[{ backgroundColor: theme.colors.surface, borderRadius: 10 }]}>
          <UserAvatarList />
          <Divider />
          <PersonalInfoList
            label={t("user.email")}
            value={user?.primaryEmailAddress?.emailAddress || t("common.notSpecified")}
            onPress={() => void 0}
            icon={<Entypo name="mail" size={24} color={theme.colors.primary} />}
            disabled
          />
          <Divider />
          <PersonalInfoList
            label={t("user.name")}
            value={
              `${user?.firstName} ${user?.lastName}`.trim().length !== 0 && !!user?.firstName
                ? user.lastName
                  ? `${user?.firstName} ${user?.lastName}`
                  : user?.firstName
                : t("common.notSpecified")
            }
            onPress={() =>
              router.push({ pathname: "./change-name" }, { relativeToDirectory: true })
            }
            icon={<Feather name="user" size={24} color={theme.colors.primary} />}
          />
          <Divider />
          <PersonalInfoList
            label={t("user.residencePlace")}
            value={user?.unsafeMetadata.residencePlace?.city ?? t("common.notSpecified")}
            onPress={() =>
              router.push({ pathname: "./change-residence" }, { relativeToDirectory: true })
            }
            icon={
              <MaterialCommunityIcons
                name="home-city-outline"
                size={24}
                color={theme.colors.primary}
              />
            }
          />
          <Divider />
          <PersonalInfoList
            label={t("user.sport")}
            value={
              user?.unsafeMetadata.featuredSport && user?.unsafeMetadata.featuredSport.length > 0
                ? user?.unsafeMetadata.featuredSport
                    .map(
                      (sport, index) =>
                        (index === 0 ? "" : " ") + t(`tournament.sportType.${sport}`)
                    )
                    .toString()
                : t("common.notSpecified")
            }
            onPress={() =>
              router.push({ pathname: "./change-sport" }, { relativeToDirectory: true })
            }
            icon={<Ionicons name="tennisball-sharp" size={24} color={theme.colors.primary} />}
          />

          <Divider />
          <FormBirthday
            onLoadChange={setIsLoading}
            renderTrigger={(onPress, value) => (
              <PersonalInfoList
                label={t("user.birthday")}
                value={value || t("common.notSpecified")}
                onPress={onPress}
                icon={<FontAwesome name="birthday-cake" size={20} color={theme.colors.primary} />}
              />
            )}
          />
        </View>
        <View style={{ paddingHorizontal: 10, paddingBottom: 20 }}>
          <ButtonDefault
            onPress={handleSignOut}
            title={t("common.signOut")}
            nodeLeft={(color) => <Octicons name="sign-out" size={24} color={color} />}
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
