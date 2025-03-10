import { StyleSheet, View } from "react-native";
import React from "react";
import LayoutStatic from "@/src/components/navigation/layouts/LayoutStatic";
import { router, useLocalSearchParams } from "expo-router";
import GoogleAutoComplete from "@/src/components/tournaments/choose-location/GoogleAutocomplete";
import { UpdateTournamentPageQuery } from ".";
import GoogleLogo from "@/src/shared/logo/GoogleLogo";

export type ChooseLocationPageQuery = {
  id: string;
  address: string;
  language: string;
  location: string;
  latitude?: string;
  longitude?: string;
  components: string;
};

const ChooseLocation = () => {
  const pageQuery = useLocalSearchParams<ChooseLocationPageQuery>();

  const onSubmit = (location: Partial<UpdateTournamentPageQuery>) => {
    router.back();
    router.navigate({
      pathname: "tournaments/edit",
      params: {
        ...location,
        id: pageQuery.id,
      },
    });
  };

  return (
    <LayoutStatic
      name="choose-location"
      isDefaultCompressed={true}
      headerConfig={{
        nodeHeader: () => (
          <View
            pointerEvents="box-none"
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              height: "100%",
              alignItems: "flex-end",
              paddingRight: 20,
            }}
          >
            <GoogleLogo />
          </View>
        ),
      }}
    >
      <View style={styles.wrapper}>
        <GoogleAutoComplete onSubmit={onSubmit} location={pageQuery} />
      </View>
    </LayoutStatic>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});

export default ChooseLocation;
