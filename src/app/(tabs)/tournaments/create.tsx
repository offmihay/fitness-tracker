import { StyleSheet, View } from "react-native";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTranslation } from "react-i18next";
import { Tournament } from "@/src/types/tournamentType";
import { useTournamentMutation } from "@/src/queries/tournaments";

import RHFormInput from "@/src/components/shared/form/RHFormInput";
import TouchableBtn from "@/src/components/shared/touchable/TouchableBtn";
import RHFormDatePicker from "@/src/components/shared/form/RHFormDatePicker";
import RHFormDropdownInput from "@/src/components/shared/form/RHFormDropdownInput";
import ChoosePhoto, { UploadedImageAsset } from "@/src/components/tournaments/ChoosePhoto";

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
        console.log("Tournament created:", data);
      },
      onError: (error) => {
        console.error("Failed to create tournament:", error);
      },
    });
  };

  const updateImages = (images: UploadedImageAsset[]) => {
    setValue("images", images);
  };

  return (
    <FormProvider {...methods}>
      <KeyboardAwareScrollView
        scrollEnabled={true}
        extraScrollHeight={-70}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
      >
        <View style={styles.wrapper}>
          <View className="flex flex-col gap-1">
            <RHFormInput
              name="title"
              label={"title"}
              control={control}
              onSubmitEditing={() => setFocus("description")}
            />
            <ChoosePhoto onImageUploadSuccess={updateImages} />

            <RHFormInput
              name="description"
              label={"description"}
              inputProps={{
                style: {
                  height: 100,
                },
                styleWrapper: {
                  height: 110,
                },
                multiline: true,
                returnKeyType: "default",
              }}
              control={control}
            />
            <RHFormDatePicker
              name="dateStart"
              label={"Start date"}
              datePickerProps={{
                minimumDate: new Date(),
                maximumDate: new Date(new Date().getFullYear() + 5, 0, 1),
              }}
              control={control}
            />
            <RHFormDatePicker
              name="dateEnd"
              label={"End date"}
              datePickerProps={{
                minimumDate: watch("dateStart") ? new Date(watch("dateStart")) : undefined,
              }}
              control={control}
            />
            <View className="flex flex-row">
              <View className="w-1/2 pr-1">
                <RHFormDropdownInput
                  control={control}
                  name="skillLevel"
                  label="SkillLevel"
                  dropdownProps={{
                    selectedValue: watch("skillLevel"),
                    onValueChange: (itemValue) => setValue("skillLevel", itemValue),
                    items: [
                      { label: "Amateur", value: "Amateur" },
                      { label: "Beginner", value: "Beginner" },
                      { label: "Professional", value: "Professional" },
                    ],
                    selectAnLabel: "Select skillLevel ...",
                  }}
                />
              </View>
              <View className="w-1/2 pl-1">
                <RHFormDropdownInput
                  control={control}
                  name="format"
                  label="Format"
                  dropdownProps={{
                    selectedValue: watch("format"),
                    onValueChange: (itemValue) => setValue("format", itemValue),
                    items: [
                      { label: "Singles", value: "Singles" },
                      { label: "Doubles", value: "Doubles" },
                      { label: "Squad", value: "Squad" },
                    ],
                    selectAnLabel: "Select format...",
                  }}
                />
              </View>
            </View>
            <RHFormInput
              name="city"
              label={"city"}
              control={control}
              onSubmitEditing={() => setFocus("location")}
            />
            <RHFormInput
              name="location"
              label={"location"}
              control={control}
              onSubmitEditing={() => setFocus("entryFee")}
            />
            <RHFormInput
              name="entryFee"
              label={"entryFee"}
              inputProps={{ keyboardType: "numbers-and-punctuation" }}
              control={control}
              onSubmitEditing={() => setFocus("prizePool")}
            />
            <RHFormInput
              name="prizePool"
              label={"prizePool"}
              inputProps={{
                keyboardType: "numbers-and-punctuation",
              }}
              control={control}
              onSubmitEditing={() => setFocus("ageRestrictions.minAge")}
            />

            <View className="flex flex-row">
              <View className="w-1/2 pr-1">
                <RHFormInput
                  name="ageRestrictions.minAge"
                  label={"minAge"}
                  inputProps={{ keyboardType: "numbers-and-punctuation" }}
                  control={control}
                  onSubmitEditing={() => setFocus("ageRestrictions.maxAge")}
                />
              </View>
              <View className="w-1/2 pl-1">
                <RHFormInput
                  name="ageRestrictions.maxAge"
                  label={"maxAge"}
                  inputProps={{
                    keyboardType: "numbers-and-punctuation",
                  }}
                  control={control}
                  onSubmitEditing={() => void 0}
                />
              </View>
            </View>
          </View>

          <TouchableBtn title="Create" className="mt-4" onPress={handleSubmit(handleFormSubmit)} />
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
});

export default CreateTournament;
