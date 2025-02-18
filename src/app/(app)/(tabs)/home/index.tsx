import { ActivityIndicator, RefreshControl, StyleSheet, View } from "react-native";
import React, { useCallback, useState, memo, useEffect, useMemo } from "react";
import TournamentCard, { CARD_HEIGHT } from "@/src/components/home/common/TournamentCard";
import { useRouter } from "expo-router";
import { getAllTournaments, registerTournament } from "@/src/queries/tournaments";
import { useSettings } from "@/src/hooks/useSettings";
import HomeHeader from "@/src/components/home/HomeHeader";
import SortDropdown from "@/src/components/home/sort/SortDropdown";
import FilterModal from "@/src/components/home/filter/FilterModal";
import { emptyBaseTournament, TournamentBase } from "@/src/types/tournament";
import { FlashList } from "@shopify/flash-list";
import LayoutStatic from "@/src/components/navigation/layouts/LayoutStatic";
import TournamentCardSkeleton from "@/src/components/home/common/skeleton/TournamentCardSkeleton";
import { FilterHome, SortValueHome, TournamentQuery } from "@/src/components/home/types";
import _, { hasIn } from "lodash";
import { emptyFilter } from "@/src/components/home/storedSettings";
import CustomText from "@/src/shared/text/CustomText";
import { useDebounce } from "@/src/hooks/useDebounce";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { t } from "i18next";

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
      case SortValueHome.Upcoming:
        sortQuery = { sortBy: "dateStart", sortOrder: "asc" };
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

  const {
    data: allFetchedData,
    error,
    isLoading,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = getAllTournaments(query);

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

  const queryClient = useQueryClient();
  const resetInfiniteQueryPagination = async (): Promise<void> => {
    queryClient.setQueryData<InfiniteData<TournamentBase[]>>(["tournaments", query], (oldData) => {
      if (!oldData) return undefined;

      return {
        pages: [],
        pageParams: oldData.pageParams.slice(0, 1),
      };
    });
    await queryClient.invalidateQueries({ queryKey: ["tournaments", query] });
  };

  const [isRefreshing, setIsRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    try {
      await resetInfiniteQueryPagination();
    } finally {
      setIsRefreshing(false);
    }
  }, [resetInfiniteQueryPagination, isRefreshing]);

  const renderItem = useCallback(
    ({ item }: { item: TournamentBase }) => (
      <View style={{ paddingVertical: 10 }}>
        <TournamentCard handleOpenDetails={() => handleOpenDetails(item.id)} data={item} />
      </View>
    ),
    [handleOpenDetails]
  );

  const displayData = useMemo(() => {
    const loadedData = allFetchedData?.pages.flat() ?? [];

    return loadedData;
  }, [allFetchedData, isLoading, isFetchingNextPage]);

  return (
    <LayoutStatic name="home" disableHeader={true} canGoBack={false}>
      <View style={{ flex: 1 }}>
        <HomeHeader value={searchQuery} onChangeText={setSearchQuery} />
        <FlashList
          ListHeaderComponent={
            <View style={styles.headerContainer}>
              <SortDropdown
                value={sortBy}
                onConfirm={setSortBy}
                disabled={!displayData || displayData.length === 0}
              />
              <FilterModal
                filterValues={filter}
                onConfirm={setFilter}
                isMutated={!!filter && !_.isEqual(JSON.parse(JSON.stringify(filter)), emptyFilter)}
              />
            </View>
          }
          ListEmptyComponent={
            !isLoading && !hasNextPage && !isRefreshing ? (
              <CustomText>{t("errors.no_tournaments_found")}</CustomText>
            ) : null
          }
          data={displayData}
          contentContainerStyle={styles.wrapper}
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          estimatedItemSize={CARD_HEIGHT + 20}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          ListFooterComponent={
            isFetching ? (
              <>
                <View style={{ paddingVertical: 10 }}>
                  <TournamentCardSkeleton />
                </View>
                <View style={{ paddingVertical: 10 }}>
                  <TournamentCardSkeleton />
                </View>
                <ActivityIndicator size="small" color="white" />
              </>
            ) : null
          }
          onEndReachedThreshold={0.5}
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
