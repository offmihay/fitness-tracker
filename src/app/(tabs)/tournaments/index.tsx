import { StyleSheet, View } from "react-native";
import React from "react";
import TouchableBtn from "@/src/components/shared/touchable/TouchableBtn";
import { router } from "expo-router";
type Props = {};

const Workouts = ({}: Props) => {
  const handleCreateTournament = () => {
    router.push({
      pathname: "/tournaments/create",
    });
  };

  return (
    <View style={styles.wrapper}>
      <TouchableBtn title="Create tournament" onPress={handleCreateTournament} />
    </View>
  );
};

export default Workouts;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});
