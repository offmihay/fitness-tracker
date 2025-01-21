import { RefreshControl, StyleSheet, View } from "react-native";
import React, { useCallback, useState, memo, useEffect } from "react";
import TournamentCard, { CARD_HEIGHT } from "@/src/components/home/TournamentCard";
import { useRouter } from "expo-router";
import { useAllTournaments } from "@/src/queries/tournaments";
import { useSettings } from "@/src/hooks/useSettings";
import HomeHeader from "@/src/components/home/HomeHeader";
import SortModal from "@/src/components/home/sort/SortModal";
import FilterModal from "@/src/components/home/filter/FilterModal";
import { emptyTournamentRequest, TournamentRequest } from "@/src/types/tournament";
import { FlashList } from "@shopify/flash-list";
import LayoutStatic from "@/src/components/navigation/layouts/LayoutStatic";
import TournamentCardSkeleton from "@/src/components/home/skeleton/TournamentCardSkeleton";

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
  const [data, setData] = useState<TournamentRequest[]>([]);

  const { data: loadedData, refetch, isFetching } = useAllTournaments();
  useEffect(() => {
    setData(loadedData.reverse());
  }, [loadedData]);

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

  const skeletonData: TournamentRequest[] = [
    { ...emptyTournamentRequest, id: "empty1" },
    { ...emptyTournamentRequest, id: "empty2" },
  ];
  const renderSkeleton = useCallback(
    () => (
      <View style={{ paddingVertical: 10 }}>
        <View>
          <TournamentCardSkeleton />
        </View>
      </View>
    ),
    [handleOpenDetails, handleRegister, settings.language]
  );

  const isLoaded = !isFetching && data.length !== 0;

  return (
    <LayoutStatic name="home" disableHeader={true}>
      <View style={{ flex: 1 }}>
        <HomeHeader />
        <FlashList
          scrollEnabled={isLoaded}
          ListHeaderComponent={ListHeader}
          data={isLoaded ? data : skeletonData}
          contentContainerStyle={styles.wrapper}
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
          renderItem={isLoaded ? renderItem : renderSkeleton}
          keyExtractor={isLoaded ? keyExtractor : (item) => item.id.toString()}
          estimatedItemSize={CARD_HEIGHT + 20}
        />
      </View>
    </LayoutStatic>
  );
};

export default HomePage;

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
