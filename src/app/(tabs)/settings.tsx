import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedText } from "../../components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";

type settingsProps = {};

const settings = ({}: settingsProps) => {
  return (
    <SafeAreaView>
      <ThemedText>settingss</ThemedText>
    </SafeAreaView>
  );
};

export default settings;

const styles = StyleSheet.create({});
