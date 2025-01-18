import { StyleSheet, View } from "react-native";
import React from "react";
import CustomHeader from "../header/CustomHeader";
import { SharedValue, useSharedValue } from "react-native-reanimated";
import CustomLayout from "../CustomLayout";

type Props = Omit<React.ComponentProps<typeof CustomLayout>, "renderContent"> & {
  children: React.ReactNode;
};

const LayoutStatic = (props: Props) => {
  const { children, renderHeader, headerConfig, name, isNameUnique } = props;
  return (
    <CustomLayout
      isNameUnique={isNameUnique}
      name={name}
      renderContent={({ maxHeight }) => <View style={{ paddingTop: maxHeight }}>{children}</View>}
      renderHeader={renderHeader}
      headerConfig={headerConfig}
    />
  );
};

export default LayoutStatic;
