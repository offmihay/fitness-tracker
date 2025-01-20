import { View } from "react-native";
import React from "react";
import CustomLayout from "../custom/CustomLayout";

type Props = Omit<React.ComponentProps<typeof CustomLayout>, "renderContent"> & {
  children: React.ReactNode;
};

const LayoutStatic = (props: Props) => {
  const { children, renderHeader, headerConfig, name, isNameUnique, disableHeader, ...rest } =
    props;
  return (
    <CustomLayout
      isNameUnique={isNameUnique}
      name={name}
      renderContent={({ maxHeight }) => (
        <View style={{ flex: 1, paddingTop: disableHeader ? 0 : maxHeight }} {...rest}>
          {children}
        </View>
      )}
      renderHeader={renderHeader}
      headerConfig={headerConfig}
      disableHeader={disableHeader}
    />
  );
};

export default LayoutStatic;
