import { ActivityIndicator, RefreshControl, StyleSheet, View } from "react-native";
import React, { useCallback, useState, memo, useEffect, useMemo } from "react";
import TournamentCard, { CARD_HEIGHT } from "@/src/components/home/common/TournamentCard";
import { useNavigation, useRouter } from "expo-router";
import { getAllTournaments, registerTournament } from "@/src/queries/tournaments";
import { useSettings } from "@/src/hooks/useSettings";
import HomeHeader from "@/src/components/home/HomeHeader";
import SortDropdown from "@/src/components/home/sort/SortDropdown";
import FilterModal from "@/src/components/home/filter/FilterModal";
import { emptyBaseTournament, TournamentBase } from "@/src/types/tournament";
import { FlashList } from "@shopify/flash-list";
import LayoutStatic from "@/src/components/navigation/layouts/LayoutStatic";
import TournamentCardSkeleton from "@/src/components/home/common/skeleton/TournamentCardSkeleton";
import { FilterHome, Location, SortValueHome, TournamentQuery } from "@/src/components/home/types";
import _, { hasIn } from "lodash";
import { emptyFilter } from "@/src/components/home/storedSettings";
import CustomText from "@/src/shared/text/CustomText";
import { useDebounce } from "@/src/hooks/useDebounce";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { t } from "i18next";
import { useRefreshByUser } from "@/src/hooks/useRefetchByUser";
import LocationModal from "@/src/components/home/location/LocationModal";
import { GeoCoordinates, useUserCoordinates } from "@/src/queries/location";

type HomePageProps = {};

const HomePage = ({}: HomePageProps) => {
  const { data: userCoords, isFetched: isFetchedUserCoords } = useUserCoordinates(true);
  const router = useRouter();
  const navigation = useNavigation();

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

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<FilterHome>(emptyFilter);
  const [sortBy, setSortBy] = useState<SortValueHome | null>(null);

  const [location, setLocation] = useState<Location | null | undefined>(undefined);

  const setLocationDefault = (coords: GeoCoordinates | undefined | null) => {
    setLocation(() => {
      if (coords) {
        return {
          geoCoordinates: {
            latitude: coords.latitude,
            longitude: coords.longitude,
          },
          radius: 50,
        };
      }
      return null;
    });
  };

  useEffect(() => {
    if (isFetchedUserCoords) {
      setLocationDefault(userCoords);
    }
  }, [userCoords, isFetchedUserCoords]);

  const transformSortQuery = (sortBy: SortValueHome | null) => {
    let sortQuery: Pick<TournamentQuery, "sortBy" | "sortOrder"> | {};
    switch (sortBy) {
      case SortValueHome.Upcoming:
        sortQuery = { sortBy: "dateStart", sortOrder: "asc" };
        break;
      case SortValueHome.PrizePool:
        sortQuery = { sortBy: "prizePool", sortOrder: "desc" };
        break;
      case SortValueHome.Newest:
        sortQuery = { sortBy: "createdAt", sortOrder: "desc" };
        break;
      default:
        sortQuery = {};
        break;
    }
    return sortQuery;
  };
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const transformLocationQuery = (location: Location | null | undefined) => {
    if (location && location.geoCoordinates?.latitude && location.geoCoordinates?.longitude) {
      return {
        lat: location.geoCoordinates.latitude,
        lng: location.geoCoordinates.longitude,
        radius: location.radius,
      };
    }
    return {};
  };

  const query = useMemo<Partial<TournamentQuery>>(() => {
    return {
      ...filter,
      ...transformSortQuery(sortBy),
      ...transformLocationQuery(location),
      search: debouncedSearchQuery,
    };
  }, [filter, sortBy, location, debouncedSearchQuery]);

  const {
    data: allFetchedData,
    isLoading,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = getAllTournaments(query, location !== undefined);

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

  const { isRefreshing, refresh, cancelRefresh } = useRefreshByUser(resetInfiniteQueryPagination);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", (e) => {
      cancelRefresh();
    });

    return unsubscribe;
  }, [navigation]);

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
            <>
              <LocationModal
                location={location}
                onConfirm={setLocation}
                onReset={() => setLocationDefault(userCoords)}
              />
              <View style={styles.headerContainer}>
                <SortDropdown
                  value={sortBy}
                  onConfirm={setSortBy}
                  disabled={!displayData || displayData.length === 0}
                />

                <FilterModal
                  filterValues={filter}
                  onConfirm={setFilter}
                  isMutated={
                    !!filter && !_.isEqual(JSON.parse(JSON.stringify(filter)), emptyFilter)
                  }
                />
              </View>
            </>
          }
          ListEmptyComponent={
            !isFetching && !hasNextPage && location !== undefined ? (
              <CustomText className="mt-4">{t("errors.no_tournaments_found")}</CustomText>
            ) : null
          }
          data={displayData}
          contentContainerStyle={styles.wrapper}
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refresh} />}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          estimatedItemSize={CARD_HEIGHT + 20}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          ListFooterComponent={
            isFetching || location === undefined ? (
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
    paddingVertical: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    marginBottom: 4,
  },
});
