import { StyleSheet, TextInput, View } from "react-native";
import React, { useRef } from "react";
import { Controller, Form, useForm } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomTextInput from "@/src/components/shared/input/CustomTextInput";
import { useTranslation } from "react-i18next";
import { Tournament } from "@/src/types/Tournament";
import { useCreateTournamentMutation } from "@/src/queries/tournaments";
import DatePickerInput, { DatePickerInputRef } from "@/src/components/settings/DatePickerInput";
import FormField from "@/src/components/tournaments/FormField";

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

  console.log(watch("title"));

  const titleRef = useRef<TextInput | null>(null);
  const cityRef = useRef<TextInput | null>(null);
  const locationRef = useRef<TextInput | null>(null);
  const entryFeeRef = useRef<TextInput | null>(null);
  const prizePoolRef = useRef<TextInput | null>(null);
  const descriptionRef = useRef<TextInput | null>(null);
  const dateStartRef = useRef<DatePickerInputRef | null>(null);
  const dateEndRef = useRef<DatePickerInputRef | null>(null);
  const skillLevelRef = useRef<TextInput | null>(null);
  const formatRef = useRef<TextInput | null>(null);
  const minAgeRef = useRef<TextInput | null>(null);
  const maxAgeRef = useRef<TextInput | null>(null);

  const handleFormSubmit = (data: Tournament) => {
    console.log(data);
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
    <KeyboardAwareScrollView extraHeight={-20} extraScrollHeight={-15}>
      <View style={styles.wrapper}>
        <FormField
          control={control}
          name="title"
          label={"title"}
          onSubmitEditing={() => setFocus("city")}
        />

        {/* <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value, ref } }) => (
            <CustomTextInput
              ref={ref}
              label={"title"}
              value={value}
              onChangeText={onChange}
              returnKeyType="next"
              onSubmitEditing={() => setFocus("city")}
            />
          )}
          name="title"
        /> */}

        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value, ref } }) => (
            <CustomTextInput
              ref={ref}
              label={"city"}
              value={value}
              onChangeText={onChange}
              returnKeyType="next"
              onSubmitEditing={() => locationRef.current?.focus()}
            />
          )}
          name="city"
        />

        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value, ref } }) => (
            <CustomTextInput
              ref={ref}
              label={"location"}
              value={value}
              onChangeText={onChange}
              returnKeyType="next"
              onSubmitEditing={() => dateStartRef.current?.show()}
            />
          )}
          name="location"
        />

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <DatePickerInput
              ref={dateStartRef}
              label={"dateStart"}
              value={value}
              onChange={onChange}
              selectedDate={value ? new Date(value) : new Date()}
              minimumDate={new Date()}
              onConfirm={() => dateEndRef.current?.show()}
            />
          )}
          name="dateStart"
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <DatePickerInput
              ref={dateEndRef}
              label={"dateEnd"}
              value={value}
              onChange={onChange}
              selectedDate={value ? new Date(value) : new Date()}
              onConfirm={() => entryFeeRef.current?.focus()}
              //   minimumDate={watch("dateStart")}
            />
          )}
          name="dateEnd"
        />

        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <CustomTextInput
              ref={entryFeeRef}
              label={"entryFee"}
              value={value?.toString()}
              onChangeText={onChange}
              // keyboardType="numeric"
              returnKeyType="next"
              onSubmitEditing={() => prizePoolRef.current?.focus()}
            />
          )}
          name="entryFee"
        />

        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <CustomTextInput
              ref={prizePoolRef}
              label={"prizePool"}
              value={value?.toString()}
              onChangeText={onChange}
              // keyboardType="numeric"
              returnKeyType="next"
              onSubmitEditing={() => descriptionRef.current?.focus()}
            />
          )}
          name="prizePool"
        />

        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <CustomTextInput
              ref={descriptionRef}
              label={"description"}
              value={value}
              onChangeText={onChange}
              returnKeyType="next"
              onSubmitEditing={() => skillLevelRef.current?.focus()}
            />
          )}
          name="description"
        />
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <CustomTextInput
              ref={skillLevelRef}
              label={"skillLevel"}
              value={value}
              onChangeText={onChange}
              returnKeyType="next"
              onSubmitEditing={() => formatRef.current?.focus()}
            />
          )}
          name="skillLevel"
        />

        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <CustomTextInput
              ref={formatRef}
              label={"format"}
              value={value}
              onChangeText={onChange}
              returnKeyType="next"
              onSubmitEditing={() => minAgeRef.current?.focus()}
            />
          )}
          name="format"
        />

        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <CustomTextInput
              ref={minAgeRef}
              label={"minAge"}
              value={value?.toString()}
              onChangeText={onChange}
              // keyboardType="numeric"
              returnKeyType="next"
              onSubmitEditing={() => maxAgeRef.current?.focus()}
            />
          )}
          name="ageRestrictions.minAge"
        />

        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <CustomTextInput
              ref={maxAgeRef}
              label={"maxAge"}
              value={value?.toString()}
              onChangeText={onChange}
              // keyboardType="numeric"
              returnKeyType="done"
              onSubmitEditing={handleSubmit(handleFormSubmit)}
            />
          )}
          name="ageRestrictions.maxAge"
        />

        {/* <TouchableBtn title="Create" onPress={handleSubmit(onSubmit)} /> */}
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
