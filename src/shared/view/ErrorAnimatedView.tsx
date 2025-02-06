import React from "react";
import Animated, { FadeIn, FadeOut, LinearTransition } from "react-native-reanimated";
import CustomText from "../text/CustomText";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";

type Props = {
  message?: string;
} & React.ComponentProps<typeof Animated.View>;

const ErrorAnimatedView = (props: Props) => {
  const { message, ...rest } = props;
  const theme = useCustomTheme();

  return (
    <>
      {message && (
        <Animated.View
          layout={LinearTransition}
          entering={FadeIn.duration(300)}
          exiting={FadeOut.duration(300)}
          {...rest}
        >
          <CustomText className="pl-1 pb-2" type="predefault" color={theme.colors.error}>
            {message}
          </CustomText>
        </Animated.View>
      )}
    </>
  );
};

export default ErrorAnimatedView;
