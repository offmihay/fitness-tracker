import { StyleSheet, View } from "react-native";
import React from "react";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import CustomText from "@/src/shared/text/CustomText";
import {
  MaterialIcons,
  Ionicons,
  FontAwesome6,
  FontAwesome,
  AntDesign,
  FontAwesome5,
} from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { Tournament } from "@/src/types/tournament";
import { TournamentInfoBlock, TournamentInfoRow } from "../home/common/TournamentInfoBlock";
import { useSettings } from "@/src/hooks/useSettings";
import { formatDateTime } from "@/src/utils/formatDateTime";
import ExpandableImage from "@/src/shared/image/ExpandableImage";
import FastImage from "@d11/react-native-fast-image";

type Props = {
  data: Tournament;
};

const ConfirmTournamentDetails = (props: Props) => {
  const { data } = props;
  const { settings } = useSettings();

  const theme = useCustomTheme();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={[styles.infoBlock, { backgroundColor: theme.colors.surface }]}>
        <View className="flex flex-row gap-6 items-center">
          <View style={[styles.imgWrapper, { backgroundColor: theme.colors.surfaceLight }]}>
            <ExpandableImage
              disableDelete
              source={{ uri: data.images[0].secureUrl }}
              style={{
                width: "100%",
                height: "100%",
              }}
              imageWrapper={{ borderRadius: 10 }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
          <CustomText type="default" numberOfLines={3} style={{ flex: 1 }}>
            {data.title}
          </CustomText>
        </View>
      </View>
      <TournamentInfoBlock>
        <TournamentInfoRow
          renderIcon={(color) => <FontAwesome6 name="map-location-dot" size={20} color={color} />}
          label={t("tournament.location")}
          value={data.location}
        />
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
      <TournamentInfoBlock>
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

      {data.organizer && (
        <TournamentInfoBlock title={t("home.tournament.organizerDetails")}>
          <TournamentInfoRow
            renderIcon={(color) => <FontAwesome5 name="house-user" size={20} color={color} />}
            label={t("home.tournament.organizedBy")}
            value={data?.organizer.organizerName ?? t("home.tournament.unknown")}
          />
          <TournamentInfoRow
            renderIcon={(color) => <AntDesign name="phone" size={20} color={color} />}
            label={t("settings.personalInfo.phoneNumber")}
            value={data.organizer.organizerPhone || t("home.tournament.unknown")}
          />
        </TournamentInfoBlock>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imgWrapper: {
    width: 80,
    borderRadius: 5,
    height: 60,
    overflow: "hidden",
    position: "relative",
  },

  container: {
    display: "flex",
    gap: 10,
  },

  infoBlock: {
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
});

export default ConfirmTournamentDetails;
