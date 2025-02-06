import { StyleSheet, View } from "react-native";
import React from "react";
import { registerTournament } from "@/src/queries/tournaments";
import LayoutStatic from "@/src/components/navigation/layouts/LayoutStatic";
import ButtonDefault from "@/src/shared/button/ButtonDefault";
import { useLocalSearchParams } from "expo-router";

type Props = {};

const RegisterTournamentScreen = (props: Props) => {
  const {} = props;
  const { id } = useLocalSearchParams();

  const registerMutation = registerTournament();

  const handlePress = () => {
    registerMutation.mutate(id as string);
  };

  return (
    <LayoutStatic
      name="registration"
      isDefaultCompressed
      headerConfig={{ maxHeight: 60, minHeight: 60 }}
    >
      <View style={styles.wrapper}>
        <ButtonDefault title="register" onPress={handlePress} />
      </View>
    </LayoutStatic>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});

export default RegisterTournamentScreen;
