import { StyleSheet, Text, TextProps, View } from "react-native";
import React from "react";
import { useCustomTheme } from "../../../hooks/useCustomTheme";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

type Props = {
  type?: "predefault" | "default" | "upperdefault" | "title" | "subtitle" | "link";
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
  // if (children === "Football") {
  //   console.log(theme);
  // }

  return (
    <Animated.Text
      style={[
        { color: colorText },
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
