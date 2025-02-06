import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import React from "react";

type CustomIconProps = {
  color?: string;
  render: (color: string, size: number) => React.ReactNode;
};

const CustomIcon: React.FC<CustomIconProps> = ({ color, render }) => {
  const theme = useCustomTheme();

  const colorDefault = theme.colors.text;
  const size = 24;

  return render(color || colorDefault, size);
};

export default CustomIcon;
