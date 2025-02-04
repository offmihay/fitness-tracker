import { Platform, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";
import CustomAnimatedView from "@/src/shared/view/CustomAnimatedView";
import LayoutKeyboardScrollView from "@/src/components/navigation/layouts/LayoutKeyboardScrollView";
import ButtonDefault from "@/src/shared/button/ButtonDefault";
import { useLocalSearchParams } from "expo-router";
import { TournamentEditForm } from "@/src/components/tournaments/create/form/TournamentEditForm";
import { useUpdateTournamentForm } from "@/src/components/tournaments/create/form/useEditTournamentForm";
import { getTournamentByID } from "@/src/queries/tournaments";
import { FormSkeleton } from "@/src/components/tournaments/create/FormSkeleton";

export type UpdateTournamentPageQuery = {
  id: string;
  place_id?: string;
  name?: string;
  address: string;
  latitude?: string;
  longitude?: string;
  url?: string;
};

const UpdateTournament = () => {
  const { t } = useTranslation();
  const pageQuery = useLocalSearchParams<UpdateTournamentPageQuery>();
  const [formReady, setFormReady] = useState(false);

  const { methods, handleFormSubmit, updateTournamentMutation, setInitialData } =
    useUpdateTournamentForm(pageQuery);
  const { handleSubmit } = methods;

  const { data: initialData, isLoading } = getTournamentByID(pageQuery.id);
  useEffect(() => {
    if (!isLoading && initialData) {
      setInitialData(initialData);
      setFormReady(true);
    }
  }, [initialData]);

  console.log(pageQuery.id);

  return (
    <LayoutKeyboardScrollView
      name="editTournament"
      extraScrollHeight={Platform.OS === "android" ? 80 : -55}
      useScrollFeature
      scrollEnabled={!!formReady}
    >
      <View style={styles.wrapper}>
        {!!formReady ? (
          <FormProvider {...methods}>
            <TournamentEditForm type="edit" id={pageQuery.id} />
            <CustomAnimatedView className="my-5">
              <ButtonDefault
                title={t("tournaments.edit.editButton")}
                className="mt-4"
                onPress={handleSubmit((data) => handleFormSubmit(data, pageQuery.id))}
                loading={updateTournamentMutation.isPending}
              />
            </CustomAnimatedView>
          </FormProvider>
        ) : (
          <FormSkeleton />
        )}
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

export default UpdateTournament;
