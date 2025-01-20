import { StyleProp, View, ViewStyle } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

type Props = {
  style?: StyleProp<ViewStyle>;
} & React.ComponentProps<typeof View>;

const Loader = ({ style, ...rest }: Props) => {
  return (
    <LottieView
      source={require("../../../assets/lottieJson/loader.json")}
      autoPlay
      loop
      style={[{ width: 40, height: 40, margin: "auto" }, style]}
      {...rest}
    />
  );
};

export default Loader;
