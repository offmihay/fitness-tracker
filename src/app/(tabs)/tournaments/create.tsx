import { StyleSheet, TextInput, View } from "react-native";
import React, { useEffect, useRef } from "react";
import { Controller, Form, useForm } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomTextInput from "@/src/components/shared/input/CustomTextInput";
import { useTranslation } from "react-i18next";
import { Tournament } from "@/src/types/Tournament";
import { useCreateTournamentMutation } from "@/src/queries/tournaments";
import DatePickerInput from "@/src/components/settings/DatePickerInput";
import RHFormInput from "@/src/components/shared/form/RHFormInput";
import TouchableBtn from "@/src/components/shared/touchable/TouchableBtn";
import RHFormDatePicker from "@/src/components/shared/form/RHFormDatePicker";

type Props = {};

const CreateTournament = ({}: Props) => {
  const { t } = useTranslation();
  const createTournamentMutation = useCreateTournamentMutation();

  const {
    control,
    handleSubmit,
    watch,
    setFocus,
    formState: { errors: formErrors },
  } = useForm<Tournament>({
    defaultValues: {},
    mode: "onChange",
  });

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

  return (
    <KeyboardAwareScrollView
      scrollEnabled={true}
      extraScrollHeight={-70}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid={true}
      keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
    >
      <View style={styles.wrapper}>
        <View className="flex flex-col gap-4">
          <RHFormInput
            name="title"
            label={"title"}
            control={control}
            onSubmitEditing={() => setFocus("description")}
          />
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
            onSubmitEditing={() => setFocus("skillLevel")}
          />
          <RHFormInput
            name="skillLevel"
            label={"skillLevel"}
            control={control}
            onSubmitEditing={() => setFocus("format")}
          />
          <RHFormInput
            name="format"
            label={"format"}
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
