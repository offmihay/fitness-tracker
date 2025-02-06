import { StyleSheet, View } from "react-native";
import React from "react";
import CustomText from "@/src/shared/text/CustomText";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { TournamentSport } from "@/src/types/types";
import { FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

type Props = {
  type?: TournamentSport;
};

const SportLabel = (props: Props) => {
  const theme = useCustomTheme();
  const { t } = useTranslation();
  const { type } = props;

  switch (type) {
    case TournamentSport.TABLE_TENNIS:
      return (
        <View className="flex flex-row">
          <View style={[styles.wrapper, { backgroundColor: theme.colors.primary }]}>
            <FontAwesome5 name="table-tennis" size={16} color="white" />
            <CustomText type="predefault" numberOfLines={1}>
              {t(`tournament.sportType.${type}`)}
            </CustomText>
          </View>
        </View>
      );
    case TournamentSport.BADMINTON:
      return (
        <View className="flex flex-row">
          <View style={[styles.wrapper, { backgroundColor: theme.colors.secondary }]}>
            <MaterialCommunityIcons name="badminton" size={16} color="white" />
            <CustomText type="predefault" numberOfLines={1}>
              {t(`tournament.sportType.${type}`)}
            </CustomText>
          </View>
        </View>
      );
    case TournamentSport.SQUASH:
      return (
        <View className="flex flex-row">
          <View style={[styles.wrapper, { backgroundColor: theme.colors.info }]}>
            <Ionicons name="tennisball" size={16} color="white" />
            <CustomText type="predefault" numberOfLines={1}>
              {t(`tournament.sportType.${type}`)}
            </CustomText>
          </View>
        </View>
      );
    case TournamentSport.TENNIS:
      return (
        <View className="flex flex-row">
          <View style={[styles.wrapper, { backgroundColor: theme.colors.notification }]}>
            <MaterialIcons name="sports-tennis" size={16} color="white" />
            <CustomText type="predefault" numberOfLines={1}>
              {t(`tournament.sportType.${type}`)}
            </CustomText>
          </View>
        </View>
      );
  }
};

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    maxHeight: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
  },
});

export default SportLabel;
