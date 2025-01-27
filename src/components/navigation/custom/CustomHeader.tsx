import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { useAnimatedStyle, interpolate, Extrapolation } from "react-native-reanimated";
import type { SharedValue } from "react-native-reanimated";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT } from "../options";
import { Feather } from "@expo/vector-icons";
import { routeNames } from "../tabBar/TabBarButton";
import Skeleton from "@/src/shared/skeleton/Skeleton";

interface MyCustomHeaderProps {
  scrollY: SharedValue<number>;
  name?: string;
  isNameUnique?: boolean;
  node?: () => React.ReactNode;
}

const maxHeight = HEADER_MAX_HEIGHT;
const minHeight = HEADER_MIN_HEIGHT;
const Scroll_Distance = maxHeight - minHeight;

const CustomHeader: React.FC<MyCustomHeaderProps> = ({ scrollY, name, isNameUnique, node }) => {
  const insets = useSafeAreaInsets();

  const theme = useCustomTheme();
  const { t } = useTranslation();
  const router = useRouter();

  const animatedTextStyle = useAnimatedStyle(() => {
    const fontSize = interpolate(
      scrollY.value,
      [0, Scroll_Distance],
      [28, 16],
      Extrapolation.CLAMP
    );
    return {
      fontSize,
    };
  });

  const animatedTitleStyle = useAnimatedStyle(() => {
    const bottom = interpolate(scrollY.value, [0, Scroll_Distance], [10, 3], Extrapolation.CLAMP);
    const left = interpolate(scrollY.value, [0, Scroll_Distance], [0, 30], Extrapolation.CLAMP);

    return {
      bottom,
      left,
    };
  });

  const animatedBackStyle = useAnimatedStyle(() => {
    const bottom = interpolate(scrollY.value, [0, Scroll_Distance], [82, 8], Extrapolation.CLAMP);
    const left = interpolate(scrollY.value, [0, Scroll_Distance], [-15, -15], Extrapolation.CLAMP);
    const scaleValue = interpolate(
      scrollY.value,
      [0, Scroll_Distance],
      [1, 0.8],
      Extrapolation.CLAMP
    );
    return {
      bottom,
      left,
      transform: [{ scale: scaleValue }],
    };
  });

  return (
    <>
      <View
        style={[styles.wrapper, { borderColor: theme.colors.surfaceLight, paddingTop: insets.top }]}
      >
        <View style={[styles.titleContainer]}>
          {name && !routeNames.includes(name) && (
            <Animated.View style={[{ position: "absolute" }, animatedBackStyle]}>
              <TouchableOpacity onPress={() => router.back()}>
                <Feather name="chevron-left" size={40} color={theme.colors.link} />
              </TouchableOpacity>
            </Animated.View>
          )}
          <Animated.View style={[styles.title, animatedTitleStyle]}>
            {name ? (
              <Animated.Text
                style={[{ color: theme.colors.text, fontWeight: 600 }, animatedTextStyle]}
                numberOfLines={2}
              >
                {isNameUnique ? name : t(`title.${name}`)}
              </Animated.Text>
            ) : (
              <Skeleton height={40} width={220} wrapperStyle={{ borderRadius: 10 }} />
            )}
          </Animated.View>
          {node && (
            <View pointerEvents="box-none" style={{ width: "100%", height: "100%" }}>
              {node()}
            </View>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    width: "100%",
    borderBottomWidth: 0.5,
  },

  titleContainer: {
    height: "100%",
    position: "relative",
  },

  title: {
    position: "absolute",
    left: 0,
    minHeight: 50,
    display: "flex",
    justifyContent: "center",
  },
});

export default CustomHeader;
