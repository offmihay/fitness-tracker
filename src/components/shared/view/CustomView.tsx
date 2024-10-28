import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useCustomTheme } from "../../../hooks/useCustomTheme";

type Props = {
  children: React.ReactNode;
};

const CustomView = ({ children }: Props) => {
  const theme = useCustomTheme();
  return <View style={{ backgroundColor: theme.colors.background }}>{children}</View>;
};

export default CustomView;
