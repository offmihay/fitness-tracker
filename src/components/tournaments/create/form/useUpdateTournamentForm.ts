import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateTournament } from "@/src/queries/tournaments";
import schemaCreateTournament, {
  TournamentFormData,
} from "@/src/components/tournaments/create/form/schema";
import { useEffect } from "react";
import { UpdateTournamentPageQuery } from "@/src/app/(app)/(tabs)/tournaments/edit";
import { Tournament } from "@/src/types/tournament";
import { router } from "expo-router";
import { useToast } from "@/src/hooks/useToast";

export const useUpdateTournamentForm = (pageQuery: UpdateTournamentPageQuery) => {
  const updateTournamentMutation = updateTournament();
  const { showSuccessToast } = useToast();

  const methods = useForm<TournamentFormData>({
    mode: "onSubmit",
    shouldFocusError: false,
    resolver: zodResolver(schemaCreateTournament),
  });
  const { setValue, reset } = methods;

  const setInitialData = (initialData: Tournament) => {
    const images = initialData.images.map((image) => ({
      publicId: image.publicId,
      secure_url: image.secureUrl,
    }));
    reset({
      sportType: initialData.sportType,
      title: initialData.title,
      description: initialData.description,
      images,
      entryFee: initialData.entryFee,
      prizePool: initialData.prizePool,
      ageRestrictions: initialData.ageRestrictions,
      maxParticipants: initialData.maxParticipants,
      skillLevel: initialData.skillLevel,
      format:
        initialData.format && initialData.format.length !== 0 ? initialData.format : undefined,
      rules: initialData.rules && initialData.rules.length !== 0 ? initialData.rules : undefined,
      city: initialData.city,
      location: initialData.location,
      dateStart: initialData.dateStart ? new Date(initialData.dateStart) : undefined,
      dateEnd: initialData.dateEnd ? new Date(initialData.dateEnd) : undefined,
      geoCoordinates: initialData.geoCoordinates,
      isOrganizerAdded: true,
    });
  };

  const handleFormSubmit = (data: TournamentFormData, id: string) => {
    const { isOrganizerAdded, ...formData } = data;
    updateTournamentMutation.mutate(
      { data: formData, id },
      {
        onSuccess: () => {
          showSuccessToast("tournament_updated"), router.back();
        },
      }
    );
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
    updateTournamentMutation,
    setInitialData,
  };
};
