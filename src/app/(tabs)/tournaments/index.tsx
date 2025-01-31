import { RefreshControl, StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { router, useNavigation, useRouter } from "expo-router";
import ButtonDefault from "@/src/shared/button/ButtonDefault";
import UserTournamentCard, {
  UserTournamentCard_HEIGHT,
} from "@/src/components/tournaments/UserTournamentCard";
import { deleteTournament, getTournaments } from "@/src/queries/tournaments";
import LayoutFlashList from "@/src/components/navigation/layouts/LayoutFlashList";
import { TournamentRequest } from "@/src/types/tournament";
import CustomText from "@/src/shared/text/CustomText";
import CustomSwitch from "@/src/shared/switch/Switch";
import CreatorTournamentCard from "@/src/components/tournaments/CreatorTournamentCard";
import _ from "lodash";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";

type Props = {};

const Tournaments = ({}: Props) => {
  const { data: loadedData, refetch, isFetching } = getTournaments();
  const deleteTournamentMutation = deleteTournament();
  const [creatorMode, setCreatorMode] = useState(false);
  const { push } = useRouter();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setIsRefreshing(true);

    const delayPromise = new Promise((resolve) => setTimeout(resolve, 0));

    Promise.all([refetch(), delayPromise]).then(() => {
      setIsRefreshing(false);
    });
  }, [refetch]);

  const [data, setData] = useState<TournamentRequest[]>([]);
  const [data2, setData2] = useState<TournamentRequest[]>([]);

  useEffect(() => {
    const cloneData = _.cloneDeep(loadedData);
    const cloneData2 = _.cloneDeep(loadedData);
    setData(cloneData.reverse());
    setData2(cloneData2);
  }, [loadedData]);

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
    deleteTournamentMutation.mutate(id);
    refetch();
  };

  useEffect(() => {
    refetch();
  }, [creatorMode]);

  const renderCard = useCallback(
    ({ item }: { item: TournamentRequest }) => (
      <View style={{ paddingVertical: 10 }}>
        {!creatorMode ? (
          <UserTournamentCard data={item} onCardPress={() => handleOpenDetails(item.id)} />
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
    (item: TournamentRequest) => `${creatorMode ? "creator" : "user"}-${item.id}`,
    [creatorMode]
  );

  return (
    <>
      <LayoutFlashList
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
        headerConfig={{
          nodeHeader: () => (
            <View className="flex h-full justify-end">
              <View className="flex items-end justify-center h-[60]">
                <View className="flex flex-row gap-4 items-center p-4">
                  <CustomText weight="bold">Creator</CustomText>
                  <CustomSwitch defaultValue={false} toggleSwitch={setCreatorMode} />
                </View>
              </View>
            </View>
          ),
        }}
        name="tournaments"
        data={!creatorMode ? data : data2}
        renderItem={renderCard}
        keyExtractor={keyExtractor}
        estimatedItemSize={UserTournamentCard_HEIGHT + 20}
        contentContainerStyle={styles.wrapper}
        ListHeaderComponent={
          creatorMode ? (
            <View style={{ paddingTop: 20, paddingBottom: 10 }}>
              <ButtonDefault
                type="grey"
                activeOpacity={0.9}
                title="Create Tournament"
                onPress={() => push("./create", { relativeToDirectory: true })}
              />
            </View>
          ) : null
        }
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
