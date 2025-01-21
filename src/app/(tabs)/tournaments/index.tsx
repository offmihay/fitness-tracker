import { StyleSheet, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import LayoutStatic from "@/src/components/navigation/layouts/LayoutStatic";
import ButtonDefault from "@/src/shared/button/ButtonDefault";

type Props = {};

const Tournaments = ({}: Props) => {
  const { navigate } = useRouter();

  return (
    <LayoutStatic name="tournaments">
      <View style={styles.wrapper}>
        <ButtonDefault title="Create tournament" onPress={() => navigate("tournaments/create")} />
      </View>
    </LayoutStatic>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});

export default Tournaments;
