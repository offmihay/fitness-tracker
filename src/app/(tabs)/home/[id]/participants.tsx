import { StyleSheet, View } from "react-native";
import React from "react";
import LayoutScrollView from "@/src/components/navigation/layouts/LayoutScrollView";
import CustomText from "@/src/shared/text/CustomText";
import { useLocalSearchParams } from "expo-router";
import { getTournamentByID } from "@/src/queries/tournaments";

type Props = {};

const ParticipantsPage = (props: Props) => {
  const { id } = useLocalSearchParams();
  const { data } = getTournamentByID(id as string);

  return (
    <LayoutScrollView name="participants">
      <View style={styles.wrapper}>
        <CustomText>
          {data && data.participants[0] && data?.participants[0].id
            ? data?.participants[0].id
            : "noone"}
        </CustomText>
      </View>
    </LayoutScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});

export default ParticipantsPage;
