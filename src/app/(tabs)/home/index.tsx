import { RefreshControl, StyleSheet, View } from "react-native";
import React, { useCallback, useState } from "react";

import TournamentCard from "@/src/components/home/TournamentCard";
import { formatDateRange } from "@/src/utils/formatDateString";
import { useNavigation, useRouter } from "expo-router";
import { useAllTournaments } from "@/src/queries/tournaments";
import { useSettings } from "@/src/hooks/useSettings";
import LayoutFlatList from "@/src/components/navigation/layouts/LayoutFlatList";
import HomeHeader from "@/src/components/home/HomeHeader";
import SortModal from "@/src/components/home/sort/SortModal";
import FilterModal from "@/src/components/home/filter/FilterModal";

type HomePageProps = {};

const HomePage = ({}: HomePageProps) => {
  const { settings } = useSettings();
  const router = useRouter();
  const navigation = useNavigation();
  navigation;

  const { data, refetch } = useAllTournaments();

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
    <LayoutFlatList
      name="home"
      headerConfig={{ maxHeight: 110, minHeight: 110 }}
      renderHeader={() => <HomeHeader />}
      ListHeaderComponent={() => (
        <View className="flex flex-row justify-between">
          <SortModal />
          <FilterModal />
        </View>
      )}
      data={data}
      contentContainerStyle={styles.wrapper}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
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
      initialNumToRender={2}
      maxToRenderPerBatch={1}
      updateCellsBatchingPeriod={50}
    />
  );
};

export default HomePage;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    display: "flex",
    gap: 16,
  },
});
