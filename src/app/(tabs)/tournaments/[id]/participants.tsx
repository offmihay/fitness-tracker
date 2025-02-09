import { RefreshControl, StyleSheet, View } from "react-native";
import React, { useCallback, useState } from "react";
import CustomText from "@/src/shared/text/CustomText";
import { useLocalSearchParams } from "expo-router";
import { getTournamentByID, removeUser } from "@/src/queries/tournaments";
import ParticipantCard from "@/src/components/home/common/ParticipantCard";
import LayoutFlashList from "@/src/components/navigation/layouts/LayoutFlashList";
import { emptyBaseTournament, Tournament } from "@/src/types/tournament";
import ParticipantCardSkeleton from "@/src/components/home/common/skeleton/ParticipantCardSkeleton";

type Props = {};

const ParticipantsPage = (props: Props) => {
  const { id, type } = useLocalSearchParams();
  const { data, refetch, isFetching } = getTournamentByID(id as string);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const removeUserMutation = removeUser();

  const isLoading = removeUserMutation.isPending || isFetching;

  const handleRemoveParticipant = (participantId: string) => {
    removeUserMutation.mutate({ participantId, tournamentId: id as string });
  };

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);

    const delayPromise = new Promise((resolve) => setTimeout(resolve, 0));

    Promise.all([refetch(), delayPromise]).then(() => {
      setIsRefreshing(false);
    });
  }, [refetch]);

  const renderCard = useCallback(
    ({ item }: { item: Tournament["participants"][number] }) => (
      <View style={{ paddingVertical: 5 }}>
        <ParticipantCard
          data={item}
          type={type === "creator" ? "creator" : "participant"}
          onRemoveParticipant={() => handleRemoveParticipant(item.id)}
        />
      </View>
    ),
    []
  );

  const renderSkeleton = useCallback(
    ({ item }: { item: Tournament["participants"][number] }) => (
      <View style={{ paddingVertical: 5 }}>
        <ParticipantCardSkeleton data={item} />
      </View>
    ),
    []
  );

  const keyExtractor = useCallback((item: Tournament["participants"][number]) => item.id, []);

  const skeletonData: Tournament["participants"] = Array.from({ length: 4 }, (_, i) => ({
    id: `skeleton${i + 1}`,
    email: "",
  }));

  return (
    <LayoutFlashList
      name="participants"
      flashListProps={{
        scrollEnabled: !isLoading,
        data: !isLoading ? data?.participants : skeletonData,
        renderItem: !isLoading ? renderCard : renderSkeleton,
        keyExtractor: !isLoading ? keyExtractor : (item) => item.id.toString(),
        refreshControl: (
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            progressViewOffset={180}
          />
        ),
        ListEmptyComponent: <CustomText>No participants yet.</CustomText>,
        ListFooterComponent: <View style={{ height: 20 }} />,
        contentContainerStyle: styles.wrapper,
        estimatedItemSize: 70,
        ListHeaderComponent: <View style={{ height: 10 }}></View>,
      }}
    />
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
  },
});

export default ParticipantsPage;
