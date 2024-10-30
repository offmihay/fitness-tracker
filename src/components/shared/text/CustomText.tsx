import { StyleSheet, Text, TextProps, View } from "react-native";
import React from "react";
import { useCustomTheme } from "../../../hooks/useCustomTheme";

type Props = TextProps & {
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
  color?: string;
};

const CustomText = ({ children, color, type = "default", style }: Props) => {
  const theme = useCustomTheme();
  const colorText = color ? color : theme.colors.text;

  return (
    <Text
      style={[
        { color: colorText },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? { ...styles.link } : undefined,
        style,
      ]}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
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
});

export default CustomText;
