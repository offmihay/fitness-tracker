import { Dimensions, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  AutocompleteRequestType,
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
  Query,
} from "react-native-google-places-autocomplete";
import CustomTextInput from "@/src/shared/input/CustomTextInput";
import CustomText from "@/src/shared/text/CustomText";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { t } from "i18next";
import { Divider } from "react-native-paper";

export type PlaceObject = {
  place_id?: string;
  name?: string;
  address: string;
  latitude?: string;
  longitude?: string;
  url?: string;
};

type SearchPreferences = {
  location?: PlaceObject;
  query?: Omit<Query<AutocompleteRequestType>, "key">;
};

type Props = {
  onSubmit: (location: PlaceObject) => void;
  maxRows?: number;
} & SearchPreferences;

const GoogleAutoComplete = (props: Props) => {
  const { query, location, onSubmit, maxRows = 5 } = props;

  const [searchQuery, setSearchQuery] = useState<SearchPreferences>({ location, query });
  const ref = useRef<GooglePlacesAutocompleteRef>(null);
  const theme = useCustomTheme();

  useEffect(() => {
    searchQuery.location?.address && ref.current?.setAddressText(searchQuery.location.address);

    setTimeout(() => {
      ref.current?.focus();
    }, 700);
  }, []);

  const handleChooseLocation = (data: GooglePlaceData, details: GooglePlaceDetail | null) => {
    const locationResult = {
      place_id: data.place_id,
      name: data.structured_formatting.main_text,
      address:
        data.description || details?.formatted_address || data.structured_formatting.main_text,
      latitude: details?.geometry?.location?.lat.toString(),
      longitude: details?.geometry?.location?.lng.toString(),
      url: details?.url,
    };

    setSearchQuery((prev) => {
      onSubmit(locationResult);
      return { ...prev, location: locationResult };
    });
  };

  const handleInputDone = () => {
    if (searchQuery.location?.address) {
      ref.current?.setAddressText(searchQuery.location.address);
      onSubmit(searchQuery.location);
    }
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
        label: t("common.search"),
        useClearButton: true,
        textContentType: "oneTimeCode",
        returnKeyType: "done",
        onSubmitEditing: handleInputDone,
      }}
      enablePoweredByContainer={false}
      renderRow={(data, index) => {
        if (index > maxRows - 1) return <></>;
        return (
          <>
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
            <Divider />
          </>
        );
      }}
      onPress={(data, details) => {
        handleChooseLocation(data, details);
      }}
      query={{
        key: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
        ...query,
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
        separator: {
          height: 0,
        },
      }}
    />
  );
};

export default GoogleAutoComplete;
