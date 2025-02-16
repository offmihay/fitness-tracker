import { StyleSheet, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import LayoutScrollView from "@/src/components/navigation/layouts/LayoutScrollView";
import CustomText from "@/src/shared/text/CustomText";
import { getTournamentByID } from "@/src/queries/tournaments";

type Props = {};

const RulesPage = ({}: Props) => {
  const { id } = useLocalSearchParams();
  const { data } = getTournamentByID(id as string);

  return (
    <LayoutScrollView name="rules">
      <View style={styles.wrapper}>
        <CustomText>{data?.rules ?? "No rules was provided"}</CustomText>
      </View>
    </LayoutScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default RulesPage;
