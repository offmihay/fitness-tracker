import { AntDesign, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Pressable,
  TextStyle,
  StyleProp,
} from "react-native";
import { useCustomTheme } from "../../../hooks/useCustomTheme";

type Props = {
  style?: StyleProp<TextStyle>;
  themeStyle?: "dark" | "light";
  value: string | undefined;
  onChangeText?: ((text: string) => void) | undefined;
} & React.ComponentProps<typeof TextInput>;

const PasswordInput = ({ style, value, onChangeText, themeStyle, ...rest }: Props) => {
  const clearText = () => {
    onChangeText && onChangeText("");
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = (isPasswordVisible: boolean) => {
    setIsPasswordVisible(isPasswordVisible);
  };

  const theme = themeStyle ? useCustomTheme(themeStyle) : useCustomTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surfaceLight }]}>
      <TextInput
        style={[style, styles.input, { color: theme.colors.text }]}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!isPasswordVisible}
        returnKeyType="done"
        keyboardType="default"
        placeholderTextColor={theme.colors.textSurface}
        {...rest}
      />
      {value && value.length > 0 && (
        <Pressable
          onPressIn={() => togglePasswordVisibility(true)}
          onPressOut={() => togglePasswordVisibility(false)}
          style={styles.eyeButton}
        >
          <Ionicons
            name={isPasswordVisible ? "eye" : "eye-off"}
            color={theme.colors.textSurface}
            size={18}
            className="pr-4"
          />
        </Pressable>
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
  eyeButton: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PasswordInput;
