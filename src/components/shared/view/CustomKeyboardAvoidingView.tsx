import React, { ReactNode } from "react";
import { KeyboardAvoidingView, Platform, ViewProps } from "react-native";

type Props = {
  children: ReactNode;
} & React.ComponentProps<typeof KeyboardAvoidingView>;

const CustomKeyboardAvoidingView: React.FC<Props> = ({ children, ...props }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      {...props}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

export default CustomKeyboardAvoidingView;
