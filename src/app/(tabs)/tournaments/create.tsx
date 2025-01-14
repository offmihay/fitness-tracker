import { NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTranslation } from "react-i18next";
import { TournamentRequest, TournamentSkillLevel, TournamentSport } from "@/src/types/tournament";
import { useTournamentMutation } from "@/src/queries/tournaments";
import RHFormInput from "@/src/components/shared/form/RHFormInput";
import ButtonDefault from "@/src/components/shared/button/ButtonDefault";
import RHFormDatePicker from "@/src/components/shared/form/RHFormDatePicker";
import RHFormDropdownInput from "@/src/components/shared/form/RHFormDropdownInput";
import ChoosePhoto, {
  ImageForm,
  UploadedImageAsset,
} from "@/src/components/tournaments/ChoosePhoto";
import CustomText from "@/src/components/shared/text/CustomText";
import { Divider } from "react-native-paper";
import useScrollProps from "@/src/hooks/useScrollProps";
import { zodResolver } from "@hookform/resolvers/zod";
import TournamentSchema, { TournamentFormData } from "@/src/components/tournaments/create/schema";
import Animated, { LinearTransition } from "react-native-reanimated";
import DualInputSection from "@/src/components/tournaments/DualInputSection";
import CustomAnimatedView from "@/src/components/shared/view/CustomAnimatedView";

const CreateTournament = () => {
  const { t } = useTranslation("");
  const createTournamentMutation = useTournamentMutation();

  const methods = useForm<TournamentFormData>({
    defaultValues: {},
    mode: "onChange",
    resolver: zodResolver(TournamentSchema),
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
    const dataAdd = {
      ...data,
      geoCoordinates: {
        latitude: 50.4501,
        longitude: 30.5234,
      },
      status: "upcoming",
    };
    createTournamentMutation.mutate(dataAdd, {
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

  const { scrollPropOnBlur, handleScroll, onContentSizeChange, onLayout } = useScrollProps();

  return (
    <FormProvider {...methods}>
      <KeyboardAwareScrollView
        {...scrollPropOnBlur}
        onContentSizeChange={onContentSizeChange}
        onScroll={handleScroll}
        onLayout={onLayout}
        extraScrollHeight={-30}
        contentContainerStyle={[styles.scrollContent]}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.wrapper}>
          <CustomText type="subtitle" className="ml-1 mb-3">
            Tournament Details
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
                  { label: t("tournament.sportType.tennis"), value: TournamentSport.Tennis },
                  {
                    label: t("tournament.sportType.badminton"),
                    value: TournamentSport.Badminton,
                  },
                  {
                    label: t("tournament.sportType.squash"),
                    value: TournamentSport.Squash,
                  },
                  {
                    label: t("tournament.sportType.tableTennis"),
                    value: TournamentSport.TableTennis,
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

            <ChoosePhoto
              onImageUploadSuccess={updateImages}
              errorMessage={formErrors.images?.message!}
            />

            <DualInputSection>
              <RHFormInput
                name="entryFee"
                label={t("tournament.entryFee")}
                inputProps={{ keyboardType: "number-pad" }}
                control={control}
                onSubmitEditing={() => setFocus("prizePool")}
              />
              <RHFormInput
                name="prizePool"
                label={t("tournament.prizePool")}
                inputProps={{
                  keyboardType: "number-pad",
                }}
                control={control}
                onSubmitEditing={() => setFocus("ageRestrictions.minAge")}
              />
            </DualInputSection>

            <CustomAnimatedView>
              <Divider className="mt-3" />
              <CustomText type="subtitle" className="ml-1 my-3">
                Restrictions
              </CustomText>
            </CustomAnimatedView>

            <DualInputSection>
              <RHFormInput
                name="ageRestrictions.minAge"
                label={t("tournament.ageRestriction.minAge")}
                inputProps={{ keyboardType: "number-pad" }}
                control={control}
                onSubmitEditing={() => setFocus("ageRestrictions.maxAge")}
              />

              <RHFormInput
                name="ageRestrictions.maxAge"
                label={t("tournament.ageRestriction.maxAge")}
                inputProps={{
                  keyboardType: "number-pad",
                }}
                control={control}
                onSubmitEditing={() => setFocus("maxParticipants")}
              />
            </DualInputSection>

            <RHFormInput
              name="maxParticipants"
              label={t("tournament.maxParticipants")}
              inputProps={{ keyboardType: "number-pad" }}
              control={control}
              onSubmitEditing={() => void 0}
            />

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
                  {
                    label: t("tournament.skillLevel.amateur"),
                    value: TournamentSkillLevel.Amateur,
                  },
                  {
                    label: t("tournament.skillLevel.beginner"),
                    value: TournamentSkillLevel.Beginner,
                  },
                  {
                    label: t("tournament.skillLevel.professional"),
                    value: TournamentSkillLevel.Professional,
                  },
                ],
                selectAnLabel: t("tournament.skillLevel.label"),
              }}
            />
            <CustomAnimatedView>
              <Divider className="mt-4" />
              <CustomText type="subtitle" className="ml-1 my-3">
                Location & Date
              </CustomText>
            </CustomAnimatedView>

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

            <RHFormInput
              name="location"
              label={t("tournament.location")}
              control={control}
              onSubmitEditing={() => setFocus("city")}
            />

            <RHFormInput
              name="city"
              label={t("tournament.city")}
              control={control}
              onSubmitEditing={() => void 0}
            />

            <CustomAnimatedView className="my-5">
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
            </CustomAnimatedView>
          </View>
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
