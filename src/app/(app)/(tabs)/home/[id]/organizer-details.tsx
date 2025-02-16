import { StyleSheet, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { getTournamentByID } from "@/src/queries/tournaments";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import CustomText from "@/src/shared/text/CustomText";
import LayoutStatic from "@/src/components/navigation/layouts/LayoutStatic";
import PersonalInfoList from "@/src/components/settings/personal-info/PersonalInfoList";
import { useTranslation } from "react-i18next";
import { Feather } from "@expo/vector-icons";
import { Divider } from "react-native-paper";

const OrganizerDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const { data } = getTournamentByID(id as string);
  const { t } = useTranslation();
  const theme = useCustomTheme();

  return (
    <LayoutStatic name="organizerDetails">
      <View style={styles.wrapper}>
        <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <PersonalInfoList
            label={t("user.organizerName")}
            value={data?.organizer.organizerName}
            onPress={() => void 0}
            icon={<Feather name="user" size={24} color={theme.colors.primary} />}
            renderButton={() => <></>}
          />
          <Divider />
          <PersonalInfoList
            label={t("user.organizerEmail")}
            value={data?.organizer.organizerEmail}
            onPress={() => void 0}
            icon={<Feather name="mail" size={24} color={theme.colors.primary} />}
            renderButton={() => <></>}
          />
          <Divider />
          <PersonalInfoList
            label={t("user.organizerPhone")}
            value={data?.organizer.organizerPhone}
            onPress={() => void 0}
            icon={<Feather name="phone" size={24} color={theme.colors.primary} />}
            renderButton={() => <></>}
          />
        </View>
        {data?.organizer.organizerDetails && (
          <View
            style={[
              styles.card,
              { backgroundColor: theme.colors.surface, paddingHorizontal: 20, paddingVertical: 10 },
            ]}
            className="mt-4"
          >
            <CustomText>{data?.organizer.organizerDetails}</CustomText>
          </View>
        )}
      </View>
    </LayoutStatic>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  card: {
    borderRadius: 10,
  },
});

export default OrganizerDetailsScreen;
