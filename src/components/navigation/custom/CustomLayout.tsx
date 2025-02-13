import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  StatusBar,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
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
import { HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT, modalRoutes } from "../options";
import { usePathname } from "expo-router";
import toastConfig from "@/src/shared/toast/toastConfig";
import Toast from "react-native-toast-message";
import LoadingModal from "@/src/shared/modal/LoadingModal";

type renderContent = {
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  maxHeight: number;
};

export type LayoutProps = {
  renderContent: ({ onScroll, maxHeight }: renderContent) => React.ReactNode;
  renderHeader?: (scrollY: SharedValue<number>, title?: string) => React.ReactNode;
  headerConfig?: Partial<{
    maxHeight: number;
    minHeight: number;
    nodeHeader: () => React.ReactNode;
    disableSafeInsets: boolean;
  }>;
  disableHeader?: boolean;
  name?: string;
  isNameUnique?: boolean;
  isDefaultCompressed?: boolean;
  canGoBack?: boolean;
  disableTabBarInset?: boolean;
  contentStyle?: ViewStyle;
  loaderEnabled?: boolean;
};

const CustomLayout = (props: LayoutProps) => {
  const {
    renderContent,
    renderHeader,
    headerConfig,
    disableHeader,
    name,
    isNameUnique,
    isDefaultCompressed,
    canGoBack,
    disableTabBarInset,
    contentStyle,
    loaderEnabled,
  } = props;

  const theme = useCustomTheme();

  const pathName = usePathname();
  const isModal = modalRoutes.includes(pathName);
  const toastTopOffset = Platform.OS === "android" ? 20 : 15;

  const maxHeight = headerConfig?.maxHeight || HEADER_MAX_HEIGHT;
  const minHeight = headerConfig?.minHeight || HEADER_MIN_HEIGHT;
  const Scroll_Distance = maxHeight - minHeight;

  const scrollY = useSharedValue(isDefaultCompressed ? 100 : 0);

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
      <View
        style={[
          styles.container,
          { paddingBottom: disableTabBarInset ? 0 : Platform.OS === "android" ? 70 : 90 },
        ]}
      >
        {renderHeader && !disableHeader && (
          <Animated.View style={[styles.header, animatedHeaderStyle]}>
            {renderHeader(scrollY, name)}
          </Animated.View>
        )}
        {!renderHeader && !disableHeader && (
          <Animated.View style={[styles.header, animatedHeaderStyle]}>
            <CustomHeader
              scrollY={scrollY}
              name={name}
              isNameUnique={isNameUnique}
              node={headerConfig?.nodeHeader}
              canGoBack={canGoBack}
              disableSafeInsets={headerConfig?.disableSafeInsets}
            />
          </Animated.View>
        )}
        <View style={[{ flex: 1 }, contentStyle]}>
          {renderContent({
            onScroll: scrollHandler,
            maxHeight: !disableHeader ? (isDefaultCompressed ? minHeight : maxHeight) : 0,
          })}
        </View>
        <LoadingModal isVisible={loaderEnabled || false} />
      </View>
      {isModal && <Toast config={toastConfig(theme)} topOffset={toastTopOffset} />}
    </>
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
    zIndex: 1000,
  },
});

export default CustomLayout;
