import { StyleSheet } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";

type CustomPickerItemProps = {} & React.ComponentProps<typeof Picker.Item>;

const CustomPickerItem = ({ ...rest }: CustomPickerItemProps) => {
  return <Picker.Item {...rest} />;
};

export default CustomPickerItem;

const styles = StyleSheet.create({});
