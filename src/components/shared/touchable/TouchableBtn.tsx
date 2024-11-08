import {
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import Loader from "../loader/Loader";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import CustomText from "../text/CustomText";

type Props = {
  disabled?: boolean;
  loading?: boolean;
  type?: "primary" | "secondary" | "warning" | "danger" | "white" | "grey" | "lightgrey";
  style?: StyleProp<ViewStyle>;
  styleText?: StyleProp<ViewStyle>;
  nodeRight?: (color: string) => React.ReactNode;
  nodeLeft?: (color: string) => React.ReactNode;
  title?: string;
} & React.ComponentProps<typeof TouchableOpacity>;

const TouchableBtn = ({
  style,
  styleText,
  loading,
  disabled,
  type = "primary",
  nodeRight,
  nodeLeft,
  title,
  ...rest
}: Props) => {
  const theme = useCustomTheme();
  const color = type === "white" ? "black" : "white";
  const opacityColor =
    disabled && theme.dark ? "grey" : disabled && !theme.dark ? "#929292" : color;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        type === "primary" && styles.primaryButton,
        type === "secondary" && styles.secondaryButton,
        type === "warning" && styles.warningButton,
        type === "danger" && styles.dangerButton,
        type === "white" && styles.whiteButton,
        (type === "grey" || (disabled && theme.dark)) && styles.greyButton,
        (type === "lightgrey" || (disabled && !theme.dark)) && styles.lightgreyButton,
        style,
      ]}
      activeOpacity={0.85}
      disabled={disabled || loading}
      {...rest}
    >
      {!loading && nodeLeft && nodeLeft(opacityColor)}
      {!loading && (
        <CustomText type="defaultSemiBold" color={opacityColor}>
          {title}
        </CustomText>
      )}
      {!loading && nodeRight && nodeRight(opacityColor)}
      {loading && (
        <View style={styles.loaderWrapper}>
          <Loader />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 50,
    borderRadius: 10,
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

  successButton: {
    backgroundColor: "rgba(0, 130, 255, 1)",
  },

  whiteButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.09)",
  },

  greyButton: {
    backgroundColor: "#333334",
  },

  lightgreyButton: {
    backgroundColor: "#dedede",
  },
});

export default TouchableBtn;
