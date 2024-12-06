import { ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import testData from "../../../../assets/testData.json";
import TournamentCard from "@/src/components/home/TournamentCard";
import { getFormatDateRange } from "@/src/utils/geFormatDateString";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
type HomePageProps = {};

const HomePage = ({}: HomePageProps) => {
  const theme = useCustomTheme();

  const data = testData;

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <View className="flex gap-4">
          {data.map((item, key) => (
            <TournamentCard
              handleOpenDetails={() => console.log("Open details", item.title)}
              handleRegister={() => console.log("Register", item.title)}
              key={key}
              imageSource={item.imageUrl}
              title={item.title}
              location={item.location}
              dateTime={getFormatDateRange(item.dateStart, item.dateEnd)}
              patricipants={`${item.currentParticipants.count}/${item.maxParticipants}`}
              prizePool={`${item.prizePool.toString()} UAH`}
            />
          ))}
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
