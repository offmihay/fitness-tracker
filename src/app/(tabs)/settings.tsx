import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedText } from "../../components/ThemedText";

type settingsProps = {};

const settings = ({}: settingsProps) => {
  return (
    <View>
      <ThemedText>settings</ThemedText>
    </View>
  );
};

export default settings;

const styles = StyleSheet.create({});
