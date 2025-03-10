import React, { forwardRef } from "react";
import { ViewProps } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useScrollProps from "@/src/hooks/useScrollProps";

const CustomKeyboardAwareScrollView = forwardRef(
  (
    {
      useScrollFeature = false,
      ...rest
    }: {
      useScrollFeature?: boolean;
      scrollWrapperStyle?: ViewProps["style"];
    } & React.ComponentProps<typeof KeyboardAwareScrollView>,
    ref: React.ForwardedRef<KeyboardAwareScrollView> // Тип ref
  ) => {
    const { scrollPropOnBlur, handleScroll, onContentSizeChange, onLayout } = useScrollProps();

    return (
      <KeyboardAwareScrollView
        ref={ref}
        enableOnAndroid
        scrollEnabled
        keyboardShouldPersistTaps="handled"
        keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
        showsVerticalScrollIndicator={false}
        {...(useScrollFeature && scrollPropOnBlur)}
        onScroll={useScrollFeature ? handleScroll : undefined}
        onContentSizeChange={useScrollFeature ? onContentSizeChange : undefined}
        onLayout={useScrollFeature ? onLayout : undefined}
        {...rest}
      />
    );
  }
);

export default CustomKeyboardAwareScrollView;
