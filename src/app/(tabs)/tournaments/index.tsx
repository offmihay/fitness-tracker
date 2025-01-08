import { StyleSheet } from "react-native";
import React from "react";
import ChoosePhoto, { UploadedImageAsset } from "@/src/components/tournaments/ChoosePhoto";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonDefault from "@/src/components/shared/button/ButtonDefault";
import { useRouter } from "expo-router";

type Props = {};

const Tournaments = ({}: Props) => {
  const { navigate } = useRouter();

  return <ButtonDefault title="Create tournament" onPress={() => navigate("tournaments/create")} />;
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});

export default Tournaments;
