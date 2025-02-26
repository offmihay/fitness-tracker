import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postTournament } from "@/src/queries/tournaments";
import schemaCreateTournament, {
  TournamentFormData,
} from "@/src/components/tournaments/create/form/schema";
import { useEffect } from "react";
import { CreateTournamentPageQuery } from "@/src/app/(app)/(tabs)/tournaments/create";
import { router } from "expo-router";
import { useToast } from "@/src/hooks/useToast";

export const useCreateTournamentForm = (pageQuery: CreateTournamentPageQuery) => {
  const createTournamentMutation = postTournament();
  const { showSuccessToast } = useToast();

  const methods = useForm<TournamentFormData>({
    defaultValues: {},
    mode: "onSubmit",
    shouldFocusError: false,
    resolver: zodResolver(schemaCreateTournament),
  });

  const { setValue } = methods;

  const handleFormSubmit = (data: TournamentFormData) => {
    const { isOrganizerAdded, ...formData } = data;
    createTournamentMutation.mutate(formData, {
      onSuccess: () => {
        showSuccessToast("tournament_created"), router.back();
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
