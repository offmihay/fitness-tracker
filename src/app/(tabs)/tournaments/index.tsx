import { StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { router, useNavigation, useRouter } from "expo-router";
import ButtonDefault from "@/src/shared/button/ButtonDefault";
import UserTournamentCard, {
  UserTournamentCard_HEIGHT,
} from "@/src/components/tournaments/UserTournamentCard";
import { useAllTournaments } from "@/src/queries/tournaments";
import LayoutFlashList from "@/src/components/navigation/layouts/LayoutFlashList";
import { TournamentRequest } from "@/src/types/tournament";
import CustomText from "@/src/shared/text/CustomText";
import { AntDesign } from "@expo/vector-icons";
import CustomIcon from "@/src/shared/icon/CustomIcon";
import ButtonSmall from "@/src/shared/button/ButtonSmall";
import CustomSwitch from "@/src/shared/switch/Switch";
import CreatorTournamentCard from "@/src/components/tournaments/CreatorTournamentCard";
import _ from "lodash";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";

type Props = {};

const Tournaments = ({}: Props) => {
  const { data: loadedData, refetch, isFetching } = useAllTournaments();
  const [creatorMode, setCreatorMode] = useState(false);
  const { push } = useRouter();

  const theme = useCustomTheme();

  const [data, setData] = useState<TournamentRequest[]>([]);
  const [data2, setData2] = useState<TournamentRequest[]>([]);

  useEffect(() => {
    const cloneData = _.cloneDeep(loadedData);
    const cloneData2 = _.cloneDeep(loadedData);
    setData(cloneData.reverse());
    setData2(cloneData2);
  }, [loadedData]);

  const navigation = useNavigation();

  const handleOpenDetails = (id: string) => {
    // router.push(
    //   {
    //     pathname: "/home/[id]",
    //     params: { id },
    //   }
    // );
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
          <CreatorTournamentCard data={item} onCardPress={() => handleOpenDetails(item.id)} />
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
        headerConfig={{
          nodeHeader: () => (
            <View className="flex h-full justify-end">
              <View
                className="flex items-end justify-center h-[60]"
                // style={{ borderWidth: 1, borderColor: "red" }}
              >
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
