import { StyleSheet, View } from "react-native";
import React from "react";
import CustomText from "@/src/shared/text/CustomText";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { TournamentSport } from "@/src/types/types";
import { FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import CustomLabel from "./CustomLabel";

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
        <CustomLabel
          value={t(`tournament.sportType.${type}`)}
          icon={<FontAwesome5 name="table-tennis" size={16} color="white" />}
          color={theme.colors.secondary}
        />
      );
    case TournamentSport.BADMINTON:
      return (
        <CustomLabel
          value={t(`tournament.sportType.${type}`)}
          icon={<MaterialCommunityIcons name="badminton" size={16} color="white" />}
          color={theme.colors.info}
        />
      );
    case TournamentSport.SQUASH:
      return (
        <CustomLabel
          value={t(`tournament.sportType.${type}`)}
          icon={<Ionicons name="tennisball" size={16} color="white" />}
          color={theme.colors.primaryLight}
        />
      );
    case TournamentSport.TENNIS:
      return (
        <CustomLabel
          value={t(`tournament.sportType.${type}`)}
          icon={<MaterialIcons name="sports-tennis" size={16} color="white" />}
          color={theme.colors.notification}
        />
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
