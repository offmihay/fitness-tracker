import CustomAnimatedView from "@/src/shared/view/CustomAnimatedView";
import React from "react";
import { View } from "react-native";

type Props = {
  children: [React.ReactNode, React.ReactNode];
};

const DualInputSection: React.FC<Props> = ({ children }) => {
  const [firstNode, secondNode] = children;

  return (
    <CustomAnimatedView className="flex flex-row">
      <View className="w-1/2 pr-1">{firstNode}</View>
      <View className="w-1/2 pl-1">{secondNode}</View>
    </CustomAnimatedView>
  );
};

export default DualInputSection;
