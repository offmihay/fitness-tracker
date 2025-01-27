import { Dimensions, Keyboard, StyleSheet, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from "react-native-google-places-autocomplete";
import CustomTextInput from "@/src/shared/input/CustomTextInput";
import CustomText from "@/src/shared/text/CustomText";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import LayoutStatic from "@/src/components/navigation/layouts/LayoutStatic";
import FastImage from "@d11/react-native-fast-image";
import { router, useLocalSearchParams, useNavigation, usePathname } from "expo-router";
import { CreateTournamentPageQuery } from ".";

type Props = {};

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

const ChooseLocation = (props: Props) => {
  const {} = props;
  const pageQuery = useLocalSearchParams<ChooseLocationPageQuery>();
  const [location, setLocation] = useState<CreateTournamentPageQuery | null>(null);
  const ref = useRef<GooglePlacesAutocompleteRef>(null);
  const theme = useCustomTheme();

  useEffect(() => {
    pageQuery.address &&
      pageQuery.latitude &&
      pageQuery.longitude &&
      setLocation(() => {
        return {
          address: pageQuery.address,
          latitude: pageQuery.latitude,
          longitude: pageQuery.longitude,
        };
      });
    setTimeout(() => {
      ref.current?.focus();
    }, 700);
  }, [pageQuery.address]);

  useEffect(() => {
    location && ref.current?.setAddressText(location.address);
  }, [location]);

  const handleChooseLocation = (data: GooglePlaceData, details: GooglePlaceDetail | null) => {
    const location = {
      place_id: data.place_id,
      name: data.structured_formatting.main_text,
      address: details?.formatted_address || data.description,
      latitude: details?.geometry?.location?.lat.toString(),
      longitude: details?.geometry?.location?.lng.toString(),
      url: details?.url,
    };

    setLocation(() => {
      onSubmit(location);
      return location;
    });
  };

  const onSubmit = (location: CreateTournamentPageQuery) => {
    router.back();
    router.navigate({
      pathname: "tournaments/create",
      params: {
        ...location,
      },
    });
  };

  const navigation = useNavigation();

  return (
    <LayoutStatic
      name="choose-location"
      isDefaultCompressed={true}
      headerConfig={{
        nodeHeader: () => (
          <View
            pointerEvents="box-none"
            style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "flex-end" }}
          >
            <GoogleLogo />
          </View>
        ),
      }}
    >
      <View style={styles.wrapper}>
        <GooglePlacesAutocomplete
          fetchDetails
          ref={ref}
          placeholder=""
          textInputProps={{
            InputComp: CustomTextInput,
            style: { width: "100%" },
            clearButtonMode: "never",
            label: "Search",
            useClearButton: true,
            textContentType: "oneTimeCode",
            returnKeyType: "done",
            onSubmitEditing: () => location && onSubmit(location),
          }}
          enablePoweredByContainer={false}
          renderRow={(data, index) => (
            <View
              key={index}
              style={{
                width: Dimensions.get("screen").width - 20,
                backgroundColor: theme.colors.surface,
                paddingVertical: 8,
                paddingHorizontal: 20,
              }}
            >
              <CustomText numberOfLines={1}>{data.structured_formatting.main_text}</CustomText>
              <CustomText numberOfLines={1} type="predefault">
                {data.structured_formatting.secondary_text}
              </CustomText>
            </View>
          )}
          onPress={(data, details) => {
            handleChooseLocation(data, details);
          }}
          query={{
            key: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
            language: "uk",
            location: "30.46283-50.38453",
            components: "country:ua",
          }}
          styles={{
            textInputContainer: {
              flexDirection: "column",
            },
            row: {
              backgroundColor: "auto",
              padding: "auto",
              height: "auto",
              flexDirection: "auto",
            },

            listView: {
              overflow: "hidden",
            },
          }}
        />
        {/* <View
          pointerEvents="box-none"
          style={{
            position: "absolute",
            height: "100%",
            display: "flex",
            justifyContent: "flex-end",
            bottom: 50,
            left: 10,
            right: 10,
          }}
        >
          <ButtonDefault title="Save" />
        </View> */}
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
