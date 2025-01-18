import React from "react";
import CustomLayout from "../CustomLayout";
import Animated, { SharedValue } from "react-native-reanimated";

type AnimatedFlatListProps<T> = React.ComponentProps<typeof Animated.FlatList<T>>;

type LayoutFlatListProps<T> = AnimatedFlatListProps<T> & {
  renderHeader?: (scrollY: SharedValue<number>) => React.ReactNode;
  headerConfig?: {
    maxHeight: number;
    minHeight: number;
  };
};

function LayoutFlatList<T>(props: LayoutFlatListProps<T>) {
  const { contentContainerStyle, headerConfig, renderHeader, ...rest } = props;

  return (
    <CustomLayout
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
