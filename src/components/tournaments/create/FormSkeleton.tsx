import React from "react";
import Skeleton from "@/src/shared/skeleton/Skeleton";
import { View } from "react-native";

export const FormSkeleton = () => {
  return (
    <>
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
