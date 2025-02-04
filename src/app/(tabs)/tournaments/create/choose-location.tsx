import { StyleSheet, View } from "react-native";
import React from "react";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import LayoutStatic from "@/src/components/navigation/layouts/LayoutStatic";
import FastImage from "@d11/react-native-fast-image";
import { router, useLocalSearchParams } from "expo-router";
import GoogleAutoComplete from "@/src/components/tournaments/choose-location/GoogleAutocomplete";
import { CreateTournamentPageQuery } from ".";
import CustomText from "@/src/shared/text/CustomText";

export type ChooseLocationPageQuery = {
  address: string;
  language: string;
  location: string;
  latitude?: string;
  longitude?: string;
  components: string;
};

const GoogleLogo = () => {
  const theme = useCustomTheme();
  const source = theme.dark
    ? require("@/assets/imgs/google_logo_dark.png")
    : require("@/assets/imgs/google_logo_light.png");
  return (
    <View style={{ width: 80 }}>
      <FastImage
        style={{ width: "100%", height: "100%" }}
        source={source}
        resizeMode={FastImage.resizeMode.contain}
      ></FastImage>
    </View>
  );
};

const ChooseLocation = () => {
  const pageQuery = useLocalSearchParams<ChooseLocationPageQuery>();

  const onSubmit = (location: CreateTournamentPageQuery) => {
    router.back();
    router.navigate({
      pathname: "tournaments/create",
      params: {
        ...location,
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
        <GoogleAutoComplete query={pageQuery} onSubmit={onSubmit} />
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
