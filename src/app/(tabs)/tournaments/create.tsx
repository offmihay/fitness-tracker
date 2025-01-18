import { Platform, StyleSheet, View } from "react-native";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { TournamentSkillLevel, TournamentSport } from "@/src/types/tournament";
import { useTournamentMutation } from "@/src/queries/tournaments";
import RHFormInput from "@/src/components/shared/form/RHFormInput";
import ButtonDefault from "@/src/components/shared/button/ButtonDefault";
import RHFormDatePicker from "@/src/components/shared/form/RHFormDatePicker";
import RHFormDropdownInput from "@/src/components/shared/form/RHFormDropdownInput";
import ChoosePhoto, { ImageForm } from "@/src/components/tournaments/ChoosePhoto";
import CustomText from "@/src/components/shared/text/CustomText";
import { Divider } from "react-native-paper";
import { zodResolver } from "@hookform/resolvers/zod";
import schemaCreateTournament, {
  TournamentFormData,
} from "@/src/components/tournaments/create/schema";
import DualInputSection from "@/src/components/tournaments/DualInputSection";
import CustomAnimatedView from "@/src/components/shared/view/CustomAnimatedView";
import CustomKeyboardAwareScrollView from "@/src/components/shared/view/CustomKeyboardAwareScrollView";
import LayoutKeyboardScrollView from "@/src/components/navigation/layouts/LayoutKeyboardScrollView";

const CreateTournament = () => {
  const { t } = useTranslation();
  const createTournamentMutation = useTournamentMutation();
  const methods = useForm<TournamentFormData>({
    defaultValues: {},
    mode: "onSubmit",
    shouldFocusError: false,
    resolver: zodResolver(schemaCreateTournament),
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
        console.log(t("tournaments.create.successMessage"), data);
      },
      onError: (error) => {
        console.error(t("tournaments.create.errorMessage"), error);
      },
    });
  };

  const updateImages = (images: ImageForm[]) => {
    setValue("images", images);
  };

  return (
    <LayoutKeyboardScrollView
      name="createTournament"
      extraScrollHeight={Platform.OS === "android" ? 80 : -50}
      useScrollFeature
    >
      <FormProvider {...methods}>
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
              onSubmitEditing={() => setFocus("skillLevel")}
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
            </CustomAnimatedView>
          </View>
        </View>
      </FormProvider>
    </LayoutKeyboardScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});

export default CreateTournament;
