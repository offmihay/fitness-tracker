import React, { ReactNode } from "react";
import { TouchableWithoutFeedback, Keyboard, View, ViewProps } from "react-native";

type DismissKeyboardHOCProps = {
  children: ReactNode;
} & ViewProps;

const DismissKeyboardHOC = <P extends object>(Comp: React.ComponentType<P>) => {
  return ({ children, ...props }: DismissKeyboardHOCProps) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Comp {...(props as P)}>{children}</Comp>
    </TouchableWithoutFeedback>
  );
};

const DismissKeyboardView = DismissKeyboardHOC(View);

export default DismissKeyboardView;
