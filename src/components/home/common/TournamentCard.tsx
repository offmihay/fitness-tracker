import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import FastImage from "@d11/react-native-fast-image";
import CustomText from "@/src/shared/text/CustomText";
import { TournamentBase } from "@/src/types/tournament";
import { formatDateRange } from "@/src/utils/formatDateRange";
import { useSettings } from "@/src/hooks/useSettings";
import SportLabel from "./SportLabel";
import CustomLabel from "./CustomLabel";

type Props = {
  handleOpenDetails: () => void;
  data: TournamentBase;
};

export const CARD_HEIGHT = 420;

const TournamentCard = ({ data, handleOpenDetails }: Props) => {
  const theme = useCustomTheme();
  const { t } = useTranslation();
  const { settings } = useSettings();

  const { title, location, dateStart, dateEnd, participantsCount, maxParticipants, images } = data;

  const participantsText = `${participantsCount}/${maxParticipants}`;

  const prizePool = data.prizePool ? `${data.prizePool.toString()} UAH` : "-";
  const entryFee = data.entryFee ? `${data.entryFee.toString()} UAH` : "-";

  return (
    <TouchableOpacity onPress={handleOpenDetails} activeOpacity={0.8}>
      <View style={[{ backgroundColor: theme.colors.surface }, styles.wrapper]}>
        <View
          style={{
            width: "100%",
            height: 190,
            borderRadius: 10,
            overflow: "hidden",
            position: "relative",
          }}
          className="mb-3"
        >
          <FastImage
            style={{ width: "100%", height: "100%" }}
            source={{
              uri: images.length > 0 ? images[0].secureUrl : undefined,
              priority: FastImage.priority.low,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
        <CustomText type="subtitle">{title}</CustomText>
        <View className="flex flex-row gap-4 mt-3">
          <SportLabel type={data?.sportType} />
          {entryFee && (
            <CustomLabel
              icon={<FontAwesome6 name="money-check" size={20} color="white" />}
              value={entryFee}
            />
          )}
        </View>
        <View className="flex-1 flex-row mt-3 items-center">
          <View style={{ width: "65%" }}>
            <View className="flex flex-col pr-1 gap-2">
              <View className="flex flex-row gap-2 items-center" style={{ height: 40 }}>
                <View style={{ width: 25 }}>
                  <FontAwesome6 name="location-dot" size={20} color={theme.colors.text} />
                </View>
                <CustomText
                  type="predefault"
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={{ maxWidth: "80%" }}
                >
                  {location}
                </CustomText>
              </View>
              <View className="flex flex-row gap-2 items-center" style={{ height: 40 }}>
                <View style={{ width: 25 }}>
                  <Feather name="calendar" size={20} color={theme.colors.text} />
                </View>
                <CustomText
                  type="predefault"
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={{ maxWidth: "80%" }}
                >
                  {formatDateRange(dateStart, dateEnd, settings.language)}
                </CustomText>
              </View>
            </View>
          </View>
          <View style={{ width: "35%" }}>
            <View className="flex flex-col pl-1 gap-2">
              <View className="flex flex-row gap-2 items-center" style={{ height: 40 }}>
                <View style={{ width: 25 }}>
                  <Ionicons name="person" size={20} color={theme.colors.text} />
                </View>
                <CustomText
                  type="predefault"
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={{ maxWidth: "75%" }}
                >
                  {participantsText}
                </CustomText>
              </View>
              <View className="flex flex-row gap-2 items-center" style={{ height: 40 }}>
                <View style={{ width: 25 }}>
                  <FontAwesome6 name="sack-dollar" size={20} color={theme.colors.text} />
                </View>
                <CustomText
                  type="predefault"
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={{ maxWidth: "75%" }}
                >
                  {prizePool}
                </CustomText>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    borderRadius: 10,
    height: CARD_HEIGHT,
  },

  border: {
    borderWidth: 1,
    borderColor: "red",
  },
});

export default TournamentCard;
