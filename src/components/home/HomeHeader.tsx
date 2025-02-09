import { StyleSheet, TextInput, View } from "react-native";
import React, { useState } from "react";
import DismissKeyboardView from "../../shared/view/DismissKeyboardView";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Divider } from "react-native-paper";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

const HomeHeader = (props: Props) => {
  const { value, onChangeText } = props;

  const insets = useSafeAreaInsets();

  const theme = useCustomTheme();
  return (
    <DismissKeyboardView style={{ width: "100%", paddingTop: insets.top }}>
      <View style={[styles.wrapper]}>
        <View style={{ ...styles.inputContainer, backgroundColor: theme.colors.surface }}>
          <TextInput
            placeholder="Search"
            placeholderTextColor={theme.colors.text}
            style={[styles.input, { color: theme.colors.text }]}
            value={value}
            onChangeText={onChangeText}
          />
        </View>
      </View>
      <Divider />
    </DismissKeyboardView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: 60,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
    display: "flex",
    justifyContent: "space-between",
  },

  inputContainer: {
    height: 40,
    borderRadius: 10,
  },

  input: { paddingHorizontal: 20, paddingVertical: 10, fontSize: 16 },
});

export default HomeHeader;
