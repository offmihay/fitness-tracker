import { RefreshControl, StyleSheet, View } from "react-native";
import React, { useCallback, useState, memo, useEffect, useMemo } from "react";
import TournamentCard, { CARD_HEIGHT } from "@/src/components/home/common/TournamentCard";
import { useRouter } from "expo-router";
import { getTournaments, registerTournament } from "@/src/queries/tournaments";
import { useSettings } from "@/src/hooks/useSettings";
import HomeHeader from "@/src/components/home/HomeHeader";
import SortDropdown from "@/src/components/home/sort/SortDropdown";
import FilterModal from "@/src/components/home/filter/FilterModal";
import { emptyBaseTournament, TournamentBase } from "@/src/types/tournament";
import { FlashList } from "@shopify/flash-list";
import LayoutStatic from "@/src/components/navigation/layouts/LayoutStatic";
import TournamentCardSkeleton from "@/src/components/home/common/skeleton/TournamentCardSkeleton";
import { FilterHome, SortValueHome, TournamentQuery } from "@/src/components/home/types";
import _ from "lodash";
import { emptyFilter } from "@/src/components/home/storedSettings";
import CustomText from "@/src/shared/text/CustomText";
import { useDebounce } from "@/src/hooks/useDebounce";

type HomePageProps = {};

const HomePage = ({}: HomePageProps) => {
  const { settings } = useSettings();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<FilterHome>(emptyFilter);
  const [sortBy, setSortBy] = useState<SortValueHome | null>(null);

  const transformSortQuery = (sortBy: SortValueHome | null) => {
    let sortQuery: Pick<TournamentQuery, "sortBy" | "sortOrder"> | {};
    switch (sortBy) {
      case SortValueHome.Newest:
        sortQuery = { sortBy: "dateStart", sortOrder: "desc" };
        break;
      case SortValueHome.PrizePool:
        sortQuery = { sortBy: "prizePool", sortOrder: "desc" };
        break;
      default:
        sortQuery = {};
        break;
    }
    return sortQuery;
  };
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const query = useMemo<Partial<TournamentQuery>>(() => {
    return {
      ...filter,
      ...transformSortQuery(sortBy),
      search: debouncedSearchQuery,
    };
  }, [filter, sortBy, debouncedSearchQuery]);

  const { data: loadedData, refetch, isFetching } = getTournaments(query);

  const { data } = useMemo(() => {
    return {
      data: loadedData,
    };
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
        <HomeHeader value={searchQuery} onChangeText={setSearchQuery} />
        <FlashList
          scrollEnabled={!isFetching}
          ListHeaderComponent={
            <View style={styles.headerContainer}>
              <SortDropdown value={sortBy} onConfirm={setSortBy} disabled={data.length === 0} />
              <FilterModal
                filterValues={filter}
                onConfirm={setFilter}
                isMutated={!!filter && !_.isEqual(JSON.parse(JSON.stringify(filter)), emptyFilter)}
              />
            </View>
          }
          ListEmptyComponent={<CustomText>No tournaments found.</CustomText>}
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
