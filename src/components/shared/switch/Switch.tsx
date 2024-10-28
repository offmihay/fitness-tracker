import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Switch } from "react-native-paper";

type SwitchProps = {
  toggleSwitch: (isOn: boolean) => void;
  defaultValue: boolean;
};

const CustomSwitch = ({ toggleSwitch, defaultValue = false }: SwitchProps) => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(defaultValue);

  const onToggleSwitch = () => {
    toggleSwitch(!isSwitchOn);
    setIsSwitchOn(!isSwitchOn);
  };

  return <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />;
};

export default CustomSwitch;

const styles = StyleSheet.create({});
