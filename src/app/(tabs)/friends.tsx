import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedText } from "../../components/ThemedText";

type friendsProps = {};

const friends = ({}: friendsProps) => {
  return (
    <View>
      <ThemedText>friends</ThemedText>
    </View>
  );
};

export default friends;

const styles = StyleSheet.create({});
