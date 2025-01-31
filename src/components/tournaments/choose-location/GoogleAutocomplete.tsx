import { Dimensions, View } from "react-native";
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
import { CreateTournamentPageQuery } from "@/src/app/(tabs)/tournaments/create";
import { ChooseLocationPageQuery } from "@/src/app/(tabs)/tournaments/create/choose-location";

type Props = {
  query: ChooseLocationPageQuery;
  onSubmit: (location: CreateTournamentPageQuery) => void;
};

const GoogleAutoComplete = (props: Props) => {
  const { query, onSubmit } = props;

  const [location, setLocation] = useState<CreateTournamentPageQuery | null>(null);
  const ref = useRef<GooglePlacesAutocompleteRef>(null);
  const theme = useCustomTheme();

  useEffect(() => {
    query.address &&
      setLocation((prev) => {
        return {
          ...prev,
          address: query.address,
        };
      });
    setTimeout(() => {
      ref.current?.focus();
    }, 700);
  }, [query.address]);

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

  return (
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
  );
};

export default GoogleAutoComplete;
