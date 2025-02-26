import React from "react";
import CustomLayout from "../custom/CustomLayout";
import { ContentStyle, FlashList, FlashListProps } from "@shopify/flash-list";
import Animated from "react-native-reanimated";

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);

type Props<T> = Omit<React.ComponentProps<typeof CustomLayout>, "renderContent"> & {
  flashListProps: FlashListProps<T> & {
    contentContainerStyle?: ContentStyle;
  };
};
function LayoutFlashList<T>(props: Props<T>) {
  const { flashListProps, ...rest } = props;
  const { contentContainerStyle, ...restFlashListProps } = flashListProps;

  return (
    <CustomLayout
      renderContent={({ onScroll, maxHeight }) => {
        return (
          // @ts-ignore
          <AnimatedFlashList
            onScroll={onScroll}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              ...contentContainerStyle,
              paddingVertical: maxHeight,
              paddingBottom: -1,
            }}
            {...restFlashListProps}
          />
        );
      }}
      {...rest}
    />
  );
}

export default LayoutFlashList;
