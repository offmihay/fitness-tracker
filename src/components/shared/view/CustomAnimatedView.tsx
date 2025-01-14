import { StyleSheet, View } from "react-native";
import React, { Children } from "react";
import Animated, { LinearTransition } from "react-native-reanimated";

type Props = {
  children: React.ReactNode;
} & React.ComponentProps<typeof Animated.View>;

const CustomAnimatedView = (props: Props) => {
  const { children, ...rest } = props;

  return (
    <Animated.View layout={LinearTransition} {...rest}>
      {children}
    </Animated.View>
  );
};

export default CustomAnimatedView;
