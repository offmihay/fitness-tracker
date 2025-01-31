import React from "react";
import CustomText from "@/src/shared/text/CustomText";
import Skeleton from "@/src/shared/skeleton/Skeleton";
import { View } from "react-native";

export const FormSkeleton = () => {
  return (
    <>
      <CustomText type="subtitle" className="ml-1 mb-3">
        Tournament Details
      </CustomText>
      <View className="flex gap-8">
        <View className="flex gap-6 mt-8">
          <Skeleton height={35} width={250} />
          <Skeleton height={35} width={200} />
          <Skeleton height={100} width={300} />
        </View>
        <View className="flex gap-4 mt-4">
          <Skeleton height={35} width={250} />
          <Skeleton height={35} width={150} />
          <Skeleton height={35} width={300} />
        </View>
        <View className="flex gap-4 mt-4">
          <Skeleton height={35} width={250} />
          <Skeleton height={35} width={150} />
          <Skeleton height={35} width={300} />
        </View>
        <View className="flex gap-4 mt-4">
          <Skeleton height={35} width={250} />
          <Skeleton height={35} width={150} />
          <Skeleton height={35} width={300} />
        </View>
      </View>
    </>
  );
};
