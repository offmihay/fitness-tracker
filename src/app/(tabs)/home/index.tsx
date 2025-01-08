import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import React from "react";

import TournamentCard from "@/src/components/home/TournamentCard";
import { getFormatDateRange } from "@/src/utils/getFormatDateString";
import { useRouter } from "expo-router";
import { useAllTournaments } from "@/src/queries/tournaments";
import CustomText from "@/src/components/shared/text/CustomText";
import { useSettings } from "@/src/hooks/useSettings";
import FilterModal from "@/src/components/home/filter/FilterModal";
import SortModal from "@/src/components/home/sort/SortModal";

type HomePageProps = {};

const HomePage = ({}: HomePageProps) => {
  const { settings } = useSettings();
  const router = useRouter();

  const { data, isLoading, refetch } = useAllTournaments();

  const handleOpenDetails = (id: string) => {
    router.push({
      pathname: "/home/tournament/[id]",
      params: { id },
    });
  };

  const handleRegister = (title: string) => {
    console.log("Register", title);
  };

  const handleRefresh = () => {
    refetch();
  };

  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />}
    >
      <View style={styles.wrapper}>
        <View className="mb-4 flex flex-row justify-between">
          <SortModal />
          <FilterModal />
        </View>

        <View className="flex gap-4">
          {data &&
            !isLoading &&
            data.map((item, key) => (
              <TournamentCard
                key={key}
                handleOpenDetails={() => handleOpenDetails(item.id)}
                handleRegister={() => handleRegister(item.title)}
                imageSource={item.images && item.images[0].secure_url!}
                title={item.title}
                location={item.location}
                dateTime={getFormatDateRange(item.dateStart, item.dateEnd, settings.language)}
                patricipants={
                  item.currentParticipants && item.currentParticipants.count && item.maxParticipants
                    ? `${item.currentParticipants.count}/${item.maxParticipants}`
                    : "-"
                }
                prizePool={item.prizePool ? `${item.prizePool.toString()} UAH` : "-"}
                entryFee={item.entryFee ? `${item.entryFee.toString()} UAH` : "-"}
              />
            ))}
          {isLoading && <CustomText>Loading...</CustomText>}
        </View>
      </View>
    </ScrollView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});
