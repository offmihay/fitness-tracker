import { StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import CustomText from "@/src/components/shared/text/CustomText";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useTournamentQuery } from "@/src/queries/tournaments";
import { ScrollView } from "react-native-gesture-handler";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import TournamentDetails from "@/src/components/home/TournamentDetails";

type Props = {};

const TournamentDetailsScreen = ({}: Props) => {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const { data, isLoading } = useTournamentQuery(id as string);

  useEffect(() => {
    if (data?.title) {
      navigation.setOptions({ headerTitle: data.title });
    }
  }, [data?.title, navigation]);

  const handleOpenRules = () => {
    router.push({
      pathname: "/home/tournament/[id]/rules",
      params: { rules: data?.rules },
    });
  };

  const handleOpenParticipants = () => {
    router.push({
      pathname: "/home/tournament/[id]/participants",
      params: {},
    });
  };

  const handleOpenOrganizer = () => {
    router.push({
      pathname: "/home/tournament/[id]/opganizer",
      params: {},
    });
  };

  return (
    <ScrollView style={{ height: "100%" }}>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});

export default TournamentDetailsScreen;
