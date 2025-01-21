import { StyleSheet, View } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useTournamentByID } from "@/src/queries/tournaments";
import TournamentDetails from "@/src/components/home/TournamentDetails";
import LayoutScrollView from "@/src/components/navigation/layouts/LayoutScrollView";
import TournamentDetailsSkeleton from "@/src/components/home/skeleton/TournamentDetailsSkeleton";

type Props = {};

const TournamentDetailsScreen = ({}: Props) => {
  const { id } = useLocalSearchParams();
  const { data, isLoading, error } = useTournamentByID(id as string);

  const handleOpenRules = () => {
    router.push({
      pathname: "/home/tournament/[id]/rules",
      params: { rules: data?.rules },
    });
  };

  const handleOpenParticipants = () => {
    router.push({
      pathname: "/home/tournament/[id]/rules",
      params: {},
    });
  };

  const handleOpenOrganizer = () => {
    router.push({
      pathname: "/home/tournament/[id]/rules",
      params: {},
    });
  };

  const isLoaded = !isLoading && data;

  return (
    <LayoutScrollView name={data?.title} isNameUnique>
      <View style={styles.wrapper}>
        {isLoaded ? (
          <TournamentDetails
            data={data}
            handleOpenRules={handleOpenRules}
            handleOpenParticipants={handleOpenParticipants}
            handleOpenOrganizer={handleOpenOrganizer}
          />
        ) : (
          <TournamentDetailsSkeleton />
        )}
      </View>
    </LayoutScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});

export default TournamentDetailsScreen;
