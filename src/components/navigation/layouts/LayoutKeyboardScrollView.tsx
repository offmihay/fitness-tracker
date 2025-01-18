import React from "react";
import CustomLayout from "../CustomLayout";
import Animated, { SharedValue } from "react-native-reanimated";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useScrollProps from "@/src/hooks/useScrollProps";

const AnimatedKeyboardAwareScrollView = Animated.createAnimatedComponent(KeyboardAwareScrollView);
type AnimatedKeyboardScrollViewProps = React.ComponentProps<typeof AnimatedKeyboardAwareScrollView>;

type LayoutKeyboardScrollViewProps = AnimatedKeyboardScrollViewProps & {
  children: React.ReactNode;
  renderHeader?: (scrollY: SharedValue<number>) => React.ReactNode;
  headerConfig?: {
    maxHeight: number;
    minHeight: number;
  };
  useScrollFeature?: boolean;
};

const LayoutKeyboardScrollView = (props: LayoutKeyboardScrollViewProps) => {
  const { children, contentContainerStyle, headerConfig, useScrollFeature, renderHeader, ...rest } =
    props;

  const { scrollPropOnBlur, handleScroll, onContentSizeChange, onLayout } = useScrollProps();

  return (
    <CustomLayout
      renderContent={({ onScroll, maxHeight }) => {
        return (
          <AnimatedKeyboardAwareScrollView
            bounces={false}
            alwaysBounceVertical={false}
            onMomentumScrollBegin={onScroll}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            contentContainerStyle={[
              { paddingTop: maxHeight, paddingBottom: maxHeight, flexGrow: 1 },
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
        );
      }}
      renderHeader={renderHeader}
      headerConfig={headerConfig}
    />
  );
};

export default LayoutKeyboardScrollView;
