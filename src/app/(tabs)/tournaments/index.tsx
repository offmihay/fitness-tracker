import { RefreshControl, StyleSheet, View } from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import { router, useRouter } from "expo-router";
import ButtonDefault from "@/src/shared/button/ButtonDefault";
import UserTournamentCard, {
  UserTournamentCard_HEIGHT,
} from "@/src/components/tournaments/common/UserTournamentCard";
import {
  deleteTournament,
  getCreatedTournaments,
  getParticipatedTournaments,
  leaveTournament,
} from "@/src/queries/tournaments";
import LayoutFlashList from "@/src/components/navigation/layouts/LayoutFlashList";
import { emptyBaseTournament, TournamentBase } from "@/src/types/types";
import _ from "lodash";
import { useSettings } from "@/src/hooks/useSettings";
import CreatorTournamentCard from "@/src/components/tournaments/common/CreatorTournamentCard";
import TournamentSkeleton from "@/src/components/tournaments/common/skeleton/TournamentSkeleton";
import CustomText from "@/src/shared/text/CustomText";

type Props = {};

const Tournaments = ({}: Props) => {
  const { settings } = useSettings();
  const { creatorMode } = settings;

  const {
    data: dataC,
    refetch: refetchCreated,
    isFetching: isCreatedFetching,
  } = getCreatedTournaments();
  const {
    data: dataP,
    refetch: refetchParticipated,
    isFetching: isParticipatedFetching,
  } = getParticipatedTournaments();
  const isFetching = isCreatedFetching || isParticipatedFetching;

  const refetchSelected = () => {
    if (creatorMode) {
      refetchCreated();
    } else {
      refetchParticipated();
    }
  };
  const deleteTournamentMutation = deleteTournament();
  const leaveTournamentMutation = leaveTournament();

  const { push } = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setIsRefreshing(true);

    const delayPromise = new Promise((resolve) => setTimeout(resolve, 0));

    Promise.all([refetchSelected(), delayPromise]).then(() => {
      setIsRefreshing(false);
    });
  }, [refetchSelected]);

  const { dataCreated } = useMemo(() => {
    return {
      dataCreated: _.cloneDeep(dataC).sort((a, b) => a.createdAt.localeCompare(b.createdAt)),
    };
  }, [dataC]);

  const { dataParticipated } = useMemo(() => {
    return {
      dataParticipated: _.cloneDeep(dataP).sort((a, b) => a.createdAt.localeCompare(b.createdAt)),
    };
  }, [dataP]);

  const handleOpenDetails = (id: string) => {
    router.push(
      {
        pathname: "./[id]",
        params: { id },
      },
      { relativeToDirectory: true }
    );
  };

  const handleEdit = (id: string) => {
    router.push(
      {
        pathname: "./edit",
        params: { id },
      },
      { relativeToDirectory: true }
    );
  };

  const handleDelete = (id: string) => {
    deleteTournamentMutation.mutate(id, {
      onSuccess: () => {
        refetchSelected();
      },
    });
  };

  const handleLeave = (id: string) => {
    leaveTournamentMutation.mutate(id, {
      onSuccess: () => {
        refetchSelected();
      },
    });
  };

  const renderCard = useCallback(
    ({ item }: { item: TournamentBase }) => (
      <View style={{ paddingVertical: 10 }}>
        {!creatorMode ? (
          <UserTournamentCard
            data={item}
            onCardPress={() => handleOpenDetails(item.id)}
            onLeavePress={() => handleLeave(item.id)}
          />
        ) : (
          <CreatorTournamentCard
            data={item}
            onCardPress={() => handleOpenDetails(item.id)}
            onEditPress={() => handleEdit(item.id)}
            onDeletePress={() => handleDelete(item.id)}
          />
        )}
      </View>
    ),
    [handleOpenDetails, creatorMode]
  );

  const keyExtractor = useCallback(
    (item: TournamentBase) => `${creatorMode ? "creator" : "user"}-${item.id}`,
    [creatorMode]
  );

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
        name={!creatorMode ? "youParticipate" : "createdTournaments"}
        canGoBack={false}
        flashListProps={{
          scrollEnabled: !isFetching,
          data: !isFetching ? (creatorMode ? dataCreated : dataParticipated) : skeletonData,
          renderItem: !isFetching ? renderCard : renderSkeleton,
          keyExtractor: !isFetching ? keyExtractor : (item) => item.id.toString(),
          refreshControl: (
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              progressViewOffset={180}
            />
          ),
          ListEmptyComponent: (
            <CustomText>
              {creatorMode
                ? "You have not created tournament yet."
                : "You are not participating in any tournament."}
            </CustomText>
          ),
          ListHeaderComponent: creatorMode ? (
            <View style={{ paddingTop: 20, paddingBottom: 10 }}>
              <ButtonDefault
                type="grey"
                activeOpacity={0.9}
                title="Create Tournament"
                onPress={() => push("./create", { relativeToDirectory: true })}
              />
            </View>
          ) : (
            <View className="mb-4" />
          ),
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
    paddingVertical: 10,
  },
});

export default Tournaments;
