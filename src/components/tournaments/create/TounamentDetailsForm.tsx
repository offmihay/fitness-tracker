import React from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { TournamentSport } from "@/src/types/tournament";
import RHFormDropdownInput from "@/src/shared/form/RHFormDropdownInput";
import RHFormInput from "@/src/shared/form/RHFormInput";
import ChoosePhoto, { ImageForm } from "./ChoosePhoto";
import DualInputSection from "../DualInputSection";
import { TournamentFormData } from "./schema";
import CustomText from "@/src/shared/text/CustomText";

export const TournamentDetailsForm = () => {
  const { t } = useTranslation();
  const {
    control,
    watch,
    setValue,
    setFocus,
    formState: { errors },
  } = useFormContext<TournamentFormData>();

  const updateImages = (images: ImageForm[]) => {
    setValue("images", images);
  };

  return (
    <>
      <CustomText type="subtitle" className="ml-1 mb-3">
        Tournament Details
      </CustomText>
      <RHFormDropdownInput
        control={control}
        name="sportType"
        label={t("tournament.sportType.title")}
        inputProps={{
          value: watch("sportType") && t(`tournament.sportType.${watch("sportType")}`),
        }}
        dropdownProps={{
          selectedValue: watch("sportType"),
          onValueChange: (itemValue) => setValue("sportType", itemValue || undefined),
          items: [
            { label: t("tournament.sportType.tennis"), value: TournamentSport.Tennis },
            { label: t("tournament.sportType.badminton"), value: TournamentSport.Badminton },
            { label: t("tournament.sportType.squash"), value: TournamentSport.Squash },
            { label: t("tournament.sportType.tableTennis"), value: TournamentSport.TableTennis },
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
          style: { height: 100 },
          styleWrapper: { height: 110 },
          multiline: true,
          textAlignVertical: "top",
          returnKeyType: "default",
          useClearButton: false,
        }}
        control={control}
      />

      <ChoosePhoto onImageUploadSuccess={updateImages} errorMessage={errors.images?.message!} />

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
          inputProps={{ keyboardType: "number-pad" }}
          control={control}
          onSubmitEditing={() => setFocus("ageRestrictions.minAge")}
        />
      </DualInputSection>
    </>
  );
};
