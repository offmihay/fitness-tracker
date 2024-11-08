import { AntDesign } from "@expo/vector-icons";
import React, { Children, useEffect, useRef, useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";
import { useCustomTheme } from "../../../hooks/useCustomTheme";
import CustomTextInput from "./CustomTextInput";

type Props = {
  style?: StyleProp<TextStyle>;
  styleWrapper?: StyleProp<ViewStyle>;
  disabled?: boolean;
  themeStyle?: "dark" | "light";
  useClearButton?: boolean;
  value?: string | undefined;
  onChangeText?: ((text: string) => void) | undefined;
  onEndEditing?: () => void;
  label?: string;
  color?: string;
} & React.ComponentProps<typeof TextInput>;

const ClearableTextInput = ({
  children,
  style,
  disabled,
  useClearButton,
  value,
  onChangeText,
  themeStyle,
  editable = true,
  onEndEditing,
  styleWrapper,
  label,
  color,
  ...rest
}: Props) => {
  const theme = themeStyle ? useCustomTheme(themeStyle) : useCustomTheme();
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const clearText = () => {
    onChangeText && onChangeText("");
    setKeyboardVisible;
  };

  const handleEndEditing = () => {
    setKeyboardVisible(false);
    onEndEditing && onEndEditing();
  };

  return (
    <CustomTextInput
      color={color}
      value={value}
      label={label}
      onChangeText={onChangeText}
      disabled={disabled}
      placeholderTextColor={theme.colors.textSurface}
      onFocus={() => setKeyboardVisible(true)}
      onEndEditing={handleEndEditing}
      themeStyle={themeStyle}
      viewNode={
        value &&
        value.length > 0 &&
        useClearButton &&
        keyboardVisible && (
          <TouchableOpacity onPress={clearText} style={styles.clearButton}>
            <AntDesign
              name="closecircle"
              color={theme.colors.textSurface}
              style={{ opacity: theme.dark ? 1 : 0.5 }}
              size={14}
            />
          </TouchableOpacity>
        )
      }
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  clearButton: {
    height: 40,
    width: 45,
    justifyContent: "center",
    alignItems: "center",
    right: 3,
  },
  buttonText: {
    fontSize: 16,
    color: "red",
  },
});

export default ClearableTextInput;
