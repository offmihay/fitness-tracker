import { RefreshControl, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import { router } from "expo-router";
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
import { useSettings } from "@/src/hooks/useSettings";
import CreatorTournamentCard from "@/src/components/tournaments/common/CreatorTournamentCard";
import TournamentSkeleton from "@/src/components/tournaments/common/skeleton/TournamentSkeleton";
import CustomText from "@/src/shared/text/CustomText";
import { Feather } from "@expo/vector-icons";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import FilterDropdownMenu from "@/src/components/tournaments/common/FilterDropdownMenu";
import { useToast } from "@/src/hooks/useToast";
import { t } from "i18next";

type Filter = "participant" | "organizer" | "all";

const FinishedTournaments = () => {
  const { settings } = useSettings();
  const { data: dataFetch, refetch, isFetching } = getMyTournaments(true);
  const theme = useCustomTheme();
  const deleteTournamentMutation = deleteTournament();
  const leaveTournamentMutation = leaveTournament();
  const updateStatusMutation = updateStatus();
  const { showSuccessToast } = useToast();

  const [filter, setFilter] = useState<Filter>("all");

  const [isRefreshing, setIsRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    refetch();
    if (!isFetching) {
      setIsRefreshing(false);
    }
  }, [refetch, isFetching]);

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
    deleteTournamentMutation.mutate(id, {
      onSuccess: () => showSuccessToast("tournament_deleted"),
    });
  };

  const handleLeave = (id: string) => {
    leaveTournamentMutation.mutate(id, { onSuccess: () => showSuccessToast("tournament_left") });
  };

  const handleChangeStatus = (id: string, isActive: boolean) => {
    updateStatusMutation.mutate(
      { tournamentId: id, isActive },
      {
        onSuccess: () => {
          showSuccessToast("tournament_activated");
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
    <LayoutFlashList
      headerConfig={{
        nodeHeader: () => (
          <View className="absolute bottom-2 right-4">
            <View className="flex flex-row gap-4">
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
      name="archive"
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
        ListEmptyComponent: <CustomText>{t("errors.no_tournaments_found")}</CustomText>,
        ListHeaderComponent: <View className="mb-4" />,
        ListFooterComponent: <View className="mb-4" />,
        contentContainerStyle: styles.wrapper,
        estimatedItemSize: UserTournamentCard_HEIGHT + 20,
      }}
    />
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
