import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import React from "react";
import { View, StyleSheet } from "react-native";

type CustomIconProps = {
  render: (color: string, size: number) => React.ReactNode;
};

const CustomIcon: React.FC<CustomIconProps> = ({ render }) => {
  const theme = useCustomTheme();

  const color = theme.colors.text;
  const size = 24;

  return render(color, size);
};

export default CustomIcon;
