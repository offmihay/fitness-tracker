import { StyleSheet, View } from "react-native";
import React from "react";
import CustomHeader from "../headers/CustomHeader";
import { SharedValue, useSharedValue } from "react-native-reanimated";
import CustomLayout from "../CustomLayout";

type Props = {
  children: React.ReactNode;
  renderHeader?: (scrollY: SharedValue<number>) => React.ReactNode;
  headerConfig?: {
    maxHeight: number;
    minHeight: number;
  };
};

const LayoutStatic = (props: Props) => {
  const { children, renderHeader, headerConfig } = props;
  return (
    <CustomLayout
      renderContent={({ maxHeight }) => (
        <View style={{ paddingTop: maxHeight, paddingBottom: maxHeight }}>{children}</View>
      )}
      renderHeader={renderHeader}
      headerConfig={headerConfig}
    />
  );
};

export default LayoutStatic;
