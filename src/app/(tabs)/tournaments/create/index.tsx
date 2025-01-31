import { Platform, StyleSheet, View } from "react-native";
import React from "react";
import { FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";
import CustomAnimatedView from "@/src/shared/view/CustomAnimatedView";
import LayoutKeyboardScrollView from "@/src/components/navigation/layouts/LayoutKeyboardScrollView";
import ButtonDefault from "@/src/shared/button/ButtonDefault";
import { useLocalSearchParams } from "expo-router";
import { useCreateTournamentForm } from "@/src/components/tournaments/create/form/useCreateTournamentForm";
import { TournamentEditForm } from "@/src/components/tournaments/create/form/TournamentEditForm";

export type CreateTournamentPageQuery = {
  place_id?: string;
  name?: string;
  address: string;
  latitude?: string;
  longitude?: string;
  url?: string;
};

const CreateTournament = () => {
  const { t } = useTranslation();

  const pageQuery = useLocalSearchParams<CreateTournamentPageQuery>();
  const { methods, handleFormSubmit, createTournamentMutation } =
    useCreateTournamentForm(pageQuery);

  const { handleSubmit } = methods;

  return (
    <LayoutKeyboardScrollView
      name="createTournament"
      extraScrollHeight={Platform.OS === "android" ? 80 : -55}
      useScrollFeature
    >
      <View style={styles.wrapper}>
        <FormProvider {...methods}>
          <TournamentEditForm type="create" />
          <CustomAnimatedView className="my-5">
            <ButtonDefault
              title={t("tournaments.create.createButton")}
              className="mt-4"
              onPress={handleSubmit(handleFormSubmit)}
              loading={createTournamentMutation.isPending}
            />
          </CustomAnimatedView>
        </FormProvider>
      </View>
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
