import React from "react";
import { View, TextInput, StyleSheet, StyleProp, TextStyle, ViewStyle } from "react-native";
import { useCustomTheme } from "../../../hooks/useCustomTheme";
import CustomText from "../text/CustomText";

type Props = {
  style?: StyleProp<TextStyle>;
  disabled?: boolean;
  styleWrapper?: StyleProp<ViewStyle>;
  themeStyle?: "dark" | "light";
  value?: string | undefined;
  onChangeText?: ((text: string) => void) | undefined;
  viewNode?: React.ReactNode;
  label?: string;
  color?: string;
} & React.ComponentProps<typeof TextInput>;

const CustomTextInput = ({
  color,
  style,
  disabled,
  value,
  onChangeText,
  themeStyle,
  styleWrapper,
  viewNode,
  label,
  ...rest
}: Props) => {
  const theme = themeStyle ? useCustomTheme(themeStyle) : useCustomTheme();

  return (
    <View
      style={[
        styles.container,
        styleWrapper,
        {
          backgroundColor: color || theme.colors.background,
          borderColor: theme.colors.divider,
          borderWidth: 1,
        },
      ]}
    >
      <TextInput
        editable={!disabled}
        selectTextOnFocus={!disabled}
        style={[
          styles.input,
          {
            color: theme.colors.text,
          },
          style,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={theme.colors.textTertiary}
        {...rest}
      />
      {label && (
        <View style={[styles.labelView, { backgroundColor: color || theme.colors.background }]}>
          <CustomText style={[styles.labelText, { color: theme.colors.text }]}>{label}</CustomText>
        </View>
      )}
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
  labelView: {
    position: "absolute",
    left: 10,
    top: -8,
    paddingHorizontal: 5,
  },
  labelText: {
    fontSize: 10,
    lineHeight: 0,
  },
});

export default CustomTextInput;
