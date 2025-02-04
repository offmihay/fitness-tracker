import React, { useEffect, useRef } from "react";
import CustomLayout from "../custom/CustomLayout";
import Animated from "react-native-reanimated";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useScrollProps from "@/src/hooks/useScrollProps";
import { View } from "react-native";

const AnimatedKeyboardAwareScrollView = Animated.createAnimatedComponent(KeyboardAwareScrollView);
type AnimatedKeyboardScrollViewProps = React.ComponentProps<typeof AnimatedKeyboardAwareScrollView>;

type LayoutKeyboardScrollViewProps = AnimatedKeyboardScrollViewProps &
  Omit<React.ComponentProps<typeof CustomLayout>, "renderContent"> & {
    scrollToBottomOnStart?: boolean;
    useScrollFeature?: boolean;
  };

const LayoutKeyboardScrollView = (props: LayoutKeyboardScrollViewProps) => {
  const { children, contentContainerStyle, useScrollFeature, scrollToBottomOnStart, ...rest } =
    props;

  const { scrollPropOnBlur, handleScroll, onContentSizeChange, onLayout } = useScrollProps();

  const ref = useRef<KeyboardAwareScrollView | null>(null);

  const scrollToBottom = () => {
    ref.current?.scrollToEnd();
  };

  useEffect(() => {
    if (scrollToBottomOnStart && ref.current) {
      scrollToBottom();
    }
  });

  return (
    <CustomLayout
      renderContent={({ onScroll, maxHeight }) => {
        return (
          <View style={{ flex: 1 }}>
            <AnimatedKeyboardAwareScrollView
              ref={ref}
              bounces={false}
              alwaysBounceVertical={false}
              onMomentumScrollBegin={onScroll}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              contentContainerStyle={[
                { flexGrow: 1, paddingTop: maxHeight },
                contentContainerStyle,
              ]}
              enableOnAndroid
              scrollEnabled
              keyboardShouldPersistTaps="handled"
              keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
              showsVerticalScrollIndicator={false}
              {...(useScrollFeature && scrollPropOnBlur)}
              onContentSizeChange={useScrollFeature ? onContentSizeChange : undefined}
              onLayout={useScrollFeature ? onLayout : undefined}
              {...rest}
            >
              {children}
            </AnimatedKeyboardAwareScrollView>
          </View>
        );
      }}
      {...rest}
    />
  );
};

export default LayoutKeyboardScrollView;
