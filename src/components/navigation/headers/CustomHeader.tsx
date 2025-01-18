import React from "react";
import { StyleSheet } from "react-native";
import Animated, { useAnimatedStyle, interpolate, Extrapolation } from "react-native-reanimated";
import type { SharedValue } from "react-native-reanimated";
import { HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT } from "./config";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";

interface MyCustomHeaderProps {
  scrollY: SharedValue<number>;
}

const maxHeight = HEADER_MAX_HEIGHT;
const minHeight = HEADER_MIN_HEIGHT;
const Scroll_Distance = maxHeight - minHeight;

const CustomHeader: React.FC<MyCustomHeaderProps> = ({ scrollY }) => {
  const theme = useCustomTheme();

  const animatedTextStyle = useAnimatedStyle(() => {
    const fontSize = interpolate(
      scrollY.value,
      [0, Scroll_Distance],
      [24, 16],
      Extrapolation.CLAMP
    );

    const opacity = interpolate(scrollY.value, [0, Scroll_Distance], [1, 0.7], Extrapolation.CLAMP);

    return {
      fontSize,
      opacity,
    };
  });

  return (
    <Animated.Text style={[{ color: theme.colors.text }, animatedTextStyle]}>{"asd"}</Animated.Text>
  );
};

const styles = StyleSheet.create({});

export default CustomHeader;
