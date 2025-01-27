import React from "react";
import CustomLayout from "../custom/CustomLayout";
import Animated from "react-native-reanimated";

type AnimatedScrollViewProps = React.ComponentProps<typeof Animated.ScrollView>;

type LayoutScrollViewProps = AnimatedScrollViewProps &
  Omit<React.ComponentProps<typeof CustomLayout>, "renderContent">;

const LayoutScrollView = (props: LayoutScrollViewProps) => {
  const {
    children,
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
        <Animated.ScrollView
          onScroll={onScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[contentContainerStyle, { paddingTop: maxHeight }]}
          {...rest}
        >
          {children}
        </Animated.ScrollView>
      )}
      renderHeader={renderHeader}
      headerConfig={headerConfig}
      isDefaultCompressed={isDefaultCompressed}
    />
  );
};

export default LayoutScrollView;
