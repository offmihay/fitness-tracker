import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Switch } from "react-native-paper";

type SwitchProps = {
  toggleSwitch: (isOn: boolean) => void;
};

const CustomSwitch = ({ toggleSwitch }: SwitchProps) => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => {
    toggleSwitch(!isSwitchOn);
    setIsSwitchOn(!isSwitchOn);
  };

  return <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />;
};

export default CustomSwitch;

const styles = StyleSheet.create({});
