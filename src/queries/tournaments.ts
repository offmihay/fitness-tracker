import { useMutation, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { Tournament, TournamentBase } from "../types/tournament";
import { TournamentFormData } from "../components/tournaments/create/form/schema";
import Toast from "react-native-toast-message";
import useApi from "../api/useApi";
import { useTranslation } from "react-i18next";
import { TournamentQuery } from "../components/home/types";

export const getTournaments = (queryParams: Partial<TournamentQuery>) => {
  const { fetchData } = useApi();
  return useQuery({
    queryKey: ["tournaments", queryParams],
    queryFn: async () => {
      const response = await fetchData<any, TournamentBase[]>("/tournaments", { queryParams });
      return response.data;
    },
    initialData: [],
  });
};

export const getCreatedTournaments = (enabled: boolean) => {
  const { fetchData } = useApi();
  const queryClient = useQueryClient();
  const cachedData = queryClient.getQueryData<TournamentBase[]>(["created-tournaments"]);
  return useQuery({
    queryKey: ["created-tournaments"],
    queryFn: async () => {
      const response = await fetchData<any, TournamentBase[]>("/tournaments/created");
      return response.data;
    },
    enabled: enabled && !cachedData,
    refetchOnWindowFocus: true,
  });
};

export const getParticipatedTournaments = (enabled: boolean) => {
  const { fetchData } = useApi();

  const queryClient = useQueryClient();
  const cachedData = queryClient.getQueryData<TournamentBase[]>(["participated-tournaments"]);

  return useQuery({
    queryKey: ["participated-tournaments"],
    queryFn: async () => {
      const response = await fetchData<any, TournamentBase[]>("/tournaments/participated");
      return response.data;
    },
    enabled: enabled && !cachedData,
    refetchOnWindowFocus: true,
  });
};

export const registerTournament = () => {
  const queryClient = useQueryClient();
  const { fetchData } = useApi();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetchData<any, Tournament>(`/tournaments/${id}/register`, {
        method: "POST",
      });
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["tournament", data.id], data);
      queryClient.setQueryData<Tournament[]>(["participated-tournaments"], (prev) => [
        ...prev!,
        data,
      ]);
    },
    onError: (error) => {
      Toast.show({
        type: "errorToast",
        props: { text: error.message },
      });
    },
  });
};

export const leaveTournament = () => {
  const queryClient = useQueryClient();
  const { fetchData } = useApi();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetchData<any, Tournament>(`/tournaments/${id}/leave`, {
        method: "DELETE",
      });
      return response.data;
    },
    onError: (error) => {
      Toast.show({
        type: "errorToast",
        props: { text: error.message },
      });
    },
    onSuccess: (data) => {
      Toast.show({
        type: "successToast",
        props: { text: "U leaved this tournament" },
      });
      queryClient.setQueryData(["tournament", data.id], data);
      queryClient.setQueryData<Tournament[]>(["participated-tournaments"], (prev) =>
        prev?.filter((t) => t.id !== data.id)
      );
    },
  });
};

export const getTournamentByID = (id: string): UseQueryResult<Tournament> => {
  const { fetchData } = useApi();

  return useQuery<Tournament>({
    queryKey: ["tournament", id],
    queryFn: async () => {
      const response = await fetchData<any, Tournament>(`/tournaments/${id}`);

      return response.data;
    },
    refetchOnMount: false,
  });
};

export const postTournament = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { fetchData } = useApi();
  return useMutation({
    mutationFn: async (data: TournamentFormData) => {
      const response = await fetchData<TournamentFormData, any>("/tournaments", {
        method: "POST",
        body: data,
      });
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData<Tournament[]>(["created-tournaments"], (prev) => [...prev!, data]);
      Toast.show({
        type: "successToast",
        props: { text: t("tournaments.create.successMessage") },
      });
    },
    onError: (error) => {
      Toast.show({
        type: "errorToast",
        props: { text: t("tournaments.create.errorMessage") },
      });
    },
  });
};

export const updateTournament = () => {
  const { fetchData } = useApi();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data, id }: { data: TournamentFormData; id: string }) => {
      const response = await fetchData<TournamentFormData, Tournament>(`/tournaments/${id}`, {
        method: "PUT",
        body: data,
      });
      return response.data;
    },
    onError: () => {
      Toast.show({
        type: "errorToast",
        props: { text: t("tournaments.edit.errorMessage") },
      });
    },
    onSuccess: (data, { id }) => {
      Toast.show({
        type: "successToast",
        props: { text: t("tournaments.edit.successMessage") },
      });
      queryClient.setQueryData<Tournament[]>(["created-tournaments"], (prev) => {
        const newData = prev?.filter((t) => t.id !== id);
        return [data, ...newData!];
      });
      queryClient.setQueryData(["tournament", data.id], data);
    },
  });
};

export const deleteTournament = () => {
  const { fetchData } = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetchData<TournamentFormData, { message: boolean }>(
        `/tournaments/${id}`,
        {
          method: "DELETE",
        }
      );
      return response.data;
    },
    onSuccess: (data, id) => {
      Toast.show({
        type: "successToast",
        props: { text: data.message },
      });
      queryClient.setQueryData<Tournament[]>(["created-tournaments"], (prev) =>
        prev?.filter((t) => t.id !== id)
      );
    },
    onError: (error) => {
      Toast.show({
        type: "errorToast",
        props: { text: error.message },
      });
    },
  });
};

export const removeUser = () => {
  const { fetchData } = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      tournamentId,
      participantId,
    }: {
      tournamentId: string;
      participantId: string;
    }) => {
      const response = await fetchData<TournamentFormData, Tournament>(
        `/tournaments/${tournamentId}`,
        {
          queryParams: {
            participantId,
          },
          method: "PATCH",
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      Toast.show({
        type: "successToast",
        props: { text: "User was succesfully deleted." },
      });
      queryClient.setQueryData(["tournament", data.id], data);
    },
    onError: (error) => {
      Toast.show({
        type: "errorToast",
        props: { text: error.message },
      });
    },
  });
};
