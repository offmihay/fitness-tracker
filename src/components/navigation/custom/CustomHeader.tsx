import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle, interpolate, Extrapolation } from "react-native-reanimated";
import type { SharedValue } from "react-native-reanimated";

import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { usePathname } from "expo-router";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT } from "../options";

interface MyCustomHeaderProps {
  scrollY: SharedValue<number>;
  name: string;
  isNameUnique?: boolean;
}

const maxHeight = HEADER_MAX_HEIGHT;
const minHeight = HEADER_MIN_HEIGHT;
const Scroll_Distance = maxHeight - minHeight;

const CustomHeader: React.FC<MyCustomHeaderProps> = ({ scrollY, name, isNameUnique }) => {
  const theme = useCustomTheme();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const animatedTextStyle = useAnimatedStyle(() => {
    const fontSize = interpolate(
      scrollY.value,
      [0, Scroll_Distance],
      [28, 16],
      Extrapolation.CLAMP
    );

    const bottom = interpolate(scrollY.value, [0, Scroll_Distance], [20, 10], Extrapolation.CLAMP);

    return {
      fontSize,
      bottom,
    };
  });

  return (
    <View style={[styles.wrapper, { borderColor: theme.colors.surfaceLight }]}>
      <View style={styles.titleContainer}>
        <Animated.Text style={[{ color: theme.colors.text }, styles.title, animatedTextStyle]}>
          {isNameUnique ? name : t(`title.${name}`)}
        </Animated.Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    width: "100%",
    borderBottomWidth: 0.5,
  },

  titleContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
  },

  title: {
    position: "absolute",
    fontWeight: 700,
    left: 0,
  },
});

export default CustomHeader;
