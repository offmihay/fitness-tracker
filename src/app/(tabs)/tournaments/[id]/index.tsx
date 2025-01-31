import { StyleSheet, View } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { getTournamentByID } from "@/src/queries/tournaments";
import TournamentDetails from "@/src/components/home/tournament [id]/TournamentDetails";
import LayoutScrollView from "@/src/components/navigation/layouts/LayoutScrollView";
import TournamentDetailsSkeleton from "@/src/components/home/skeleton/TournamentDetailsSkeleton";

type Props = {};

const TournamentDetailsScreen = ({}: Props) => {
  const { id } = useLocalSearchParams();
  const { data, isLoading, error } = getTournamentByID(id as string);

  const handleOpenRules = () => {
    router.push(
      {
        pathname: "./rules",
        params: { rules: data?.rules },
      },
      { relativeToDirectory: true }
    );
  };

  const handleOpenParticipants = () => {
    router.push(
      {
        pathname: "./rules",
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

  const isLoaded = !isLoading && data;

  return (
    <LayoutScrollView name={data?.title} isNameUnique scrollEnabled={!!isLoaded}>
      <View style={styles.wrapper}>
        {isLoaded ? (
          <TournamentDetails
            isRegistred={true}
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
    paddingTop: 20,
    paddingBottom: 40,
  },
});

export default TournamentDetailsScreen;
