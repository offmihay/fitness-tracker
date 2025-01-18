import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";

import TournamentCard from "@/src/components/home/TournamentCard";
import { formatDateRange } from "@/src/utils/formatDateString";
import { useNavigation, useRouter } from "expo-router";
import { useAllTournaments } from "@/src/queries/tournaments";
import { useSettings } from "@/src/hooks/useSettings";
import FilterModal from "@/src/components/home/filter/FilterModal";
import SortModal from "@/src/components/home/sort/SortModal";
import CustomHeader from "@/src/components/navigation/headers/CustomHeader";
import CustomLayout from "@/src/components/navigation/CustomLayout";
import LayoutFlatList from "@/src/components/navigation/layouts/LayoutFlatList";
import CustomText from "@/src/components/shared/text/CustomText";
import CustomTextInput from "@/src/components/shared/input/CustomTextInput";
import LayoutScrollView from "@/src/components/navigation/layouts/LayoutScrollView";
import DismissKeyboardView from "@/src/components/shared/view/DismissKeyboardView";

type HomePageProps = {};

const HomePage = ({}: HomePageProps) => {
  const { settings } = useSettings();
  const router = useRouter();
  const navigation = useNavigation();
  navigation;

  const { data, refetch } = useAllTournaments();

  const handleOpenDetails = (id: string) => {
    router.push({
      pathname: "/home/tournament/[id]",
      params: { id },
    });
  };

  const handleRegister = (title: string) => {
    console.log("Register", title);
  };

  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);

    const delayPromise = new Promise((resolve) => setTimeout(resolve, 1000));

    Promise.all([refetch(), delayPromise]).then(() => {
      setIsRefreshing(false);
    });
  }, [refetch]);

  const [value, setValue] = useState("");

  return (
    <LayoutFlatList
      headerConfig={{ maxHeight: 160, minHeight: 160 }}
      renderHeader={() => (
        <DismissKeyboardView
          style={{
            paddingHorizontal: 20,
            paddingTop: 50,
            paddingBottom: 10,
            marginBottom: 20,
            flex: 1,
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <CustomTextInput
            placeholder="Search..."
            styleWrapper={{ borderRadius: 100, minHeight: 0, borderWidth: 1 }}
            useClearButton
            value={value}
            onChangeText={setValue}
          />
          <View className="mt-2 flex flex-row justify-between">
            <SortModal />
            <FilterModal />
          </View>
        </DismissKeyboardView>
      )}
      data={data}
      contentContainerStyle={styles.wrapper}
      // ListHeaderComponent={() => (
      //   <View className="mb-4 flex flex-row justify-between">
      //     <SortModal />
      //     <FilterModal />
      //   </View>
      // )}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
      renderItem={({ item }) => (
        <TournamentCard
          handleOpenDetails={() => handleOpenDetails(item.id)}
          handleRegister={() => handleRegister(item.title)}
          imageSource={item.images && item.images[0].secureUrl}
          title={item.title}
          location={item.location}
          dateTime={formatDateRange(item.dateStart, item.dateEnd, settings.language)}
          patricipants={
            item.currentParticipants && item.currentParticipants.count && item.maxParticipants
              ? `${item.currentParticipants.count}/${item.maxParticipants}`
              : "-"
          }
          prizePool={item.prizePool ? `${item.prizePool.toString()} UAH` : "-"}
          entryFee={item.entryFee ? `${item.entryFee.toString()} UAH` : "-"}
        />
      )}
      keyExtractor={(item) => item.id}
      initialNumToRender={2}
      maxToRenderPerBatch={1}
      updateCellsBatchingPeriod={50}
    />
    // <LayoutScrollView
    //   renderHeader={() => (
    //     <CustomTextInput
    //       placeholder="Search..."
    //       styleWrapper={{ borderRadius: 100, minHeight: 0 }}
    //       useClearButton
    //       value={value}
    //       onChangeText={setValue}
    //     />
    //   )}
    // >
    //   {data.map((item, index) => (
    //     <TournamentCard
    //       key={index}
    //       handleOpenDetails={() => handleOpenDetails(item.id)}
    //       handleRegister={() => handleRegister(item.title)}
    //       imageSource={item.images && item.images[0].secureUrl}
    //       title={item.title}
    //       location={item.location}
    //       dateTime={formatDateRange(item.dateStart, item.dateEnd, settings.language)}
    //       patricipants={
    //         item.currentParticipants && item.currentParticipants.count && item.maxParticipants
    //           ? `${item.currentParticipants.count}/${item.maxParticipants}`
    //           : "-"
    //       }
    //       prizePool={item.prizePool ? `${item.prizePool.toString()} UAH` : "-"}
    //       entryFee={item.entryFee ? `${item.entryFee.toString()} UAH` : "-"}
    //     />
    //   ))}
    // </LayoutScrollView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    display: "flex",
    gap: 16,
  },
});
