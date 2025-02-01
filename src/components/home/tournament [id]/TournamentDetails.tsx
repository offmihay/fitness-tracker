import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import { Ionicons, FontAwesome6, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { Tournament } from "@/src/types/tournament";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { useTranslation } from "react-i18next";
import ButtonDefault from "@/src/shared/button/ButtonDefault";
import CustomMap from "@/src/shared/map/CustomMap";
import CustomText from "@/src/shared/text/CustomText";
import Carousel from "@/src/shared/carousel/Carousel";

type Props = {
  isRegistred: boolean;
  data: Tournament;
  handleOpenRules: () => void;
  handleOpenParticipants: () => void;
  handleOpenOrganizer: () => void;
};

const TournamentDetails = ({
  isRegistred,
  data,
  handleOpenRules,
  handleOpenParticipants,
  handleOpenOrganizer,
}: Props) => {
  const theme = useCustomTheme();
  const { t } = useTranslation("");

  return (
    <View className="flex flex-col gap-6">
      <View style={styles.imgWrapper}>
        <Carousel
          images={data.images.map(({ secureUrl }) => ({ imageUri: secureUrl }))}
          useArrows
        />
      </View>
      {!isRegistred && (
        <View className="flex flex-row justify-between">
          <ButtonDefault title={t("home.tournament.register")} styleWrapper={{ width: "48%" }} />
          <ButtonDefault
            type="grey"
            title={t("home.tournament.saveForLater")}
            styleWrapper={{ width: "48%" }}
          />
        </View>
      )}
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
              <CustomText weight="bold">{t("tournament.sportType.title")}: </CustomText>
              {t(`tournament.sportType.${data.sportType}`)}
            </CustomText>
          </View>
          <View className="flex flex-row gap-4 items-center">
            <MaterialIcons name="fitness-center" size={24} color={theme.colors.primary} />
            <CustomText>
              <CustomText weight="bold">{t("tournament.skillLevel.title")}: </CustomText>
              {t(`tournament.skillLevel.${data.skillLevel}`)}
            </CustomText>
          </View>
          <View className="flex flex-row gap-4 items-center">
            <MaterialIcons name="18-up-rating" size={24} color={theme.colors.primary} />
            <CustomText>
              <CustomText weight="bold">{t("tournament.ageRestriction.title")}: </CustomText>
              {data?.ageRestrictions?.maxAge != null && data?.ageRestrictions?.minAge != null
                ? `${data.ageRestrictions.minAge} - ${data.ageRestrictions.maxAge}`
                : data?.ageRestrictions?.minAge != null
                ? `${data.ageRestrictions.minAge}+`
                : t("home.tournament.noAgeRestrictions")}
            </CustomText>
          </View>
        </View>
      </View>
      {data.format && (
        <View style={[styles.infoBlock, { backgroundColor: theme.colors.surface }]}>
          <View className="flex flex-col gap-3">
            <View className="flex flex-row gap-4 items-center">
              <Ionicons name="information-circle" size={24} color={theme.colors.primary} />
              <CustomText>
                <CustomText weight="bold">{t("tournament.format.title")}: </CustomText>
                {t(`tournament.format.${data.format}`)}
              </CustomText>
            </View>
          </View>
        </View>
      )}
      <View style={[styles.infoBlock, { backgroundColor: theme.colors.surface }]}>
        <View className="flex flex-col gap-3">
          <View className="flex flex-row gap-4 items-center">
            <FontAwesome6 name="money-check" size={21} color={theme.colors.primary} />
            <CustomText>
              <CustomText weight="bold">{t("tournament.entryFee")}: </CustomText>
              {data?.entryFee} UAH
            </CustomText>
          </View>
          <View className="flex flex-row gap-4 items-center">
            <FontAwesome6 name="sack-dollar" size={24} color={theme.colors.primary} />
            <CustomText>
              <CustomText weight="bold">{t("tournament.prizePool")}: </CustomText>
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
          <CustomText className="mb-2">{data?.location}</CustomText>
        </View>
        <View style={{ width: "100%", height: 250 }}>
          <CustomMap geoCoordinates={data?.geoCoordinates} description={data?.location} />
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
  imgWrapper: {
    width: "100%",
    borderRadius: 10,
    height: 250,
    overflow: "hidden",
    position: "relative",
  },

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
