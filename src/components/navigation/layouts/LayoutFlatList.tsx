import React from "react";
import CustomLayout from "../custom/CustomLayout";
import Animated, { SharedValue } from "react-native-reanimated";

type AnimatedFlatListProps<T> = React.ComponentProps<typeof Animated.FlatList<T>>;

type LayoutFlatListProps<T> = AnimatedFlatListProps<T> &
  Omit<React.ComponentProps<typeof CustomLayout>, "renderContent">;

function LayoutFlatList<T>(props: LayoutFlatListProps<T>) {
  const { contentContainerStyle, headerConfig, renderHeader, name, isNameUnique, ...rest } = props;

  return (
    <CustomLayout
      name={name}
      isNameUnique={isNameUnique}
      renderContent={({ onScroll, maxHeight }) => (
        <Animated.FlatList
          onScroll={onScroll}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={[{ paddingTop: maxHeight }, contentContainerStyle]}
          {...rest}
        />
      )}
      renderHeader={renderHeader}
      headerConfig={headerConfig}
    />
  );
}

export default LayoutFlatList;
