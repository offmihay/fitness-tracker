import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";

const ButtonBack = (props: React.ComponentProps<typeof TouchableOpacity>) => {
  const router = useRouter();

  const theme = useCustomTheme();

  return (
    <TouchableOpacity style={[styles.backBtn, props.style]} onPress={router.back}>
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

export default ButtonBack;
