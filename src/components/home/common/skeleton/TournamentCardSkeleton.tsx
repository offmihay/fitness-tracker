import { StyleSheet, View } from "react-native";
import React, { memo } from "react";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";

import Skeleton from "@/src/shared/skeleton/Skeleton";
import { CARD_HEIGHT } from "../TournamentCard";

const TournamentCardSkeleton = () => {
  const theme = useCustomTheme();

  return (
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
        <Skeleton height={190} />
      </View>
      <View className="mt-2 mb-6">
        <Skeleton height={25} width={200} />
      </View>
      <View className="flex gap-4">
        <Skeleton height={25} width={100} />
        <Skeleton height={25} width={140} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    borderRadius: 10,
    height: CARD_HEIGHT,
  },
});

export default memo(TournamentCardSkeleton);
