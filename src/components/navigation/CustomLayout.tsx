// CustomLayout.tsx
import { NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { usePathname } from "expo-router";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import type { SharedValue } from "react-native-reanimated";
import CustomHeader from "./header/CustomHeader";
import { HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT } from "./header/config";
import useScrollProps from "@/src/hooks/useScrollProps";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";

type renderContent = {
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  maxHeight: number;
};

export type LayoutProps = {
  renderContent: ({ onScroll, maxHeight }: renderContent) => React.ReactNode;
  renderHeader?: (scrollY: SharedValue<number>) => React.ReactNode;
  headerConfig?: {
    maxHeight: number;
    minHeight: number;
  };
};

const CustomLayout = (props: LayoutProps) => {
  const { renderContent, renderHeader, headerConfig } = props;

  const theme = useCustomTheme();

  const pathname = usePathname();
  console.log(pathname);

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
    <View style={styles.container}>
      {renderHeader ? (
        <Animated.View style={[styles.header, animatedHeaderStyle]}>
          {renderHeader(scrollY)}
        </Animated.View>
      ) : (
        <Animated.View style={[styles.header, animatedHeaderStyle]}>
          <CustomHeader scrollY={scrollY} />
        </Animated.View>
      )}
      {renderContent({
        onScroll: scrollHandler,
        maxHeight,
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
});

export default CustomLayout;
