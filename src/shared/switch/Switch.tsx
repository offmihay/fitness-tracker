import React from "react";
import { Switch } from "react-native-paper";

type SwitchProps = {
  toggleSwitch: (isOn: boolean) => void;
  value: boolean;
};

const CustomSwitch = ({ toggleSwitch, value }: SwitchProps) => {
  return <Switch value={value} onValueChange={toggleSwitch} />;
};

export default CustomSwitch;
