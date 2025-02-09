import { StyleSheet, View } from "react-native";
import React, { memo, useState } from "react";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { Tournament } from "@/src/types/types";
import Skeleton from "@/src/shared/skeleton/Skeleton";

type Props = {
  data: Tournament["participants"][number];
};

const ParticipantCardSkeleton = ({ data }: Props) => {
  const theme = useCustomTheme();

  return (
    <View style={[{ backgroundColor: theme.colors.surface }, styles.wrapper]}>
      <Skeleton height={50} width={50} />
      <Skeleton height={25} width={[120, 150, 200][Math.floor(Math.random() * 3)]} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    height: 70,
    display: "flex",
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
});

export default memo(ParticipantCardSkeleton);
