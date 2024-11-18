import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { useCustomTheme } from "../../hooks/useCustomTheme";
type HomePageProps = {};

const HomePage = ({}: HomePageProps) => {
  const theme = useCustomTheme();

  return <SafeAreaView></SafeAreaView>;
};

export default HomePage;

const styles = StyleSheet.create({});
