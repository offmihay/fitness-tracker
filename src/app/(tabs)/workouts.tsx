import { Appearance, Button, StyleSheet, Text, useColorScheme, View } from "react-native";
import React from "react";
import { useSettings } from "../../hooks/useSettings";

type Props = {};

const Workouts = ({}: Props) => {
  const { settings, updateSettings } = useSettings();

  return (
    <View>
      <Text>workouts</Text>
      <Button title="Dark" onPress={() => updateSettings({ theme: "dark" })} />
      <Button title="Light" onPress={() => updateSettings({ theme: "light" })} />
      <Button title="System" onPress={() => updateSettings({ theme: null })} />
    </View>
  );
};

export default Workouts;

const styles = StyleSheet.create({});
