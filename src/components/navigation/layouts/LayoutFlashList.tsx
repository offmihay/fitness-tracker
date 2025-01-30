import React from "react";
import CustomLayout from "../custom/CustomLayout";
import { ContentStyle, FlashList, FlashListProps } from "@shopify/flash-list";
import Animated from "react-native-reanimated";
import { View } from "react-native";

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);
type AnimatedFlashListProps = React.ComponentProps<typeof AnimatedFlashList>;

type LayoutFlashListProps<T> = FlashListProps<T> &
  Omit<React.ComponentProps<typeof CustomLayout>, "renderContent"> & {
    contentContainerStyle?: ContentStyle;
  };

function LayoutFlashList<T>(props: LayoutFlashListProps<T>) {
  const {
    contentContainerStyle,
    headerConfig,
    renderHeader,
    name,
    isNameUnique,
    isDefaultCompressed,
    ...rest
  } = props;

  return (
    <CustomLayout
      name={name}
      isNameUnique={isNameUnique}
      renderContent={({ onScroll, maxHeight }) => (
        // @ts-ignore
        <AnimatedFlashList
          onScroll={onScroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ ...contentContainerStyle, paddingTop: maxHeight }}
          {...rest}
        />
      )}
      renderHeader={renderHeader}
      headerConfig={headerConfig}
      isDefaultCompressed={isDefaultCompressed}
    />
  );
}

export default LayoutFlashList;
