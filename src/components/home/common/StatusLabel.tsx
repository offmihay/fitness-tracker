import { StyleSheet, View } from "react-native";
import React from "react";
import CustomText from "@/src/shared/text/CustomText";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { TournamentBase, TournamentSport, TournamentStatus } from "@/src/types/tournament";
import {
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import CustomLabel from "./CustomLabel";

type Props = {
  data: TournamentBase;
};

const StatusLabel = ({ data }: Props) => {
  const theme = useCustomTheme();
  const { t } = useTranslation();
  const { status, isActive, isApproved } = data;
  const type = !isActive ? "DEACTIVATED" : !isApproved ? "ONAPPROVAL" : status;

  switch (type) {
    case TournamentStatus.UPCOMING:
      return (
        <CustomLabel
          value={t(`tournament.status.${type}`)}
          icon={<FontAwesome name="circle" size={8} color={theme.colors.info} />}
          color={theme.colors.surface}
          style={{ paddingHorizontal: 2 }}
          textColor={theme.colors.text}
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
    case "ONAPPROVAL":
      return (
        <CustomLabel
          value={`${t(`tournament.status.${type}`)}..`}
          icon={<FontAwesome6 name="clock" size={16} color="white" />}
          color={theme.colors.surfaceLight}
        />
      );
  }
};

export default StatusLabel;
