import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postTournament } from "@/src/queries/tournaments";
import schemaCreateTournament, {
  TournamentFormData,
} from "@/src/components/tournaments/create/form/schema";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { CreateTournamentPageQuery } from "@/src/app/(app)/(tabs)/tournaments/create";
import { router } from "expo-router";
import { useUser } from "@clerk/clerk-expo";

export const useCreateTournamentForm = (pageQuery: CreateTournamentPageQuery) => {
  const { t } = useTranslation();
  const createTournamentMutation = postTournament();
  const { user } = useUser();

  const methods = useForm<TournamentFormData>({
    defaultValues: {},
    mode: "onSubmit",
    shouldFocusError: false,
    resolver: zodResolver(schemaCreateTournament),
  });

  const {
    setValue,
    formState: { errors },
  } = methods;

  const handleFormSubmit = (data: TournamentFormData) => {
    const { isOrganizerAdded, ...formData } = data;
    createTournamentMutation.mutate(formData, {
      onSuccess: () => {
        router.back();
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
