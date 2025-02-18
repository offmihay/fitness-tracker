import { RefreshControl, StyleSheet, View } from "react-native";
import React, { useCallback, useState } from "react";
import CustomText from "@/src/shared/text/CustomText";
import { useLocalSearchParams } from "expo-router";
import { getTournamentByID } from "@/src/queries/tournaments";
import ParticipantCard from "@/src/components/home/common/ParticipantCard";
import LayoutFlashList from "@/src/components/navigation/layouts/LayoutFlashList";
import { Tournament } from "@/src/types/tournament";
import { t } from "i18next";

type Props = {};

const ParticipantsPage = (props: Props) => {
  const { id } = useLocalSearchParams();
  const { data, refetch, isLoading } = getTournamentByID(id as string);
  const [isRefreshing, setIsRefreshing] = useState(false);

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
        <ParticipantCard data={item} type="participant" />
      </View>
    ),
    []
  );

  const keyExtractor = useCallback((item: Tournament["participants"][number]) => item.id, []);

  return (
    <LayoutFlashList
      name="participants"
      flashListProps={{
        scrollEnabled: !isLoading,
        data: data?.participants,
        renderItem: renderCard,
        keyExtractor: keyExtractor,
        refreshControl: (
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            progressViewOffset={180}
          />
        ),
        ListEmptyComponent: <CustomText>{t("errors.no_participants_yet")}</CustomText>,
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
