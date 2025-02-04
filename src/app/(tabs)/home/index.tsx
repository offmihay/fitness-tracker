import { RefreshControl, StyleSheet, View } from "react-native";
import React, { useCallback, useState, memo, useEffect } from "react";
import TournamentCard, { CARD_HEIGHT } from "@/src/components/home/common/TournamentCard";
import { useRouter } from "expo-router";
import { getTournaments, registerTournament } from "@/src/queries/tournaments";
import { useSettings } from "@/src/hooks/useSettings";
import HomeHeader from "@/src/components/home/HomeHeader";
import SortDropdown from "@/src/components/home/sort/SortDropdown";
import FilterModal from "@/src/components/home/filter/FilterModal";
import { emptyBaseTournament, TournamentBase } from "@/src/types/types";
import { FlashList } from "@shopify/flash-list";
import LayoutStatic from "@/src/components/navigation/layouts/LayoutStatic";
import TournamentCardSkeleton from "@/src/components/home/common/skeleton/TournamentCardSkeleton";
import { FilterHome, SortValueHome } from "@/src/components/home/types";
import _ from "lodash";
import { emptyFilter } from "@/src/components/home/storedSettings";
import CustomText from "@/src/shared/text/CustomText";

type HomePageProps = {};

const HomePage = ({}: HomePageProps) => {
  const { settings } = useSettings();
  const router = useRouter();
  const [data, setData] = useState<TournamentBase[]>([]);

  const [filter, setFilter] = useState<FilterHome>(emptyFilter);
  const [sortBy, setSortBy] = useState<SortValueHome | null>(null);

  const { data: loadedData, refetch, isFetching } = getTournaments();

  useEffect(() => {
    const cloneData = _.cloneDeep(loadedData);
    setData(cloneData.sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
  }, [loadedData]);

  const handleOpenDetails = useCallback(
    (id: string) => {
      router.push(
        {
          pathname: "./[id]",
          params: { id },
        },
        { relativeToDirectory: true }
      );
    },
    [router]
  );

  const [isRefreshing, setIsRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setIsRefreshing(true);

    const delayPromise = new Promise((resolve) => setTimeout(resolve, 0));

    Promise.all([refetch(), delayPromise]).then(() => {
      setIsRefreshing(false);
    });
  }, [refetch]);

  const renderItem = useCallback(
    ({ item }: { item: TournamentBase }) => (
      <View style={{ paddingVertical: 10 }}>
        <TournamentCard handleOpenDetails={() => handleOpenDetails(item.id)} data={item} />
      </View>
    ),
    [handleOpenDetails]
  );

  const keyExtractor = useCallback((item: TournamentBase) => item.id.toString(), []);

  const skeletonData: TournamentBase[] = [
    { ...emptyBaseTournament, id: "empty1" },
    { ...emptyBaseTournament, id: "empty2" },
  ];
  const renderSkeleton = useCallback(
    () => (
      <View style={{ paddingVertical: 10 }}>
        <View>
          <TournamentCardSkeleton />
        </View>
      </View>
    ),
    [handleOpenDetails, settings.language]
  );

  return (
    <LayoutStatic name="home" disableHeader={true} canGoBack={false}>
      <View style={{ flex: 1 }}>
        <HomeHeader />
        <FlashList
          scrollEnabled={!isFetching}
          ListHeaderComponent={
            <View style={styles.headerContainer}>
              <SortDropdown value={sortBy} onConfirm={setSortBy} disabled={data.length === 0} />
              <FilterModal
                filterValues={filter}
                onConfirm={setFilter}
                isMutated={!!filter && !_.isEqual(JSON.parse(JSON.stringify(filter)), emptyFilter)}
                disabled={data.length === 0}
              />
            </View>
          }
          ListEmptyComponent={<CustomText>There are no upcoming tournaments</CustomText>}
          data={!isFetching ? data : skeletonData}
          contentContainerStyle={styles.wrapper}
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
          renderItem={!isFetching ? renderItem : renderSkeleton}
          keyExtractor={!isFetching ? keyExtractor : (item) => item.id.toString()}
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
