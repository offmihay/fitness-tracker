import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { getTournamentByID, registerTournament } from "@/src/queries/tournaments";
import ButtonDefault from "@/src/shared/button/ButtonDefault";
import { router, useLocalSearchParams } from "expo-router";
import LayoutStatic from "@/src/components/navigation/layouts/LayoutStatic";
import ConfirmTournamentDetails from "@/src/components/register/ConfirmTournamentDetails";
import SportLabel from "@/src/components/home/common/SportLabel";
import StickyFooterView from "@/src/shared/view/StickyFooterView";

type Props = {};

const RegistrationConfirmScreen = (props: Props) => {
  const { id } = useLocalSearchParams();

  const { data: tournamentData } = getTournamentByID(id as string);

  const registerMutation = registerTournament();

  const handlePress = () => {
    registerMutation.mutate(id as string, {
      onSuccess: () => {
        navigateToNext();
      },
    });
  };

  const navigateToNext = () => {
    router.navigate({
      pathname: "./success",
      params: { id },
    });
  };

  const {} = props;

  return (
    <>
      <LayoutStatic
        name="registration"
        isDefaultCompressed
        headerConfig={{
          maxHeight: 70,
          minHeight: 70,
          nodeHeader: () => (
            <View
              pointerEvents="none"
              style={{
                display: "flex",
                flex: 1,
                justifyContent: "center",
                alignItems: "flex-end",
                paddingRight: 20,
              }}
            >
              <SportLabel type={tournamentData?.sportType} />
            </View>
          ),
          disableSafeInsets: true,
        }}
        disableTabBarInset
      >
        <View style={styles.wrapper}>
          <ScrollView contentContainerStyle={{ paddingVertical: 30 }}>
            <View style={{ paddingHorizontal: 20 }}>
              {tournamentData && <ConfirmTournamentDetails data={tournamentData} />}
            </View>
          </ScrollView>
        </View>
      </LayoutStatic>
      <StickyFooterView offset={{ closed: 0, opened: 100 }}>
        <View style={styles.buttonWrapper}>
          <ButtonDefault
            title="Register"
            onPress={handlePress}
            className="mt-6"
            loading={registerMutation.isPending}
          />
        </View>
      </StickyFooterView>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: 130,
  },

  buttonWrapper: {
    paddingTop: 5,
    paddingBottom: 50,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default RegistrationConfirmScreen;
