import { AccessibilityState, GestureResponderEvent, StyleSheet, View, Text } from "react-native";
import React, { useEffect } from "react";
import { PlatformPressable } from "@react-navigation/elements";
import Animated, {
  FadeInDown,
  FadeOutDown,
  FadeOutUp,
  interpolate,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";

type Props = {
  href?: string | undefined;
  accessibilityState?: AccessibilityState | undefined;
  accessibilityLabel?: string | undefined;
  testID?: string | undefined;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  onLongPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  isFocused: boolean;
  routeName: string;
  label: string;
};

const icon: Record<string, (color: string) => React.ReactNode> = {
  home: (color: string) => <Feather name="home" size={24} color={color} style={{ bottom: 1 }} />,
  tournaments: (color: string) => <MaterialIcons name="sports-tennis" size={24} color={color} />,
  settings: (color: string) => <Feather name="settings" size={24} color={color} />,
};

const TabBarButton = (props: Props) => {
  const {
    href,
    accessibilityState,
    accessibilityLabel,
    testID,
    onPress,
    onLongPress,
    isFocused,
    routeName,
    label,
  } = props;

  const theme = useCustomTheme();

  const scale = useSharedValue(0);
  useEffect(() => {
    scale.value = withSpring(typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused, {
      duration: 300,
    });
  }, [scale, isFocused]);

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);
    const bottom = interpolate(scale.value, [0, 1], [0, -30]);
    return {
      opacity,
      bottom,
    };
  });

  const animatedViewStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.3]);
    const top = interpolate(scale.value, [0, 1], [0, 7]);
    return {
      transform: [{ scale: scaleValue }],
      top,
    };
  });

  return (
    <PlatformPressable
      href={href}
      accessibilityState={accessibilityState}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      onPress={onPress}
      onLongPress={onLongPress}
      style={{ flex: 1, overflow: "hidden" }}
    >
      <View style={styles.button}>
        <Animated.View style={animatedViewStyle}>
          {icon[routeName](isFocused ? theme.colors.primary : theme.colors.text)}
        </Animated.View>
        <Animated.Text
          style={[
            {
              color: isFocused ? theme.colors.primary : "white",
              textAlign: "center",
              fontSize: 11,
            },
            animatedTextStyle,
          ]}
        >
          {label}
        </Animated.Text>
      </View>
    </PlatformPressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    gap: 4,
    paddingVertical: 5,
    alignItems: "center",
  },
});

export default TabBarButton;
