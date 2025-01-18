import React from "react";
import CustomLayout from "../CustomLayout";
import Animated, { SharedValue } from "react-native-reanimated";

type AnimatedScrollViewProps = React.ComponentProps<typeof Animated.ScrollView>;

type LayoutScrollViewProps = AnimatedScrollViewProps & {
  children: React.ReactNode;
  renderHeader?: (scrollY: SharedValue<number>) => React.ReactNode;
  headerConfig?: {
    maxHeight: number;
    minHeight: number;
  };
};

const LayoutScrollView = (props: LayoutScrollViewProps) => {
  const { children, contentContainerStyle, headerConfig, renderHeader, ...rest } = props;

  return (
    <CustomLayout
      renderContent={({ onScroll, maxHeight }) => (
        <Animated.ScrollView
          onScroll={onScroll}
          scrollEventThrottle={16}
          contentContainerStyle={[
            { paddingTop: maxHeight, paddingBottom: maxHeight },
            contentContainerStyle,
          ]}
          {...rest}
        >
          {children}
        </Animated.ScrollView>
      )}
      renderHeader={renderHeader}
      headerConfig={headerConfig}
    />
  );
};

export default LayoutScrollView;
