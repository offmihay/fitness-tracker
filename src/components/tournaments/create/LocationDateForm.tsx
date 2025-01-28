import React from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import RHFormInput from "@/src/shared/form/RHFormInput";
import DualInputSection from "../DualInputSection";
import { TournamentFormData } from "./schema";
import RHFormDatePicker from "@/src/shared/form/RHFormDatePicker";
import { router } from "expo-router";
import CustomAnimatedView from "@/src/shared/view/CustomAnimatedView";
import { Divider } from "react-native-paper";
import CustomText from "@/src/shared/text/CustomText";

export const LocationDateForm = () => {
  const { t } = useTranslation();

  const { control, watch } = useFormContext<TournamentFormData>();

  return (
    <>
      <CustomAnimatedView>
        <Divider className="mt-2" />
        <CustomText type="subtitle" className="ml-1 my-3">
          Location & Date
        </CustomText>
      </CustomAnimatedView>
      <RHFormInput name="city" label={t("tournament.city")} control={control} />
      <RHFormInput
        name="location"
        label={t("tournament.location")}
        control={control}
        inputProps={{
          disabled: true,
          onPress: () =>
            router.navigate({
              pathname: "tournaments/create/choose-location",
              params: {
                address: watch("location"),
                latitude: watch("geoCoordinates.latitude"),
                longitude: watch("geoCoordinates.longitude"),
              },
            }),
        }}
      />
      <DualInputSection>
        <RHFormDatePicker
          name="dateStart"
          label={t("tournament.dateStart")}
          datePickerProps={{
            minimumDate: new Date(),
            maximumDate: new Date(new Date().getFullYear() + 5, 0, 1),
          }}
          control={control}
        />

        <RHFormDatePicker
          name="dateEnd"
          label={t("tournament.dateEnd")}
          datePickerProps={{
            minimumDate: watch("dateStart") ? new Date(watch("dateStart")) : undefined,
          }}
          control={control}
        />
      </DualInputSection>
    </>
  );
};
