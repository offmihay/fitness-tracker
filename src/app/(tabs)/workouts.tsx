import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { useSettings } from "../../hooks/useSettings";

type Props = {};

const Workouts = ({}: Props) => {
  const { settings, updateSettings } = useSettings();

  return <View></View>;
};

export default Workouts;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    height: "100%",
  },
});
