import React from "react";
import CustomLayout from "../custom/CustomLayout";
import Animated from "react-native-reanimated";
import { View } from "react-native";

type AnimatedScrollViewProps = React.ComponentProps<typeof Animated.ScrollView>;

type LayoutScrollViewProps = AnimatedScrollViewProps &
  Omit<React.ComponentProps<typeof CustomLayout>, "renderContent">;

const LayoutScrollView = (props: LayoutScrollViewProps) => {
  const { children, contentContainerStyle, ...rest } = props;

  return (
    <CustomLayout
      renderContent={({ onScroll, maxHeight }) => (
        <View style={{ flex: 1 }}>
          <Animated.ScrollView
            onScroll={onScroll}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[contentContainerStyle, { paddingTop: maxHeight }]}
            {...rest}
          >
            {children}
          </Animated.ScrollView>
        </View>
      )}
      {...rest}
    />
  );
};

export default LayoutScrollView;
