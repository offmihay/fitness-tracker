import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { TextInput, StyleSheet, Pressable, TextStyle, StyleProp } from "react-native";
import { useCustomTheme } from "../../../hooks/useCustomTheme";
import CustomTextInput from "./CustomTextInput";

type Props = {
  style?: StyleProp<TextStyle>;
  themeStyle?: "dark" | "light";
  value: string | undefined;
  onChangeText?: ((text: string) => void) | undefined;
} & React.ComponentProps<typeof TextInput>;

const PasswordInput = ({ style, value, onChangeText, themeStyle, ...rest }: Props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = (isPasswordVisible: boolean) => {
    setIsPasswordVisible(isPasswordVisible);
  };

  const theme = themeStyle ? useCustomTheme(themeStyle) : useCustomTheme();

  return (
    <>
      <CustomTextInput
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!isPasswordVisible}
        returnKeyType="done"
        keyboardType="default"
        viewNode={
          value &&
          value.length > 0 && (
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
          )
        }
        {...rest}
      />
    </>
  );
};

const styles = StyleSheet.create({
  eyeButton: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PasswordInput;
