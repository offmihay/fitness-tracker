import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import FastImage from "@d11/react-native-fast-image";
import { View, ViewProps } from "react-native";

type Props = ViewProps;
const GoogleLogo = (props: Props) => {
  const theme = useCustomTheme();
  const source = theme.dark
    ? require("@/assets/imgs/google_logo_dark.png")
    : require("@/assets/imgs/google_logo_light.png");

  const { style, ...rest } = props;
  return (
    <View style={[{ width: 80 }, style]} {...rest}>
      <FastImage
        style={{ width: "100%", height: "100%" }}
        source={source}
        resizeMode={FastImage.resizeMode.contain}
      ></FastImage>
    </View>
  );
};

export default GoogleLogo;
