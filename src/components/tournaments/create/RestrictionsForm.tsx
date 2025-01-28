import React, { useState } from "react";
import { Pressable } from "react-native";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { TournamentFormat, TournamentSkillLevel } from "@/src/types/tournament";
import RHFormDropdownInput from "@/src/shared/form/RHFormDropdownInput";
import RHFormInput from "@/src/shared/form/RHFormInput";
import DualInputSection from "../DualInputSection";
import CustomText from "@/src/shared/text/CustomText";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { TournamentFormData } from "./schema";
import CustomAnimatedView from "@/src/shared/view/CustomAnimatedView";
import { Divider } from "react-native-paper";

export const RestrictionsForm = () => {
  const { t } = useTranslation();
  const [isOpenedAdditional, setIsOpenedAdditional] = useState(false);
  const theme = useCustomTheme();

  const { control, watch, setValue, setFocus } = useFormContext<TournamentFormData>();

  return (
    <>
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
          onValueChange: (itemValue) => setValue("skillLevel", itemValue || undefined),
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
      <Pressable
        onPress={() => setIsOpenedAdditional((prev) => !prev)}
        className="mb-2"
        style={{ width: 180 }}
      >
        <CustomText color={theme.colors.link}>Additional parameters</CustomText>
      </Pressable>
      {isOpenedAdditional && (
        <>
          <RHFormDropdownInput
            control={control}
            name="format"
            label={t("tournament.format.title")}
            inputProps={{
              value: watch("format") && t(`tournament.format.${watch("format")}`),
            }}
            dropdownProps={{
              selectedValue: watch("format")!,
              onValueChange: (itemValue) => setValue("format", itemValue || undefined),
              items: [
                {
                  label: t("tournament.format.singles"),
                  value: TournamentFormat.Singles,
                },
                {
                  label: t("tournament.format.doubles"),
                  value: TournamentFormat.Doubles,
                },
                {
                  label: t("tournament.format.squad"),
                  value: TournamentFormat.Squad,
                },
              ],
              selectAnLabel: t("tournament.format.label"),
            }}
          />
          <RHFormInput
            name="rules"
            label={t("tournament.rules")}
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
        </>
      )}
    </>
  );
};
