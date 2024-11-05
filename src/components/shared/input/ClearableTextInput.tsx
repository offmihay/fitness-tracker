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
  styleWrapper?: StyleProp<ViewStyle>;
  disabled?: boolean;
  themeStyle?: "dark" | "light";
  useClearButton?: boolean;
  value?: string | undefined;
  onChangeText?: ((text: string) => void) | undefined;
  onEndEditing?: () => void;
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
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surfaceLight,
          // borderColor: disabled ? theme.colors.border : "transparent",
        },
        styleWrapper,
      ]}
    >
      <TextInput
        style={[style, styles.input, { color: theme.colors.text, opacity: 1 }]}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={theme.colors.textSurface}
        editable={!disabled}
        onFocus={() => setKeyboardVisible(true)}
        onEndEditing={handleEndEditing}
        {...rest}
      >
        {children}
      </TextInput>
      {value && value.length > 0 && useClearButton && keyboardVisible && (
        <TouchableOpacity onPress={clearText} style={styles.clearButton}>
          <AntDesign
            name="closecircle"
            color={theme.colors.textSurface}
            style={{ opacity: theme.dark ? 1 : 0.5 }}
            size={14}
          />
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
    minHeight: 45,
    borderWidth: 1,
    width: "100%",
  },
  input: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 16,
  },
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
