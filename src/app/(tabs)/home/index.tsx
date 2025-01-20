import { RefreshControl, StyleSheet, View } from "react-native";
import React, { useCallback, useState, memo } from "react";

import TournamentCard from "@/src/components/home/TournamentCard";
import { formatDateRange } from "@/src/utils/formatDateString";
import { useNavigation, useRouter } from "expo-router";
import { useAllTournaments } from "@/src/queries/tournaments";
import { useSettings } from "@/src/hooks/useSettings";
import HomeHeader from "@/src/components/home/HomeHeader";
import SortModal from "@/src/components/home/sort/SortModal";
import FilterModal from "@/src/components/home/filter/FilterModal";
import { TournamentRequest } from "@/src/types/tournament";
import { FlashList } from "@shopify/flash-list";
import LayoutStatic from "@/src/components/navigation/layouts/LayoutStatic";

const ListHeader = memo(() => (
  <View style={styles.headerContainer}>
    <SortModal />
    <FilterModal />
  </View>
));

type HomePageProps = {};

const HomePage = ({}: HomePageProps) => {
  const { settings } = useSettings();
  const router = useRouter();

  const { data, refetch } = useAllTournaments();

  const handleOpenDetails = useCallback(
    (id: string) => {
      router.push({
        pathname: "/home/tournament/[id]",
        params: { id },
      });
    },
    [router]
  );

  const handleRegister = useCallback((title: string) => {
    console.log("Register", title);
  }, []);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);

    const delayPromise = new Promise((resolve) => setTimeout(resolve, 0));

    Promise.all([refetch(), delayPromise]).then(() => {
      setIsRefreshing(false);
    });
  }, [refetch]);

  const renderItem = useCallback(
    ({ item }: { item: TournamentRequest }) => (
      <View style={{ paddingVertical: 10 }}>
        <TournamentCard
          handleOpenDetails={() => handleOpenDetails(item.id)}
          handleRegister={() => handleRegister(item.title)}
          data={item}
        />
      </View>
    ),
    [handleOpenDetails, handleRegister, settings.language]
  );

  const keyExtractor = useCallback((item: TournamentRequest) => item.id.toString(), []);

  return (
    <LayoutStatic name="home" disableHeader={true}>
      <View style={{ flex: 1 }}>
        <HomeHeader />
        <FlashList
          ListHeaderComponent={ListHeader}
          data={data}
          contentContainerStyle={styles.wrapper}
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          estimatedItemSize={ITEM_HEIGHT}
        />
      </View>
    </LayoutStatic>
  );
};

export default HomePage;

const ITEM_HEIGHT = 410;
const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
});
