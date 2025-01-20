import React from "react";
import CustomLayout from "../custom/CustomLayout";
import Animated from "react-native-reanimated";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useScrollProps from "@/src/hooks/useScrollProps";

const AnimatedKeyboardAwareScrollView = Animated.createAnimatedComponent(KeyboardAwareScrollView);
type AnimatedKeyboardScrollViewProps = React.ComponentProps<typeof AnimatedKeyboardAwareScrollView>;

type LayoutKeyboardScrollViewProps = AnimatedKeyboardScrollViewProps &
  Omit<React.ComponentProps<typeof CustomLayout>, "renderContent"> & {
    useScrollFeature: boolean;
  };

const LayoutKeyboardScrollView = (props: LayoutKeyboardScrollViewProps) => {
  const {
    children,
    contentContainerStyle,
    headerConfig,
    useScrollFeature,
    renderHeader,
    name,
    isNameUnique,
    ...rest
  } = props;

  const { scrollPropOnBlur, handleScroll, onContentSizeChange, onLayout } = useScrollProps();

  return (
    <CustomLayout
      name={name}
      isNameUnique={isNameUnique}
      renderContent={({ onScroll, maxHeight }) => {
        return (
          <AnimatedKeyboardAwareScrollView
            bounces={false}
            alwaysBounceVertical={false}
            onMomentumScrollBegin={onScroll}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            contentContainerStyle={[{ paddingTop: maxHeight, flexGrow: 1 }, contentContainerStyle]}
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
