import { Picker } from "@react-native-picker/picker";
import React from "react";
import { useCustomTheme } from "../../../hooks/useCustomTheme";

type CustomPickerProps = {
  children: React.ReactNode;
} & React.ComponentProps<typeof Picker>;

const CustomPicker = ({ children, ...rest }: CustomPickerProps) => {
  const theme = useCustomTheme();

  return (
    <Picker
      itemStyle={{
        color: theme.colors.text,
      }}
      {...rest}
    >
      {children}
    </Picker>
  );
};

export default CustomPicker;
