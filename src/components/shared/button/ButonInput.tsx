import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";

type Props = {
  onPress: () => void;
  children: React.ReactNode;
};

const ButtonInput = (props: Props) => {
  const { onPress, children } = props;
  const theme = useCustomTheme();

  return (
    <TouchableOpacity
      style={[styles.btnChoose, { borderColor: theme.colors.border }]}
      onPress={onPress}
      activeOpacity={0.5}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnChoose: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: 160,
  },
});

export default ButtonInput;
