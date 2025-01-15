import { StyleSheet, View, ViewProps } from "react-native";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useScrollProps from "@/src/hooks/useScrollProps";

type Props = {
  useScrollHook?: boolean;
  scrollWrapperStyle?: ViewProps["style"];
} & React.ComponentProps<typeof KeyboardAwareScrollView>;

const CustomKeyboardAwareScrollView = ({
  useScrollHook = false,
  scrollWrapperStyle,
  ...rest
}: Props) => {
  const { scrollPropOnBlur, handleScroll, onContentSizeChange, onLayout } = useScrollProps();
  return (
    <KeyboardAwareScrollView
      {...(useScrollHook && scrollPropOnBlur)}
      onScroll={useScrollHook ? handleScroll : undefined}
      onContentSizeChange={useScrollHook ? onContentSizeChange : undefined}
      onLayout={useScrollHook ? onLayout : undefined}
      contentContainerStyle={[styles.scrollContent, scrollWrapperStyle]}
      enableOnAndroid={true}
      scrollEnabled={true}
      keyboardShouldPersistTaps="handled"
      keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
      showsVerticalScrollIndicator={false}
      {...rest}
    ></KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
});

export default CustomKeyboardAwareScrollView;
