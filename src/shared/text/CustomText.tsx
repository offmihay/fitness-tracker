import { StyleSheet, Text } from "react-native";
import React from "react";

import Animated from "react-native-reanimated";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";

type Props = {
  type?:
    | "smaller"
    | "small"
    | "predefault"
    | "default"
    | "upperdefault"
    | "title"
    | "subtitle"
    | "link";
  styling?: "link";
  weight?: "normal" | "semibold" | "bold" | "bolder";
  color?: string;
  center?: boolean;
} & React.ComponentProps<typeof Text>;

const CustomText = ({
  children,
  color,
  type = "default",
  center,
  styling,
  style,
  weight,
  ...rest
}: Props) => {
  const theme = useCustomTheme();

  const colorText = color ? color : theme.colors.text;

  return (
    <Animated.Text
      style={[
        { color: colorText },
        type === "smaller" && styles.smaller,
        type === "small" && styles.small,
        type === "predefault" && styles.predefault,
        type === "default" && styles.default,
        type === "upperdefault" && styles.upperdefault,
        type === "title" && styles.title,
        type === "subtitle" && styles.subtitle,
        type === "link" && styles.link,
        styling === "link" && { color: theme.colors.link },
        center && styles.center,
        weight === "normal" && styles.normal,
        weight === "semibold" && styles.semiBold,
        weight === "bold" && styles.bold,
        weight === "bolder" && styles.bolder,
        style,
      ]}
      {...rest}
    >
      {children}
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  smaller: {
    fontSize: 10,
    lineHeight: 12,
  },
  small: {
    fontSize: 12,
    lineHeight: 16,
  },
  predefault: {
    fontSize: 14,
    lineHeight: 20,
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  upperdefault: {
    fontSize: 18,
    lineHeight: 28,
  },
  title: {
    fontSize: 30,
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

  normal: {
    fontWeight: "400",
  },
  semiBold: {
    fontWeight: "500",
  },
  bold: {
    fontWeight: "600",
  },
  bolder: {
    fontWeight: "700",
  },
});

export default CustomText;
