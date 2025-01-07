import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";

type Props = {
  onPress?: () => void;
  children: React.ReactNode;
} & React.ComponentProps<typeof TouchableOpacity>;

const ButtonInput = (props: Props) => {
  const { onPress, children, ...rest } = props;
  const theme = useCustomTheme();

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={[styles.btnWrapper, { borderColor: theme.colors.border }]}
        onPress={onPress}
        activeOpacity={0.5}
        {...rest}
      >
        {children}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btnWrapper: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: "100%",
  },

  btnContent: {
    flex: 1,
    flexDirection: "row",
    gap: 6,
    width: "100%",
    justifyContent: "center",
  },
});

export default ButtonInput;
