import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postTournament } from "@/src/queries/tournaments";
import schemaCreateTournament, {
  TournamentFormData,
} from "@/src/components/tournaments/create/form/schema";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { CreateTournamentPageQuery } from "@/src/app/(tabs)/tournaments/create";
import Toast from "react-native-toast-message";
import { router } from "expo-router";

export const useCreateTournamentForm = (pageQuery: CreateTournamentPageQuery) => {
  const { t } = useTranslation();
  const createTournamentMutation = postTournament();

  const methods = useForm<TournamentFormData>({
    defaultValues: {},
    mode: "onSubmit",
    shouldFocusError: false,
    resolver: zodResolver(schemaCreateTournament),
  });

  const { setValue } = methods;

  const handleFormSubmit = (data: TournamentFormData) => {
    const dataAdd = {
      ...data,
      status: "upcoming",
    };
    createTournamentMutation.mutate(dataAdd, {
      onSuccess: () => {
        Toast.show({
          type: "successToast",
          props: { text: t("tournaments.update.successMessage") },
        });
        router.back();
      },
      onError: () => {
        Toast.show({
          type: "errorToast",
          props: { text: t("tournaments.update.errorMessage") },
        });
      },
    });
  };

  useEffect(() => {
    if (pageQuery.latitude && pageQuery.longitude && pageQuery.address) {
      setValue("geoCoordinates.latitude", Number(pageQuery.latitude));
      setValue("geoCoordinates.longitude", Number(pageQuery.longitude));
      setValue("location", `${pageQuery.address}`);
    }
  }, [pageQuery.latitude, pageQuery.longitude, pageQuery.address, setValue]);

  return {
    methods,
    handleFormSubmit,
    createTournamentMutation,
  };
};
