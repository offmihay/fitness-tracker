import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons, FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import CustomMap from "../shared/map/CustomMap";
import CustomText from "../shared/text/CustomText";
import ButtonDefault from "../shared/button/ButtonDefault";
import { Image } from "expo-image";
import { Tournament } from "@/src/types/TournamentType";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { useTranslation } from "react-i18next";

type Props = {
  data: Tournament;
  handleOpenRules: () => void;
  handleOpenParticipants: () => void;
  handleOpenOrganizer: () => void;
};

const TournamentDetails = ({
  data,
  handleOpenRules,
  handleOpenParticipants,
  handleOpenOrganizer,
}: Props) => {
  const theme = useCustomTheme();
  const { t } = useTranslation();

  return (
    <View className="flex flex-col gap-6">
      <View style={{ width: "100%", borderRadius: 10, height: 250, overflow: "hidden" }}>
        <Image source={data?.images[0].secure_url} style={StyleSheet.absoluteFill} />
      </View>
      <View className="flex flex-row justify-between">
        <ButtonDefault title={t("home.tournament.register")} style={{ width: "48%" }} />
        <ButtonDefault
          type="grey"
          title={t("home.tournament.saveForLater")}
          style={{ width: "48%" }}
        />
      </View>
      <View style={[styles.infoBlock, { backgroundColor: theme.colors.surface }]}>
        <CustomText type="subtitle" className="mb-4">
          {t("home.tournament.description")}
        </CustomText>
        <CustomText>{data?.description}</CustomText>
      </View>
      <View className="flex flex-row justify-around my-2">
        <View className="flex flex-col items-center gap-2">
          <TouchableOpacity
            style={[{ backgroundColor: theme.colors.primary }, styles.btn]}
            activeOpacity={0.8}
            onPress={() => handleOpenParticipants()}
          >
            <Ionicons name="people-sharp" size={24} color={theme.colors.deep} />
          </TouchableOpacity>
          <CustomText weight="semibold">{t("home.tournament.participants")}</CustomText>
        </View>
        <View className="flex flex-col items-center gap-2">
          <TouchableOpacity
            style={[{ backgroundColor: theme.colors.primary }, styles.btn]}
            activeOpacity={0.8}
            onPress={() => handleOpenRules()}
          >
            <Ionicons name="information-circle" size={24} color={theme.colors.deep} />
          </TouchableOpacity>
          <CustomText weight="semibold">{t("home.tournament.rules")}</CustomText>
        </View>
        <View className="flex flex-col items-center gap-2">
          <TouchableOpacity
            style={[{ backgroundColor: theme.colors.primary }, styles.btn]}
            className="pl-2"
            activeOpacity={0.8}
            onPress={() => handleOpenOrganizer()}
          >
            <FontAwesome6 name="building-circle-check" size={20} color={theme.colors.deep} />
          </TouchableOpacity>
          <CustomText weight="semibold">{t("home.tournament.organizer")}</CustomText>
        </View>
      </View>
      <View style={[styles.infoBlock, { backgroundColor: theme.colors.surface }]}>
        <View className="flex flex-col gap-3">
          <View className="flex flex-row gap-4 items-center">
            <MaterialIcons name="sports-tennis" size={24} color={theme.colors.primary} />
            <CustomText>
              <CustomText weight="bold">{t("home.tournament.sportType")}: </CustomText>
              {data?.sportType}
            </CustomText>
          </View>
          <View className="flex flex-row gap-4 items-center">
            <Ionicons name="information-circle" size={24} color={theme.colors.primary} />
            <CustomText>
              <CustomText weight="bold">{t("home.tournament.format")}: </CustomText>
              {data?.format}
            </CustomText>
          </View>
          <View className="flex flex-row gap-4 items-center">
            <MaterialIcons name="fitness-center" size={24} color={theme.colors.primary} />
            <CustomText>
              <CustomText weight="bold">{t("home.tournament.skillLevel")}: </CustomText>
              {data?.skillLevel}
            </CustomText>
          </View>
          <View className="flex flex-row gap-4 items-center">
            <MaterialIcons name="18-up-rating" size={24} color={theme.colors.primary} />
            <CustomText>
              <CustomText weight="bold">{t("home.tournament.ageRestriction")}: </CustomText>
              {data?.ageRestrictions?.maxAge != null && data?.ageRestrictions?.minAge != null
                ? `${data.ageRestrictions.minAge} - ${data.ageRestrictions.maxAge}`
                : data?.ageRestrictions?.minAge != null
                ? `${data.ageRestrictions.minAge}+`
                : t("home.tournament.noAgeRestrictions")}
            </CustomText>
          </View>
        </View>
      </View>
      <View style={[styles.infoBlock, { backgroundColor: theme.colors.surface }]}>
        <View className="flex flex-col gap-3">
          <View className="flex flex-row gap-4 items-center">
            <FontAwesome6 name="money-check" size={21} color={theme.colors.primary} />
            <CustomText>
              <CustomText weight="bold">{t("home.tournament.entryFee")}: </CustomText>
              {data?.entryFee} UAH
            </CustomText>
          </View>
          <View className="flex flex-row gap-4 items-center">
            <FontAwesome6 name="sack-dollar" size={24} color={theme.colors.primary} />
            <CustomText>
              <CustomText weight="bold">{t("home.tournament.prizePool")}: </CustomText>
              {data?.prizePool} UAH
            </CustomText>
          </View>
        </View>
      </View>
      <View
        style={[{ backgroundColor: theme.colors.surface, borderRadius: 10, overflow: "hidden" }]}
      >
        <View style={styles.infoBlock}>
          <CustomText type="subtitle" className="mb-4">
            {t("home.tournament.location")}
          </CustomText>
          <CustomText className="mb-2">
            {data?.city}, {data?.location}
          </CustomText>
        </View>
        <View style={{ width: "100%", height: 250 }}>
          {Platform.OS === "ios" ? (
            <CustomMap geoCoordinates={data?.geoCoordinates} description={data?.location} />
          ) : null}
        </View>
      </View>
      {data.organizer && (
        <View style={[styles.infoBlock, { backgroundColor: theme.colors.surface }]}>
          <CustomText type="subtitle" className="mb-4">
            {t("home.tournament.organizerDetails")}
          </CustomText>
          <CustomText>
            {t("home.tournament.organizedBy", {
              name: data?.organizer.name ?? t("home.tournament.unknown"),
            })}
          </CustomText>
          <CustomText>
            {t("home.tournament.contactUs")}:<CustomText> </CustomText>
            <CustomText type="link">{data?.organizer.contact.email}.</CustomText>
          </CustomText>
          {data?.organizer.contact.phone && (
            <CustomText>{data?.organizer.contact.phone}</CustomText>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  infoBlock: {
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  prizeBlock: {
    borderRadius: 10,
    width: "35%",
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  btn: {
    width: 60,
    height: 60,
    borderRadius: 3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default TournamentDetails;
