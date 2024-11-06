import { AntDesign } from "@expo/vector-icons";
import React, { Children, useEffect, useRef, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  TextStyle,
  Keyboard,
  NativeSyntheticEvent,
  TextInputEndEditingEventData,
  ViewStyle,
} from "react-native";
import { useCustomTheme } from "../../../hooks/useCustomTheme";
import RNDateTimePicker from "@react-native-community/datetimepicker";

type Props = {
  style?: StyleProp<TextStyle>;
  disabled?: boolean;
  styleWrapper?: StyleProp<ViewStyle>;
  themeStyle?: "dark" | "light";
  value?: string | undefined;
  onChangeText?: ((text: string) => void) | undefined;
  viewNode?: React.ReactNode;
} & React.ComponentProps<typeof TextInput>;

const CustomTextInput = ({
  style,
  disabled,
  value,
  onChangeText,
  themeStyle,
  styleWrapper,
  viewNode,
  ...rest
}: Props) => {
  const theme = themeStyle ? useCustomTheme(themeStyle) : useCustomTheme();

  return (
    <View
      style={[
        styles.container,
        styleWrapper,
        {
          backgroundColor: theme.colors.surfaceLight,
        },
      ]}
    >
      <TextInput
        editable={!disabled}
        selectTextOnFocus={!disabled}
        style={[style, styles.input, { color: theme.colors.text, opacity: 1 }]}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={theme.colors.textSurface}
        {...rest}
      />

      {viewNode}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    minHeight: 45,
    width: "100%",
  },
  input: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 16,
  },
});

export default CustomTextInput;
