import { StyleSheet, View } from "react-native";
import React from "react";
import ButtonDefault from "@/src/components/shared/button/ButtonDefault";
import { useRouter } from "expo-router";
import { KeyboardProvider, KeyboardStickyView } from "react-native-keyboard-controller";
import CustomTextInput from "@/src/components/shared/input/CustomTextInput";

type Props = {};

const Tournaments = ({}: Props) => {
  const { navigate } = useRouter();
  // <ButtonDefault title="Create tournament" onPress={() => navigate("tournaments/create")} />

  return (
    <>
      <View>
        <CustomTextInput />
      </View>
      <StickyFooter />
    </>
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

const StickyFooter = () => {
  const offset = { closed: 0, opened: 70 };
  const { navigate } = useRouter();
  return (
    <KeyboardProvider>
      <KeyboardStickyView offset={offset} style={{ flex: 1, justifyContent: "flex-end" }}>
        <ButtonDefault title="Create tournament" onPress={() => navigate("tournaments/create")} />
      </KeyboardStickyView>
    </KeyboardProvider>
  );
};
