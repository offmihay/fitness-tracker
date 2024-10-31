import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  TextStyle,
} from "react-native";
import { useCustomTheme } from "../../../hooks/useCustomTheme";

type Props = {
  style?: StyleProp<TextStyle>;
  themeStyle?: "dark" | "light";
  useClearButton?: boolean;
  value: string | undefined;
  onChangeText?: ((text: string) => void) | undefined;
} & React.ComponentProps<typeof TextInput>;

const ClearableTextInput = ({
  style,
  useClearButton,
  value,
  onChangeText,
  themeStyle,
  ...rest
}: Props) => {
  const clearText = () => {
    onChangeText && onChangeText("");
  };

  const theme = themeStyle ? useCustomTheme(themeStyle) : useCustomTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surfaceLight }]}>
      <TextInput
        style={[style, styles.input, { color: theme.colors.text }]}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={theme.colors.textSurface}
        {...rest}
      />
      {value && value.length > 0 && useClearButton && (
        <TouchableOpacity onPress={clearText} style={styles.clearButton}>
          <AntDesign name="closecircle" color={theme.colors.textSurface} size={16} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    minHeight: 50,
  },
  input: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 16,
  },
  clearButton: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    right: 6,
  },
  buttonText: {
    fontSize: 16,
    color: "red",
  },
});

export default ClearableTextInput;