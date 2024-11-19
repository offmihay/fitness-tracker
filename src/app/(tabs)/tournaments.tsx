import { StyleSheet, View } from "react-native";
import React from "react";
type Props = {};

const Workouts = ({}: Props) => {
  return (
    <>
      <View style={styles.wrapper}></View>
    </>
  );
};

export default Workouts;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
