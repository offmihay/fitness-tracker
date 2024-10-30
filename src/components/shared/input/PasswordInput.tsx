import { AntDesign, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Pressable } from "react-native";
import { useCustomTheme } from "../../../hooks/useCustomTheme";

type Props = {
  value: string | undefined;
  onChangeText?: ((text: string) => void) | undefined;
} & React.ComponentProps<typeof TextInput>;

const PasswordInput = ({ value, onChangeText, ...rest }: Props) => {
  const clearText = () => {
    onChangeText && onChangeText("");
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = (isPasswordVisible: boolean) => {
    setIsPasswordVisible(isPasswordVisible);
  };

  const theme = useCustomTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <TextInput
        style={[styles.input, { color: theme.colors.text }]}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!isPasswordVisible}
        returnKeyType="done"
        keyboardType="default"
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
    minHeight: 40,
  },
  input: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 16,
  },
  eyeButton: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PasswordInput;
