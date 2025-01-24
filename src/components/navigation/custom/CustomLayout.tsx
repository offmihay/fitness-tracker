import { NativeScrollEvent, NativeSyntheticEvent, StatusBar, StyleSheet, View } from "react-native";
import React from "react";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import type { SharedValue } from "react-native-reanimated";
import CustomHeader from "./CustomHeader";

import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT } from "../options";

type renderContent = {
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  maxHeight: number;
};

export type LayoutProps = {
  renderContent: ({ onScroll, maxHeight }: renderContent) => React.ReactNode;
  renderHeader?: (scrollY: SharedValue<number>, title?: string) => React.ReactNode;
  headerConfig?: {
    maxHeight: number;
    minHeight: number;
  };
  disableHeader?: boolean;
  name?: string;
  isNameUnique?: boolean;
};

const CustomLayout = (props: LayoutProps) => {
  const { renderContent, renderHeader, headerConfig, disableHeader, name, isNameUnique } = props;

  const theme = useCustomTheme();

  const maxHeight = headerConfig?.maxHeight || HEADER_MAX_HEIGHT;
  const minHeight = headerConfig?.minHeight || HEADER_MIN_HEIGHT;
  const Scroll_Distance = maxHeight - minHeight;

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event: any) => {
    scrollY.value = event.contentOffset.y;
  });

  const animatedHeaderStyle = useAnimatedStyle(() => {
    const height = interpolate(scrollY.value, [0, Scroll_Distance], [maxHeight, minHeight], {
      extrapolateLeft: Extrapolation.CLAMP,
      extrapolateRight: Extrapolation.CLAMP,
    });

    const backgroundColor = interpolateColor(
      scrollY.value,
      [0, Scroll_Distance],
      [theme.colors.background, theme.colors.surface]
    );

    return {
      height,
      backgroundColor,
    };
  });

  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle={theme.dark ? "light-content" : "dark-content"}
      />
      <View style={styles.container}>
        {renderHeader && !disableHeader && (
          <Animated.View style={[styles.header, animatedHeaderStyle]}>
            {renderHeader(scrollY, name)}
          </Animated.View>
        )}
        {!renderHeader && !disableHeader && (
          <Animated.View style={[styles.header, animatedHeaderStyle]}>
            <CustomHeader scrollY={scrollY} name={name} isNameUnique={isNameUnique} />
          </Animated.View>
        )}
        {renderContent({
          onScroll: scrollHandler,
          maxHeight: !disableHeader ? maxHeight : 0,
        })}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 90,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
});

export default CustomLayout;
