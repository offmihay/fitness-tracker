import { View } from "react-native";
import React from "react";
import CustomLayout from "../custom/CustomLayout";

type Props = Omit<React.ComponentProps<typeof CustomLayout>, "renderContent"> & {
  children: React.ReactNode;
};

const LayoutStatic = (props: Props) => {
  const { children, ...rest } = props;
  return (
    <CustomLayout
      renderContent={({ maxHeight }) => (
        <View style={{ flex: 1, paddingTop: maxHeight }} {...rest}>
          {children}
        </View>
      )}
      {...rest}
    />
  );
};

export default LayoutStatic;
