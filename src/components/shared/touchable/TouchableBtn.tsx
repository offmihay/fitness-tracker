import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import React from "react";
import Loader from "../loader/Loader";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";

type Props = {
  loading?: boolean;
  children: React.ReactNode;
  type?: "primary" | "secondary" | "warning" | "danger" | "white" | "grey";
  style?: StyleProp<ViewStyle>;
} & React.ComponentProps<typeof TouchableOpacity>;

const TouchableBtn = ({ style, loading, children, type = "primary", ...rest }: Props) => {
  const theme = useCustomTheme();
  return (
    <TouchableOpacity
      style={[
        styles.button,
        type === "primary" && styles.primaryButton,
        type === "secondary" && styles.secondaryButton,
        type === "warning" && styles.warningButton,
        type === "danger" && styles.dangerButton,
        type === "grey" && styles.greyButton,
        type === "white" && styles.whiteButton,
        style,
      ]}
      activeOpacity={0.85}
      disabled={loading}
      {...rest}
    >
      {!loading && children}
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
  },

  greyButton: {
    backgroundColor: "#333334",
  },
});

export default TouchableBtn;
