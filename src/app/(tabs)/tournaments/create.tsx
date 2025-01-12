import { NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTranslation } from "react-i18next";
import { TournamentRequest } from "@/src/types/tournament";
import { useTournamentMutation } from "@/src/queries/tournaments";

import RHFormInput from "@/src/components/shared/form/RHFormInput";
import ButtonDefault from "@/src/components/shared/button/ButtonDefault";
import RHFormDatePicker from "@/src/components/shared/form/RHFormDatePicker";
import RHFormDropdownInput from "@/src/components/shared/form/RHFormDropdownInput";
import ChoosePhoto, { UploadedImageAsset } from "@/src/components/tournaments/ChoosePhoto";
import CustomText from "@/src/components/shared/text/CustomText";
import { Divider } from "react-native-paper";
import useScrollProps from "@/src/hooks/useScrollProps";
import { ImageForm, TournamentFormData } from "@/src/components/tournaments/create/types";

type Props = {};

const CreateTournament = ({}: Props) => {
  const { t } = useTranslation("");
  const createTournamentMutation = useTournamentMutation();

  const methods = useForm<TournamentFormData>({
    defaultValues: {},
    mode: "onChange",
  });

  const {
    control,
    handleSubmit,
    watch,
    setFocus,
    setValue,
    formState: { errors: formErrors },
  } = methods;

  const handleFormSubmit = (data: TournamentFormData) => {
    createTournamentMutation.mutate(data, {
      onSuccess: (data) => {
        console.log(t("myTournaments.create.successMessage"), data);
      },
      onError: (error) => {
        console.error(t("myTournaments.create.errorMessage"), error);
      },
    });
  };

  const updateImages = (images: ImageForm[]) => {
    setValue("images", images);
  };

  const { scrollPropOnBlur, handleScroll } = useScrollProps(200);

  return (
    <FormProvider {...methods}>
      <KeyboardAwareScrollView
        {...scrollPropOnBlur}
        onScroll={handleScroll}
        extraScrollHeight={-70}
        contentContainerStyle={[styles.scrollContent]}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.wrapper}>
          <CustomText type="subtitle" className="ml-1 mb-3">
            Details
          </CustomText>
          <View className="flex flex-col gap-1" style={{ flex: 1 }}>
            <RHFormDropdownInput
              control={control}
              name="sportType"
              label={t("tournament.sportType.title")}
              inputProps={{
                value: watch("sportType") && t(`tournament.sportType.${watch("sportType")}`),
              }}
              dropdownProps={{
                selectedValue: watch("sportType"),
                onValueChange: (itemValue) => setValue("sportType", itemValue),
                items: [
                  { label: t("tournament.sportType.tennis"), value: "tennis" },
                  {
                    label: t("tournament.sportType.badminton"),
                    value: "badminton",
                  },
                  {
                    label: t("tournament.sportType.squash"),
                    value: "squash",
                  },
                  {
                    label: t("tournament.sportType.tableTennis"),
                    value: "tableTennis",
                  },
                ],
                selectAnLabel: t("tournament.sportType.label"),
              }}
            />
            <RHFormInput
              name="title"
              label={t("tournament.title")}
              control={control}
              onSubmitEditing={() => setFocus("description")}
            />
            <RHFormInput
              name="description"
              label={t("tournament.description")}
              inputProps={{
                style: {
                  height: 100,
                },
                styleWrapper: {
                  height: 110,
                },
                multiline: true,
                textAlignVertical: "top",
                returnKeyType: "default",
                useClearButton: false,
              }}
              control={control}
            />
            <View className="mt-1 mb-2">
              <ChoosePhoto onImageUploadSuccess={updateImages} />
            </View>
            <View className="flex flex-row">
              <View className="w-1/2 pr-1">
                <RHFormInput
                  name="entryFee"
                  label={t("tournament.entryFee")}
                  inputProps={{ keyboardType: "numbers-and-punctuation" }}
                  control={control}
                  onSubmitEditing={() => setFocus("prizePool")}
                />
              </View>
              <View className="w-1/2 pl-1">
                <RHFormInput
                  name="prizePool"
                  label={t("tournament.prizePool")}
                  inputProps={{
                    keyboardType: "numbers-and-punctuation",
                  }}
                  control={control}
                  onSubmitEditing={() => setFocus("ageRestrictions.minAge")}
                />
              </View>
            </View>

            <Divider className="mt-3" />
            <CustomText type="subtitle" className="ml-1 my-3">
              Restrictions
            </CustomText>
            <View className="flex flex-row">
              <View className="w-1/2 pr-1">
                <RHFormInput
                  name="ageRestrictions.minAge"
                  label={t("tournament.ageRestriction.minAge")}
                  inputProps={{ keyboardType: "numbers-and-punctuation" }}
                  control={control}
                  onSubmitEditing={() => setFocus("ageRestrictions.maxAge")}
                />
              </View>
              <View className="w-1/2 pl-1">
                <RHFormInput
                  name="ageRestrictions.maxAge"
                  label={t("tournament.ageRestriction.maxAge")}
                  inputProps={{
                    keyboardType: "numbers-and-punctuation",
                  }}
                  control={control}
                />
              </View>
            </View>

            <RHFormDropdownInput
              control={control}
              name="skillLevel"
              label={t("tournament.skillLevel.title")}
              inputProps={{
                value: watch("skillLevel") && t(`tournament.skillLevel.${watch("skillLevel")}`),
              }}
              dropdownProps={{
                selectedValue: watch("skillLevel"),
                onValueChange: (itemValue) => setValue("skillLevel", itemValue),
                items: [
                  { label: t("tournament.skillLevel.amateur"), value: "amateur" },
                  { label: t("tournament.skillLevel.beginner"), value: "beginner" },
                  {
                    label: t("tournament.skillLevel.professional"),
                    value: "professional",
                  },
                ],
                selectAnLabel: t("tournament.skillLevel.label"),
              }}
            />
            <Divider className="mt-4" />
            <CustomText type="subtitle" className="ml-1 my-3">
              Location & Date
            </CustomText>
            <View className="flex flex-row">
              <View className="w-1/2 pr-1">
                <RHFormDatePicker
                  name="dateStart"
                  label={t("tournament.dateStart")}
                  datePickerProps={{
                    minimumDate: new Date(),
                    maximumDate: new Date(new Date().getFullYear() + 5, 0, 1),
                  }}
                  control={control}
                />
              </View>
              <View className="w-1/2 pl-1">
                <RHFormDatePicker
                  name="dateEnd"
                  label={t("tournament.dateEnd")}
                  datePickerProps={{
                    minimumDate: watch("dateStart") ? new Date(watch("dateStart")) : undefined,
                  }}
                  control={control}
                />
              </View>
            </View>
            <RHFormInput
              name="location"
              label={t("tournament.location")}
              control={control}
              onSubmitEditing={() => setFocus("city")}
            />
            <RHFormInput name="city" label={t("tournament.city")} control={control} />
          </View>
          <ButtonDefault
            title={t("myTournaments.create.createButton")}
            className="mt-4"
            onPress={handleSubmit(handleFormSubmit)}
            loading={createTournamentMutation.isPending}
            statusAnimation={{
              enabled: true,
              useOnlySuccess: true,
              isSuccess: createTournamentMutation.isSuccess,
              timeOut: 3000,
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },

  scrollContent: {
    flexGrow: 1,
  },
});

export default CreateTournament;
