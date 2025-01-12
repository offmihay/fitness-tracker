import { NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTranslation } from "react-i18next";
import { Tournament } from "@/src/types/tournament";
import { useTournamentMutation } from "@/src/queries/tournaments";

import RHFormInput from "@/src/components/shared/form/RHFormInput";
import ButtonDefault from "@/src/components/shared/button/ButtonDefault";
import RHFormDatePicker from "@/src/components/shared/form/RHFormDatePicker";
import RHFormDropdownInput from "@/src/components/shared/form/RHFormDropdownInput";
import ChoosePhoto, { UploadedImageAsset } from "@/src/components/tournaments/ChoosePhoto";
import CustomText from "@/src/components/shared/text/CustomText";
import { Divider } from "react-native-paper";
import useScrollProps from "@/src/hooks/useScrollProps";

type Props = {};

const CreateTournament = ({}: Props) => {
  const { t } = useTranslation();
  const createTournamentMutation = useTournamentMutation();

  const methods = useForm<Tournament>({
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

  const handleFormSubmit = (data: Tournament) => {
    createTournamentMutation.mutate(data, {
      onSuccess: (data) => {
        console.log(t("tournaments.create.successMessage"), data);
      },
      onError: (error) => {
        console.error(t("tournaments.create.errorMessage"), error);
      },
    });
  };

  const updateImages = (images: UploadedImageAsset[]) => {
    setValue("images", images);
  };

  const { scrollPropOnBlur, handleScroll } = useScrollProps(200);

  return (
    <FormProvider {...methods}>
      <View style={styles.wrapper}>
        <KeyboardAwareScrollView
          {...scrollPropOnBlur}
          onScroll={handleScroll}
          // extraScrollHeight={-70}
          contentContainerStyle={[styles.scrollContent]}
          enableOnAndroid={true}
          keyboardShouldPersistTaps="handled"
          keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
          showsVerticalScrollIndicator={false}
        >
          <CustomText type="subtitle" className="ml-1 mb-3">
            Base Information
          </CustomText>
          <View className="flex flex-col gap-1" style={{ flex: 1 }}>
            <RHFormInput
              name="title"
              label={t("tournaments.create.titleTournament")}
              control={control}
              onSubmitEditing={() => setFocus("description")}
            />
            <RHFormInput
              name="description"
              label={t("tournaments.create.description")}
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
              }}
              control={control}
            />
            <View className="mt-1">
              <ChoosePhoto onImageUploadSuccess={updateImages} />
            </View>
            <Divider className="mt-4" />
            <CustomText type="subtitle" className="ml-1 my-3">
              Location & Date
            </CustomText>

            <RHFormInput
              name="location"
              label={t("tournaments.create.location")}
              control={control}
              onSubmitEditing={() => setFocus("city")}
            />
            <RHFormInput
              name="city"
              label={t("tournaments.create.city")}
              control={control}
              onSubmitEditing={() => setFocus("dateStart")}
            />
            <View className="flex flex-row">
              <View className="w-1/2 pr-1">
                <RHFormDatePicker
                  name="dateStart"
                  label={t("tournaments.create.startDate")}
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
                  label={t("tournaments.create.endDate")}
                  datePickerProps={{
                    minimumDate: watch("dateStart") ? new Date(watch("dateStart")) : undefined,
                  }}
                  control={control}
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
                  name="entryFee"
                  label={t("tournaments.create.entryFee")}
                  inputProps={{ keyboardType: "numbers-and-punctuation" }}
                  control={control}
                  onSubmitEditing={() => setFocus("prizePool")}
                />
              </View>
              <View className="w-1/2 pl-1">
                <RHFormInput
                  name="prizePool"
                  label={t("tournaments.create.prizePool")}
                  inputProps={{
                    keyboardType: "numbers-and-punctuation",
                  }}
                  control={control}
                  onSubmitEditing={() => setFocus("ageRestrictions.minAge")}
                />
              </View>
            </View>
            <View className="flex flex-row">
              <View className="w-1/2 pr-1">
                <RHFormInput
                  name="ageRestrictions.minAge"
                  label={t("tournaments.create.minAge")}
                  inputProps={{ keyboardType: "numbers-and-punctuation" }}
                  control={control}
                  onSubmitEditing={() => setFocus("ageRestrictions.maxAge")}
                />
              </View>
              <View className="w-1/2 pl-1">
                <RHFormInput
                  name="ageRestrictions.maxAge"
                  label={t("tournaments.create.maxAge")}
                  inputProps={{
                    keyboardType: "numbers-and-punctuation",
                  }}
                  control={control}
                />
              </View>
            </View>
            <View className="flex flex-row">
              <View className="w-1/2 pr-1">
                <RHFormDropdownInput
                  control={control}
                  name="skillLevel"
                  label={t("tournaments.create.skillLevel")}
                  dropdownProps={{
                    selectedValue: watch("skillLevel"),
                    onValueChange: (itemValue) => setValue("skillLevel", itemValue),
                    items: [
                      { label: t("tournaments.create.skillLevels.amateur"), value: "amateur" },
                      { label: t("tournaments.create.skillLevels.beginner"), value: "beginner" },
                      {
                        label: t("tournaments.create.skillLevels.professional"),
                        value: "professional",
                      },
                    ],
                    selectAnLabel: t("tournaments.create.selectSkillLevel"),
                  }}
                />
              </View>
              <View className="w-1/2 pl-1">
                <RHFormDropdownInput
                  control={control}
                  name="format"
                  label={t("tournaments.create.format")}
                  dropdownProps={{
                    selectedValue: watch("format"),
                    onValueChange: (itemValue) => setValue("format", itemValue),
                    items: [
                      { label: t("tournaments.create.formats.singles"), value: "Singles" },
                      { label: t("tournaments.create.formats.doubles"), value: "Doubles" },
                      { label: t("tournaments.create.formats.squad"), value: "Squad" },
                    ],
                    selectAnLabel: t("tournaments.create.selectFormat"),
                  }}
                />
              </View>
            </View>
          </View>

          <ButtonDefault
            title={t("tournaments.create.createButton")}
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
        </KeyboardAwareScrollView>
      </View>
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
