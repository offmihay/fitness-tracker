import { StyleSheet, View, ViewStyle } from "react-native";
import React from "react";
import ShimmerPlaceHolder, { ShimmerPlaceholderProps } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";

type Props = {
  height?: number;
  width?: number;
  wrapperStyle?: ViewStyle;
} & ShimmerPlaceholderProps;

const Skeleton = (props: Props) => {
  const { height, width, children, wrapperStyle, ...rest } = props;

  const theme = useCustomTheme();

  const shimmerColors = theme.dark
    ? ["#2e2e2e", "#373737", "#2e2e2e"]
    : ["#e7e7e7", "#f1f1f1", "#e7e7e7"];
  return (
    <View style={[styles.wrapper, { width }, wrapperStyle]}>
      <ShimmerPlaceHolder
        LinearGradient={LinearGradient}
        width={400}
        height={height || "100%"}
        {...rest}
        shimmerColors={shimmerColors}
      >
        {children}
      </ShimmerPlaceHolder>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    overflow: "hidden",
    borderRadius: 5,
  },
});

export default Skeleton;
