import { StyleSheet, Text, TextProps, View } from "react-native";
import React from "react";
import { useCustomTheme } from "../../../hooks/useCustomTheme";

type Props = {
  type?: "predefault" | "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
  color?: string;
  center?: boolean;
} & React.ComponentProps<typeof Text>;

const CustomText = ({ children, color, type = "default", center, style, ...rest }: Props) => {
  const theme = useCustomTheme();
  const colorText = color ? color : theme.colors.text;

  return (
    <Text
      style={[
        { color: colorText },
        type === "predefault" ? styles.predefault : undefined,
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? { ...styles.link } : undefined,
        center ? styles.center : undefined,
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  predefault: {
    fontSize: 14,
    lineHeight: 20,
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    textDecorationLine: "underline",
  },

  center: {
    textAlign: "center",
  },
});

export default CustomText;
