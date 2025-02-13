import { RefreshControl, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import { router, useRouter } from "expo-router";
import ButtonDefault from "@/src/shared/button/ButtonDefault";
import UserTournamentCard, {
  UserTournamentCard_HEIGHT,
} from "@/src/components/tournaments/common/UserTournamentCard";
import {
  deleteTournament,
  getMyTournaments,
  leaveTournament,
  updateStatus,
} from "@/src/queries/tournaments";
import LayoutFlashList from "@/src/components/navigation/layouts/LayoutFlashList";
import { emptyBaseTournament, TournamentBase } from "@/src/types/tournament";
import _ from "lodash";
import { useSettings } from "@/src/hooks/useSettings";
import CreatorTournamentCard from "@/src/components/tournaments/common/CreatorTournamentCard";
import TournamentSkeleton from "@/src/components/tournaments/common/skeleton/TournamentSkeleton";
import CustomText from "@/src/shared/text/CustomText";
import CustomSwitch from "@/src/shared/switch/Switch";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import FilterDropdownMenu from "@/src/components/tournaments/common/FilterDropdownMenu";

type Props = {};

type Filter = "participant" | "organizer" | "all";

const FinishedTournaments = ({}: Props) => {
  const { settings, updateSettings } = useSettings();
  const { data: dataFetch, refetch, isFetching } = getMyTournaments(true);
  const theme = useCustomTheme();
  const deleteTournamentMutation = deleteTournament();
  const leaveTournamentMutation = leaveTournament();
  const updateStatusMutation = updateStatus();

  const { isMutationsPending } = useMemo(() => {
    return {
      isMutationsPending:
        deleteTournamentMutation.isPending ||
        leaveTournamentMutation.isPending ||
        updateStatusMutation.isPending,
    };
  }, [
    deleteTournamentMutation.isPending,
    leaveTournamentMutation.isPending,
    updateStatusMutation.isPending,
  ]);

  const [filter, setFilter] = useState<Filter>("all");

  const [isRefreshing, setIsRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setIsRefreshing(true);

    const delayPromise = new Promise((resolve) => setTimeout(resolve, 0));

    Promise.all([refetch(), delayPromise]).then(() => {
      setIsRefreshing(false);
    });
  }, [refetch]);

  const { data } = useMemo(() => {
    if (filter === "all") {
      return {
        data: dataFetch,
      };
    }
    const filteredData = dataFetch?.filter((t) => t.role === filter);
    return {
      data: filteredData,
    };
  }, [dataFetch, filter]);

  const handleOpenDetails = (id: string) => {
    router.push({
      pathname: "./[id]",
      params: { id },
    });
  };

  const handleEdit = (id: string) => {
    router.push({
      pathname: "./edit",
      params: { id },
    });
  };

  const handleDelete = (id: string) => {
    deleteTournamentMutation.mutate(id);
  };

  const handleLeave = (id: string) => {
    leaveTournamentMutation.mutate(id);
  };

  const handleChangeStatus = (id: string, isActive: boolean) => {
    updateStatusMutation.mutate(
      { tournamentId: id, isActive },
      {
        onSuccess: () => {
          router.back();
        },
      }
    );
  };

  const renderCard = useCallback(
    ({ item }: { item: TournamentBase }) => (
      <View style={{ paddingVertical: 10 }}>
        {item.role === "participant" && (
          <UserTournamentCard
            data={item}
            onCardPress={() => handleOpenDetails(item.id)}
            onLeavePress={() => handleLeave(item.id)}
          />
        )}
        {item.role === "organizer" && (
          <CreatorTournamentCard
            data={item}
            onCardPress={() => handleOpenDetails(item.id)}
            onEditPress={() => handleEdit(item.id)}
            onDeletePress={() => handleDelete(item.id)}
            changeStatusPress={(isActive) => handleChangeStatus(item.id, isActive)}
          />
        )}
      </View>
    ),
    [handleOpenDetails]
  );

  const keyExtractor = useCallback((item: TournamentBase) => item.id, []);

  const skeletonData: TournamentBase[] = [
    { ...emptyBaseTournament, id: "empty1" },
    { ...emptyBaseTournament, id: "empty2" },
    { ...emptyBaseTournament, id: "empty3" },
    { ...emptyBaseTournament, id: "empty4" },
  ];
  const renderSkeleton = useCallback(
    () => (
      <View style={{ paddingVertical: 10 }}>
        <View>
          <TournamentSkeleton />
        </View>
      </View>
    ),
    [handleOpenDetails, settings.language]
  );

  return (
    <>
      <LayoutFlashList
        loaderEnabled={isMutationsPending}
        headerConfig={{
          nodeHeader: () => (
            <View className="flex h-full justify-end items-end">
              <View className="flex flex-row pr-4 pb-2 gap-4">
                <FilterDropdownMenu value={filter} onConfirm={setFilter}>
                  <TouchableOpacity
                    style={[styles.headerBtn, { backgroundColor: theme.colors.surfaceLight }]}
                  >
                    <Feather name="filter" size={22} color={theme.colors.text} />
                  </TouchableOpacity>
                </FilterDropdownMenu>
              </View>
            </View>
          ),
        }}
        name="finished"
        canGoBack={true}
        flashListProps={{
          scrollEnabled: !isFetching,
          data: !isFetching ? data : skeletonData,
          renderItem: !isFetching ? renderCard : renderSkeleton,
          keyExtractor: !isFetching ? keyExtractor : (item) => item.id.toString(),
          refreshControl: (
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              progressViewOffset={180}
            />
          ),
          ListEmptyComponent: <CustomText>Tournaments not found.</CustomText>,
          ListHeaderComponent: <View className="mb-4" />,
          ListFooterComponent: <View className="mb-4" />,
          contentContainerStyle: styles.wrapper,
          estimatedItemSize: UserTournamentCard_HEIGHT + 20,
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
  },

  headerBtn: {
    height: 42,
    width: 42,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});

export default FinishedTournaments;
