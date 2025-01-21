import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import { Ionicons, FontAwesome6, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { TournamentRequest } from "@/src/types/tournament";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { useTranslation } from "react-i18next";
import FastImage from "@d11/react-native-fast-image";
import ButtonDefault from "@/src/shared/button/ButtonDefault";
import CustomMap from "@/src/shared/map/CustomMap";
import CustomText from "@/src/shared/text/CustomText";
import PagerView from "react-native-pager-view";
import Skeleton from "@/src/shared/skeleton/Skeleton";
import CustomArrow from "@/src/shared/button/arrow/CustomArrow";

type Props = {
  data: TournamentRequest;
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
  const { t } = useTranslation("");

  const ref = useRef<PagerView>(null);
  const [currIndex, setCurrIndex] = useState(0);

  const handleImageScroll = (dir: "left" | "right") => {
    switch (dir) {
      case "left": {
        setCurrIndex((prev) => {
          if (prev > 0) {
            ref.current?.setPage(prev - 1);
            return prev - 1;
          } else {
            return prev;
          }
        });
        break;
      }
      case "right": {
        setCurrIndex((prev) => {
          if (prev < data.images.length - 1) {
            ref.current?.setPage(prev + 1);
            return prev + 1;
          } else {
            return prev;
          }
        });
        break;
      }
    }
  };
  const disabledArrowLeft = currIndex === 0;

  const [imagesWithStatus, setImagesWithStatus] = useState<
    (TournamentRequest["images"][number] & { isLoaded?: boolean })[]
  >(data.images);

  const handleSetImageStatus = ({
    image,
    key,
    isLoaded,
  }: {
    image: TournamentRequest["images"][number];
    key: number;
    isLoaded: boolean;
  }) => {
    const updatedImage = { ...image, isLoaded };
    setImagesWithStatus((prev) => {
      const newImages = [...prev];
      newImages[key] = updatedImage;
      return newImages;
    });
  };

  return (
    <View className="flex flex-col gap-6">
      <View style={styles.imgWrapper}>
        <PagerView
          style={{ flex: 1 }}
          initialPage={currIndex}
          ref={ref}
          scrollEnabled={true}
          onPageSelected={(e) => setCurrIndex(e.nativeEvent.position)}
        >
          {imagesWithStatus.map((img, index) => {
            return (
              <View key={index} style={{ flex: 1 }}>
                <Skeleton height={250} visible={imagesWithStatus[index].isLoaded} />
                <FastImage
                  source={{ uri: img.secureUrl }}
                  style={StyleSheet.absoluteFill}
                  onLoadStart={() =>
                    handleSetImageStatus({ image: img, key: index, isLoaded: false })
                  }
                  onLoadEnd={() => handleSetImageStatus({ image: img, key: index, isLoaded: true })}
                />
              </View>
            );
          })}
        </PagerView>
        <CustomArrow
          dir="left"
          onPress={() => handleImageScroll("left")}
          isDisabled={currIndex === 0}
        />
        <CustomArrow
          dir="right"
          onPress={() => handleImageScroll("right")}
          isDisabled={currIndex === imagesWithStatus.length - 1}
        />
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
              <CustomText weight="bold">{t("tournament.sportType.title")}: </CustomText>
              {data?.sportType}
            </CustomText>
          </View>
          {/* <View className="flex flex-row gap-4 items-center">
            <Ionicons name="information-circle" size={24} color={theme.colors.primary} />
            <CustomText>
              <CustomText weight="bold">{t("home.tournament.format")}: </CustomText>
              {data?.format}
            </CustomText>
          </View> */}
          <View className="flex flex-row gap-4 items-center">
            <MaterialIcons name="fitness-center" size={24} color={theme.colors.primary} />
            <CustomText>
              <CustomText weight="bold">{t("tournament.skillLevel.title")}: </CustomText>
              {data?.skillLevel}
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
