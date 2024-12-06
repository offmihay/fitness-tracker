import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import CustomText from "../shared/text/CustomText";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import TouchableBtn from "../shared/touchable/TouchableBtn";
import { useTranslation } from "react-i18next";

type Props = {
  title: string;
  imageSource: string;
  location: string;
  dateTime: string;
  patricipants: string;
  prizePool: string;
  handleRegister: () => void;
  handleOpenDetails: () => void;
};

const TournamentCard = ({
  title,
  location,
  dateTime,
  patricipants,
  prizePool,
  imageSource,
  handleRegister,
  handleOpenDetails,
}: Props) => {
  const theme = useCustomTheme();
  const { t } = useTranslation();

  const [height, setHeight] = useState(40);
  const [hasMultilineText, setHasMultilineText] = useState(false);

  const handleTextLayout = useCallback(
    (event: any) => {
      const { lines } = event.nativeEvent;
      if (lines.length > 1 && !hasMultilineText) {
        setHasMultilineText(true);
      }
    },
    [hasMultilineText]
  );

  useEffect(() => {
    setHeight(hasMultilineText ? 40 : 30);
  }, [hasMultilineText]);

  return (
    <TouchableOpacity onPress={handleOpenDetails} activeOpacity={0.8}>
      <View style={[{ backgroundColor: theme.colors.surface }, styles.wrapper]}>
        <View
          style={{ width: "100%", height: 170, borderRadius: 10, overflow: "hidden" }}
          className="mb-4"
        >
          <Image source={imageSource} style={{ width: "100%", height: "100%" }}></Image>
        </View>
        <CustomText type="subtitle">{title}</CustomText>
        <View className="flex flex-row mt-4">
          <View style={{ width: "65%" }}>
            <View className="flex flex-col pr-1 gap-1">
              <View className="flex flex-row gap-2 items-center" style={{ height }}>
                <View style={{ width: 25 }}>
                  <FontAwesome6 name="location-dot" size={20} color={theme.colors.text} />
                </View>
                <CustomText
                  type="predefault"
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={{ maxWidth: 175 }}
                  onTextLayout={handleTextLayout}
                >
                  {location}
                </CustomText>
              </View>
              <View className="flex flex-row gap-2 items-center" style={{ height }}>
                <View style={{ width: 25 }}>
                  <Feather name="calendar" size={20} color={theme.colors.text} />
                </View>
                <CustomText
                  type="predefault"
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={{ maxWidth: 175 }}
                  onTextLayout={handleTextLayout}
                >
                  {dateTime}
                </CustomText>
              </View>
            </View>
          </View>
          <View style={{ width: "35%" }}>
            <View className="flex flex-col pl-1 gap-1">
              <View className="flex flex-row gap-2 items-center" style={{ height }}>
                <View style={{ width: 25 }}>
                  <Ionicons name="person" size={20} color={theme.colors.text} />
                </View>
                <CustomText
                  type="predefault"
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={{ maxWidth: 90 }}
                  onTextLayout={handleTextLayout}
                >
                  {patricipants}
                </CustomText>
              </View>
              <View className="flex flex-row gap-2 items-center" style={{ height }}>
                <View style={{ width: 25 }}>
                  <FontAwesome6 name="money-check" size={20} color={theme.colors.text} />
                </View>
                <CustomText
                  type="predefault"
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={{ maxWidth: 90 }}
                  onTextLayout={handleTextLayout}
                >
                  {prizePool}
                </CustomText>
              </View>
            </View>
          </View>
        </View>
        <TouchableBtn
          onPress={handleRegister}
          title={t("index.register")}
          nodeLeft={(color) => <></>}
          type="grey"
          className="mt-4"
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    borderRadius: 10,
  },

  border: {
    borderWidth: 1,
    borderColor: "red",
  },
});

export default TournamentCard;
