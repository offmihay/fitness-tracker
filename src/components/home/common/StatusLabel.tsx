import { StyleSheet, View } from "react-native";
import React from "react";
import CustomText from "@/src/shared/text/CustomText";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { TournamentSport, TournamentStatus } from "@/src/types/tournament";
import {
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import CustomLabel from "./CustomLabel";

type Props = {
  type?: TournamentStatus | "DEACTIVATED";
};

const StatusLabel = (props: Props) => {
  const theme = useCustomTheme();
  const { t } = useTranslation();
  const { type } = props;

  switch (type) {
    case TournamentStatus.UPCOMING:
      return (
        <CustomLabel
          value={t(`tournament.status.${type}`)}
          icon={<FontAwesome name="circle" size={8} color={theme.colors.info} />}
          color={theme.colors.surface}
          style={{ paddingHorizontal: 2 }}
        />
      );
    case TournamentStatus.ONGOING:
      return (
        <CustomLabel
          value={t(`tournament.status.${type}`)}
          icon={<MaterialCommunityIcons name="badminton" size={16} color="white" />}
          color={theme.colors.success}
        />
      );
    case TournamentStatus.FINISHED:
      return (
        <CustomLabel
          value={t(`tournament.status.${type}`)}
          icon={<Ionicons name="tennisball" size={16} color="white" />}
          color={theme.colors.surfaceLight}
        />
      );
    case "DEACTIVATED":
      return (
        <CustomLabel
          value={t(`tournament.status.${type}`)}
          icon={<MaterialIcons name="sports-tennis" size={16} color="white" />}
          color="#ff4b4b"
        />
      );
  }
};

export default StatusLabel;
