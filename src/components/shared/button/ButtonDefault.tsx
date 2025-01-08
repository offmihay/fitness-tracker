import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import React, { useEffect, useState } from "react";
import Loader from "../loader/Loader";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import CustomText from "../text/CustomText";
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { FontAwesome } from "@expo/vector-icons";

type Props = {
  disabled?: boolean;
  loading?: boolean;
  type?:
    | "primary"
    | "secondary"
    | "warning"
    | "danger"
    | "error"
    | "success"
    | "white"
    | "transparent"
    | "grey"
    | "darkgrey"
    | "lightgrey";
  style?: StyleProp<ViewStyle>;
  styleText?: StyleProp<ViewStyle>;
  nodeRight?: (color: string) => React.ReactNode;
  nodeLeft?: (color: string) => React.ReactNode;
  title?: string;
  statusAnimation?: {
    enabled?: boolean;
    isSuccess?: boolean;
    isError?: boolean;
    useOnlySuccess?: boolean;
    timeOut?: number;
  };
} & React.ComponentProps<typeof TouchableOpacity>;

const ButtonDefault = ({
  style,
  styleText,
  loading = false,
  disabled,
  type = "primary",
  nodeRight,
  nodeLeft,
  title,
  statusAnimation = { enabled: false, timeOut: 2000 },
  ...rest
}: Props) => {
  const theme = useCustomTheme();

  const [isCheckAnimated, setIsCheckAnimated] = useState(false);
  const startStatusAnimation = () => {
    setIsCheckAnimated(true);
    setTimeout(() => {
      setIsCheckAnimated(false);
    }, statusAnimation?.timeOut);
  };

  const [loadingState, setLoadingState] = useState(false);

  useEffect(() => {
    if (statusAnimation.enabled) {
      if (statusAnimation.isError && statusAnimation.useOnlySuccess) return;
      setLoadingState(loading);
      if (loadingState && !loading) {
        startStatusAnimation();
      }
    }
  }, [loading]);

  const color =
    type === "white"
      ? "black"
      : (type === "grey" && !theme.dark) || type === "lightgrey"
      ? "black"
      : "white";
  const opacityColor =
    disabled && !isCheckAnimated && theme.dark
      ? "grey"
      : disabled && !isCheckAnimated && !theme.dark
      ? "#929292"
      : color;

  const styleDisabledColor = theme.dark ? styles.darkgreyButton : styles.lightgreyButton;
  const styleEnabledColor =
    type === "error" ||
    (!statusAnimation.useOnlySuccess && statusAnimation.isError && isCheckAnimated)
      ? styles.errorButton
      : type === "success" || (statusAnimation?.isSuccess && isCheckAnimated)
      ? styles.successButton
      : type === "primary"
      ? styles.primaryButton
      : type === "secondary"
      ? styles.secondaryButton
      : type === "warning"
      ? styles.warningButton
      : type === "danger"
      ? styles.dangerButton
      : type === "white"
      ? styles.whiteButton
      : (type === "grey" && theme.dark) || type === "darkgrey"
      ? styles.darkgreyButton
      : (type === "grey" && !theme.dark) || type === "lightgrey"
      ? styles.lightgreyButton
      : undefined;

  const isDisabled = useSharedValue(disabled);

  useEffect(() => {
    isDisabled.value = disabled;
  }, [disabled]);

  const animatedWrapperStyle = useAnimatedStyle(() => ({
    backgroundColor: withTiming(
      isDisabled.value && !isCheckAnimated
        ? (styleDisabledColor as { backgroundColor: string }).backgroundColor
        : (styleEnabledColor as { backgroundColor: string }).backgroundColor,
      {
        duration: 300,
      }
    ),
    borderColor: withTiming(
      !isDisabled.value
        ? (styleEnabledColor as { borderColor: string }).borderColor
        : "transparent",
      {
        duration: 300,
      }
    ),
  }));

  return (
    <TouchableOpacity
      style={[styles.wrapper, style]}
      activeOpacity={0.85}
      disabled={disabled || loading || isCheckAnimated}
      {...rest}
    >
      <Animated.View
        style={[
          styles.wrapper,
          type === "primary" && styles.primaryButton,
          type === "secondary" && styles.secondaryButton,
          type === "warning" && styles.warningButton,
          type === "danger" && styles.dangerButton,
          type === "success" && styles.successButton,
          type === "error" && styles.errorButton,
          type === "white" && styles.whiteButton,
          (type === "grey" || type === "darkgrey" || (disabled && theme.dark)) &&
            styles.darkgreyButton,
          (type === "grey" || type === "lightgrey" || (disabled && !theme.dark)) &&
            styles.lightgreyButton,
          animatedWrapperStyle,
        ]}
      >
        {!isCheckAnimated && !loading && nodeLeft && nodeLeft(opacityColor)}
        {!isCheckAnimated && !loading && (
          <Animated.View entering={FadeIn.duration(300)} exiting={FadeOut.duration(300)}>
            <CustomText weight="bold" color={opacityColor}>
              {title}
            </CustomText>
          </Animated.View>
        )}
        {!isCheckAnimated && !loading && nodeRight && nodeRight(opacityColor)}
        {!isCheckAnimated && loading && (
          <Animated.View style={styles.loaderWrapper}>
            <Loader />
          </Animated.View>
        )}
        {!loading && isCheckAnimated && (
          <Animated.View
            style={styles.loaderWrapper}
            entering={FadeIn.duration(500)}
            exiting={FadeOut.duration(150)}
          >
            {statusAnimation.isSuccess && (
              <FontAwesome name="check" size={24} color={opacityColor} />
            )}
            {statusAnimation.isError && !statusAnimation.useOnlySuccess && (
              <FontAwesome name="close" size={24} color={opacityColor} />
            )}
          </Animated.View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
  },

  wrapper: {
    borderRadius: 10,
    width: "100%",
    height: 50,
    display: "flex",
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  loaderWrapper: {
    position: "absolute",
    width: "100%",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  primaryButton: {
    backgroundColor: "rgba(0, 130, 255, 1)",
  },

  secondaryButton: {
    backgroundColor: "#7968F2",
  },

  warningButton: {
    backgroundColor: "#FFB62F",
  },

  dangerButton: {
    borderWidth: 1,
    borderColor: "rgba(255, 0, 0, 0.5)",
    borderStyle: "dotted",
  },

  errorButton: {
    backgroundColor: "#ff003a",
  },

  successButton: {
    backgroundColor: "#00dc71",
  },

  whiteButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },

  darkgreyButton: {
    backgroundColor: "#333334",
  },

  lightgreyButton: {
    backgroundColor: "#dedede",
  },
});

export default ButtonDefault;
