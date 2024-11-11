import React, { ReactNode, useCallback } from "react";
import { TouchableWithoutFeedback, Keyboard, View, ViewProps } from "react-native";

type Props = {
  children: ReactNode;
} & ViewProps;

const DismissKeyboardView: React.FC<Props> = ({ children, ...props }) => {
  const dismissKeyboard = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard} accessible={false}>
      <View style={{ height: "100%" }} {...props}>
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default DismissKeyboardView;
