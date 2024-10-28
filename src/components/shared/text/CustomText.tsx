import { StyleSheet, Text, TextProps, View } from "react-native";
import React from "react";
import { useCustomTheme } from "../../../hooks/useCustomTheme";

type Props = TextProps & {
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

const CustomText = ({ children, type = "default", style }: Props) => {
  const theme = useCustomTheme();
  const color = theme.colors.text;

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? { ...styles.link, color: theme.colors.primary } : undefined,
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
  },
});

export default CustomText;
