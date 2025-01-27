import React from "react";
import CustomLayout from "../custom/CustomLayout";
import Animated from "react-native-reanimated";

type AnimatedFlatListProps<T> = React.ComponentProps<typeof Animated.FlatList<T>>;

type LayoutFlatListProps<T> = AnimatedFlatListProps<T> &
  Omit<React.ComponentProps<typeof CustomLayout>, "renderContent">;

function LayoutFlatList<T>(props: LayoutFlatListProps<T>) {
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
        <Animated.FlatList
          onScroll={onScroll}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={[contentContainerStyle, { paddingTop: maxHeight }]}
          {...rest}
        />
      )}
      renderHeader={renderHeader}
      headerConfig={headerConfig}
      isDefaultCompressed={isDefaultCompressed}
    />
  );
}

export default LayoutFlatList;
