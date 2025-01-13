import { FlatList, RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import React, { useCallback, useState } from "react";

import TournamentCard from "@/src/components/home/TournamentCard";
import { formatDateRange } from "@/src/utils/formatDateString";
import { useRouter } from "expo-router";
import { useAllTournaments } from "@/src/queries/tournaments";
import CustomText from "@/src/components/shared/text/CustomText";
import { useSettings } from "@/src/hooks/useSettings";
import FilterModal from "@/src/components/home/filter/FilterModal";
import SortModal from "@/src/components/home/sort/SortModal";
import useScrollProps from "@/src/hooks/useScrollProps";

type HomePageProps = {};

const HomePage = ({}: HomePageProps) => {
  const { settings } = useSettings();
  const router = useRouter();

  const { data, isFetching, refetch } = useAllTournaments();

  const handleOpenDetails = (id: string) => {
    router.push({
      pathname: "/home/tournament/[id]",
      params: { id },
    });
  };

  const handleRegister = (title: string) => {
    console.log("Register", title);
  };

  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);

    const delayPromise = new Promise((resolve) => setTimeout(resolve, 1000));

    Promise.all([refetch(), delayPromise]).then(() => {
      setIsRefreshing(false);
    });
  }, [refetch]);

  return (
    <>
      <FlatList
        data={data}
        contentContainerStyle={styles.wrapper}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
        ListHeaderComponent={() => (
          <View className="mb-4 flex flex-row justify-between">
            <SortModal />
            <FilterModal />
          </View>
        )}
        renderItem={({ item }) => (
          <TournamentCard
            handleOpenDetails={() => handleOpenDetails(item.id)}
            handleRegister={() => handleRegister(item.title)}
            imageSource={item.images && item.images[0].secureUrl}
            title={item.title}
            location={item.location}
            dateTime={formatDateRange(item.dateStart, item.dateEnd, settings.language)}
            patricipants={
              item.currentParticipants && item.currentParticipants.count && item.maxParticipants
                ? `${item.currentParticipants.count}/${item.maxParticipants}`
                : "-"
            }
            prizePool={item.prizePool ? `${item.prizePool.toString()} UAH` : "-"}
            entryFee={item.entryFee ? `${item.entryFee.toString()} UAH` : "-"}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    display: "flex",
    gap: 16,
  },
});
