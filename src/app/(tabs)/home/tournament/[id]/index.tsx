import { StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import CustomText from "@/src/components/shared/text/CustomText";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useTournamentByID } from "@/src/queries/tournaments";
import { ScrollView } from "react-native-gesture-handler";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import TournamentDetails from "@/src/components/home/TournamentDetails";
import LayoutScrollView from "@/src/components/navigation/layouts/LayoutScrollView";

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

  return (
    <LayoutScrollView name={data?.title || "Tournament"} isNameUnique>
      <View style={styles.wrapper}>
        {!isLoading && data && (
          <TournamentDetails
            data={data}
            handleOpenRules={handleOpenRules}
            handleOpenParticipants={handleOpenParticipants}
            handleOpenOrganizer={handleOpenOrganizer}
          />
        )}
        {isLoading && <CustomText>loading...</CustomText>}
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
