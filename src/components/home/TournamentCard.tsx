import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { memo } from "react";

import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import FastImage from "@d11/react-native-fast-image";
import CustomText from "@/src/shared/text/CustomText";

type Props = {
  title: string;
  imageSource: string;
  location: string;
  dateTime: string;
  participants: string;
  entryFee: string;
  prizePool: string;
  handleRegister: () => void;
  handleOpenDetails: () => void;
};

const TournamentCard = ({
  title,
  location,
  dateTime,
  participants,
  entryFee,
  prizePool,
  imageSource,
  handleRegister,
  handleOpenDetails,
}: Props) => {
  const theme = useCustomTheme();
  const { t } = useTranslation();

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
          className="mb-4"
        >
          <FastImage
            style={{ width: "100%", height: "100%" }}
            source={{
              uri: imageSource,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View style={[styles.prizeBadge, { backgroundColor: theme.colors.surface }]}>
            <FontAwesome6 name="sack-dollar" size={18} color={theme.colors.text} />
            <CustomText style={{ fontWeight: 800 }}>{prizePool}</CustomText>
          </View>
        </View>
        <CustomText type="subtitle">{title}</CustomText>
        <View className="flex flex-row mt-4">
          <View style={{ width: "65%" }}>
            <View className="flex flex-col pr-1 gap-1">
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
                  {dateTime}
                </CustomText>
              </View>
            </View>
          </View>
          <View style={{ width: "35%" }}>
            <View className="flex flex-col pl-1 gap-1">
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
                  {participants}
                </CustomText>
              </View>
              <View className="flex flex-row gap-2 items-center" style={{ height: 40 }}>
                <View style={{ width: 25 }}>
                  <FontAwesome6 name="money-check" size={20} color={theme.colors.text} />
                </View>
                <CustomText
                  type="predefault"
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={{ maxWidth: "75%" }}
                >
                  {entryFee}
                </CustomText>
              </View>
            </View>
          </View>
        </View>

        {/* <View className="flex flex-row justify-between mt-4">
          <TouchableBtn
            title={t("home.tournament.register")}
            style={{ width: "48%" }}
            onPress={handleRegister}
            nodeLeft={(color) => <></>}
          />
          <TouchableBtn
            type="grey"
            title={t("home.tournament.saveForLater")}
            style={{ width: "48%" }}
          />
        </View> */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    borderRadius: 10,
    height: 400,
  },

  border: {
    borderWidth: 1,
    borderColor: "red",
  },

  prizeBadge: {
    position: "absolute",
    padding: 10,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    right: 10,
    bottom: 10,
    opacity: 1,
  },
});

export default memo(TournamentCard);
