import { StyleSheet, View } from "react-native";
import React from "react";
import ButtonDefault from "@/src/components/shared/button/ButtonDefault";
import { useRouter } from "expo-router";
import { KeyboardProvider, KeyboardStickyView } from "react-native-keyboard-controller";
import CustomTextInput from "@/src/components/shared/input/CustomTextInput";

type Props = {};

const Tournaments = ({}: Props) => {
  const { navigate } = useRouter();

  return (
    <View style={styles.wrapper}>
      <ButtonDefault title="Create tournament" onPress={() => navigate("tournaments/create")} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});

export default Tournaments;
