import { View } from "react-native";
import React from "react";
import Skeleton from "@/src/shared/skeleton/Skeleton";

const TournamentDetailsSkeleton = () => {
  return (
    <View className="flex flex-col gap-6">
      <Skeleton height={30} width={120} />
      <View style={{ width: "100%", borderRadius: 10, height: 250, overflow: "hidden" }}>
        <Skeleton height={250} />
      </View>

      <View style={{ position: "relative" }}>
        <Skeleton height={50} wrapperStyle={{ borderRadius: 10 }} />
      </View>
      <View className="flex gap-4">
        <Skeleton height={25} width={200} />
        <Skeleton height={25} width={250} />
        <Skeleton height={25} width={150} />
      </View>
      <View className="flex gap-4 mt-2">
        <Skeleton height={25} width={300} />
        <Skeleton height={25} width={250} />
      </View>
    </View>
  );
};

export default TournamentDetailsSkeleton;
