import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";

type Props = {
  themeStyle?: "dark" | "light";
};

const TouchableBack = ({ themeStyle }: Props) => {
  const router = useRouter();

  const theme = themeStyle ? useCustomTheme(themeStyle) : useCustomTheme();

  return (
    <TouchableOpacity style={styles.backBtn} onPress={router.back}>
      <FontAwesome6 name="arrow-left-long" size={24} color={theme.colors.text} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backBtn: {
    position: "absolute",
    paddingLeft: 20,
    paddingTop: 30,
    top: 50,
    left: 0,
    zIndex: 10,
    width: 100,
    height: 80,
  },
});

export default TouchableBack;