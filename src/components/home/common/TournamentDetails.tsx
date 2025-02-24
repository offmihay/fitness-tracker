import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import {
  Ionicons,
  FontAwesome6,
  MaterialIcons,
  AntDesign,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Tournament, TournamentStatus } from "@/src/types/tournament";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { useTranslation } from "react-i18next";
import ButtonDefault from "@/src/shared/button/ButtonDefault";
import CustomMap from "@/src/shared/map/CustomMap";
import CustomText from "@/src/shared/text/CustomText";
import Carousel from "@/src/shared/carousel/Carousel";
import { TournamentInfoBlock, TournamentInfoRow } from "./TournamentInfoBlock";
import { formatDateTime } from "@/src/utils/formatDateTime";
import { useSettings } from "@/src/hooks/useSettings";
import SportLabel from "./SportLabel";

type Props = {
  isRegistred: boolean;
  data: Tournament;
  handleOpenRules: () => void;
  handleOpenParticipants: () => void;
  handleOpenOrganizer: () => void;
  handleRegister?: () => void;
};

const TournamentDetails = ({
  isRegistred,
  data,
  handleOpenRules,
  handleOpenParticipants,
  handleOpenOrganizer,
  handleRegister,
}: Props) => {
  const theme = useCustomTheme();
  const { t } = useTranslation("");
  const { settings } = useSettings();

  return (
    <View className="flex flex-col gap-6">
      <SportLabel type={data?.sportType} />
      {data.images.length > 0 && (
        <View style={styles.imgWrapper}>
          <Carousel
            images={data.images.map(({ secureUrl }) => ({ imageUri: secureUrl }))}
            useArrows
          />
        </View>
      )}
      {data.status === TournamentStatus.UPCOMING ? (
        !isRegistred ? (
          <View className="flex flex-row justify-between">
            <ButtonDefault
              title={t("home.tournament.register")}
              styleWrapper={{ width: "48%" }}
              onPress={handleRegister}
              disabled={!data.isApproved}
            />
            <ButtonDefault
              type="grey"
              title={t("home.tournament.saveForLater")}
              styleWrapper={{ width: "48%" }}
              disabled={!data.isApproved}
            />
          </View>
        ) : (
          <View>
            <ButtonDefault
              title={t("register.addReminder")}
              onPress={void 0}
              type="primary"
              nodeLeft={(color) => (
                <MaterialCommunityIcons name="reminder" size={24} color={color} />
              )}
            />
          </View>
        )
      ) : (
        <CustomText>{t("home.tournament.registrationFinished")}</CustomText>
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
      <TournamentInfoBlock>
        <TournamentInfoRow
          renderIcon={(color) => <MaterialIcons name="sports-tennis" size={24} color={color} />}
          label={t("tournament.sportType.title")}
          value={t(`tournament.sportType.${data.sportType}`)}
        />
        <TournamentInfoRow
          renderIcon={(color) => <MaterialIcons name="fitness-center" size={24} color={color} />}
          label={t("tournament.skillLevel.title")}
          value={t(`tournament.skillLevel.${data.skillLevel}`)}
        />
        <TournamentInfoRow
          renderIcon={(color) => <MaterialIcons name="18-up-rating" size={24} color={color} />}
          label={t("tournament.ageRestriction.title")}
          value={
            data?.ageRestrictions?.maxAge != null && data?.ageRestrictions?.minAge != null
              ? `${data.ageRestrictions.minAge} - ${data.ageRestrictions.maxAge}`
              : data?.ageRestrictions?.minAge != null
              ? `${data.ageRestrictions.minAge}+`
              : t("home.tournament.noAgeRestrictions")
          }
        />
      </TournamentInfoBlock>
      {data.format && (
        <TournamentInfoBlock>
          <TournamentInfoRow
            renderIcon={(color) => <Ionicons name="information-circle" size={24} color={color} />}
            label={t("tournament.format.title")}
            value={t(`tournament.format.${data.format}`)}
          />
        </TournamentInfoBlock>
      )}
      <TournamentInfoBlock>
        <TournamentInfoRow
          renderIcon={(color) => <FontAwesome6 name="money-check" size={21} color={color} />}
          label={t("tournament.entryFee")}
          value={`${data?.entryFee} UAH`}
        />
        <TournamentInfoRow
          renderIcon={(color) => <FontAwesome6 name="sack-dollar" size={24} color={color} />}
          label={t("tournament.prizePool")}
          value={`${data?.prizePool} UAH`}
        />
      </TournamentInfoBlock>
      <TournamentInfoBlock>
        <TournamentInfoRow
          renderIcon={(color) => <FontAwesome name="calendar-check-o" size={20} color={color} />}
          label={t("tournament.dateStart")}
          value={formatDateTime(data.dateStart, settings.language)}
        />
        <TournamentInfoRow
          renderIcon={(color) => <FontAwesome name="calendar-times-o" size={20} color={color} />}
          label={t("tournament.dateEnd")}
          value={formatDateTime(data.dateEnd, settings.language)}
        />
      </TournamentInfoBlock>
      <View
        style={[{ backgroundColor: theme.colors.surface, borderRadius: 10, overflow: "hidden" }]}
      >
        <View style={styles.infoBlock}>
          <CustomText type="subtitle" className="mb-4">
            {t("tournament.location")}
          </CustomText>
          <CustomText className="mb-2">{data?.location}</CustomText>
        </View>
        <View style={{ width: "100%", height: 250 }}>
          <CustomMap geoCoordinates={data?.geoCoordinates} description={data?.location} />
        </View>
      </View>
      {data.organizer && (
        <TournamentInfoBlock title={t("home.tournament.organizerDetails")}>
          <TournamentInfoRow
            renderIcon={(color) => <FontAwesome5 name="house-user" size={20} color={color} />}
            label={t("home.tournament.organizedBy")}
            value={data?.organizer.organizerName ?? t("home.tournament.unknown")}
          />
          {data.organizer.organizerPhone && (
            <TournamentInfoRow
              renderIcon={(color) => <AntDesign name="phone" size={20} color={color} />}
              label={t("user.phoneNumber")}
              value={data.organizer.organizerPhone || t("home.tournament.unknown")}
            />
          )}
          {data.organizer.organizerEmail && (
            <TournamentInfoRow
              renderIcon={(color) => <Ionicons name="mail" size={20} color={color} />}
              label={t("home.tournament.contactUs")}
              value={data.organizer.organizerEmail || t("home.tournament.unknown")}
            />
          )}
        </TournamentInfoBlock>
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
