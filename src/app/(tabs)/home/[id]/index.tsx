import { StyleSheet, View } from "react-native";
import React, { useCallback } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { getTournamentByID, registerTournament } from "@/src/queries/tournaments";
import TournamentDetails from "@/src/components/home/common/TournamentDetails";
import LayoutScrollView from "@/src/components/navigation/layouts/LayoutScrollView";
import TournamentDetailsSkeleton from "@/src/components/home/common/skeleton/TournamentDetailsSkeleton";
import SportLabel from "@/src/components/home/common/SportLabel";

const TournamentDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const { data, isLoading, error } = getTournamentByID(id as string);

  const handleOpenRules = () => {
    router.push(
      {
        pathname: "./rules",
      },
      { relativeToDirectory: true }
    );
  };

  const handleOpenParticipants = () => {
    router.push(
      {
        pathname: "./participants",
        params: {},
      },
      { relativeToDirectory: true }
    );
  };

  const handleOpenOrganizer = () => {
    router.push(
      {
        pathname: "./rules",
        params: {},
      },
      { relativeToDirectory: true }
    );
  };

  const handleRegister = useCallback(() => {
    router.push({
      pathname: "/register",
      params: { id },
    });
  }, []);

  const isLoaded = !isLoading && data;

  return (
    <LayoutScrollView name={data?.title} isNameUnique scrollEnabled={!!isLoaded}>
      <View style={styles.wrapper}>
        {isLoaded ? (
          <TournamentDetails
            isRegistred={false}
            data={data}
            handleOpenRules={handleOpenRules}
            handleOpenParticipants={handleOpenParticipants}
            handleOpenOrganizer={handleOpenOrganizer}
            handleRegister={handleRegister}
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
    paddingTop: 20,
    paddingBottom: 40,
  },
});

export default TournamentDetailsScreen;
