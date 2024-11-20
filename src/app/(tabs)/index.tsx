import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import testData from "../../../assets/testData.json";

import { useCustomTheme } from "../../hooks/useCustomTheme";
import TournamentItem from "@/src/components/index/TournamentItem";
type HomePageProps = {};

const HomePage = ({}: HomePageProps) => {
  const theme = useCustomTheme();

  const data = testData;

  return (
    <View>
      <TournamentItem />
      <TournamentItem />
      <TournamentItem />
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({});
