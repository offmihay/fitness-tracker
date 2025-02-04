import { StyleSheet, View } from "react-native";
import React from "react";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { UserTournamentCard_HEIGHT } from "../UserTournamentCard";
import Skeleton from "@/src/shared/skeleton/Skeleton";

type Props = {};

const TournamentSkeleton = (props: Props) => {
  const theme = useCustomTheme();
  return (
    <View style={[styles.wrapper, { backgroundColor: theme.colors.surface }]}>
      <View className="flex gap-4">
        <Skeleton height={25} width={150} />
        <Skeleton height={60} width={80} />
        <View className="flex flex-row gap-4">
          <Skeleton height={25} width={250} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 10,
    height: UserTournamentCard_HEIGHT,
    paddingHorizontal: 10,
    paddingTop: 15,
  },
});

export default TournamentSkeleton;
