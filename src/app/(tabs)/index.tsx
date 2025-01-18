import CustomText from "@/src/components/shared/text/CustomText";
import { Redirect, Stack } from "expo-router";
import React from "react";
import { View } from "react-native";

const MainScreen = () => {
  return <Redirect href="/(tabs)/home" />;
};

export default MainScreen;
