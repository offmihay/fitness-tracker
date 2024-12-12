import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";

import TournamentCard from "@/src/components/home/TournamentCard";
import { getFormatDateRange } from "@/src/utils/geFormatDateString";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { useRouter } from "expo-router";
import { useAllTournamentsQuery } from "@/src/queries/tournaments";
import CustomText from "@/src/components/shared/text/CustomText";

type HomePageProps = {};

const HomePage = ({}: HomePageProps) => {
  const theme = useCustomTheme();
  const router = useRouter();

  const { data, isLoading } = useAllTournamentsQuery();

  const handleOpenDetails = (id: string) => {
    router.push({
      pathname: "/home/tournament/[id]",
      params: { id },
    });
  };

  const handleRegister = (title: string) => {
    console.log("Register", title);
  };

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <View className="flex gap-4">
          {data &&
            !isLoading &&
            data.map((item, key) => (
              <TournamentCard
                key={key}
                handleOpenDetails={() => handleOpenDetails(item.id)}
                handleRegister={() => handleRegister(item.title)}
                imageSource={item.imageUrl}
                title={item.title}
                location={item.location}
                dateTime={getFormatDateRange(item.dateStart, item.dateEnd)}
                patricipants={`${item.currentParticipants.count}/${item.maxParticipants}`}
                prizePool={`${item.prizePool.toString()} UAH`}
                entryFee={`${item.entryFee.toString()} UAH`}
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
