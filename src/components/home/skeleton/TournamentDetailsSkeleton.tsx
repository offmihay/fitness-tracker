import { StyleSheet, View } from "react-native";
import React from "react";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { useTranslation } from "react-i18next";
import CustomText from "@/src/shared/text/CustomText";
import Skeleton from "@/src/shared/skeleton/Skeleton";

type Props = {};

const TournamentDetailsSkeleton = ({}: Props) => {
  const theme = useCustomTheme();
  const { t } = useTranslation("");
  return (
    <View className="flex flex-col gap-6">
      <View style={{ width: "100%", borderRadius: 10, height: 250, overflow: "hidden" }}>
        <Skeleton height={250} />
      </View>
      <View className="flex flex-row justify-between">
        <View style={{ width: "48%", position: "relative" }}>
          <Skeleton height={50} wrapperStyle={{ borderRadius: 10 }} />
          <View className="absolute flex w-full h-full justify-center items-center">
            <CustomText color={theme.colors.textTertiary} style={{ fontWeight: 700 }}>
              {t("home.tournament.register")}
            </CustomText>
          </View>
        </View>
        <View style={{ width: "48%", position: "relative" }}>
          <Skeleton height={50} wrapperStyle={{ borderRadius: 10 }} />
          <View className="absolute flex w-full h-full justify-center items-center">
            <CustomText color={theme.colors.textTertiary} style={{ fontWeight: 700 }}>
              {t("home.tournament.saveForLater")}
            </CustomText>
          </View>
        </View>
      </View>
      <View className="flex gap-4">
        <Skeleton height={25} width={200} />
        <Skeleton height={25} width={250} />
        <Skeleton height={25} width={150} />
      </View>
      {/* <View className="flex flex-row justify-around">
        <View className="flex flex-col items-center gap-2">
          <TouchableOpacity style={[styles.btn]} activeOpacity={0.8}>
            <Skeleton height={60} width={60} />
          </TouchableOpacity>
        </View>
        <View className="flex flex-col items-center gap-2">
          <TouchableOpacity style={[styles.btn]} activeOpacity={0.8}>
            <Skeleton height={60} width={60} />
          </TouchableOpacity>
        </View>
        <View className="flex flex-col items-center gap-2">
          <TouchableOpacity style={[styles.btn]} activeOpacity={0.8}>
            <Skeleton height={60} width={60} />
          </TouchableOpacity>
        </View>
      </View> */}
      <View className="flex gap-4 mt-2">
        <Skeleton height={25} width={300} />
        <Skeleton height={25} width={250} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: 60,
    height: 60,
    borderRadius: 3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default TournamentDetailsSkeleton;
