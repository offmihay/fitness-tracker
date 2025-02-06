import { useMutation, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { Tournament, TournamentBase } from "../types/types";
import { TournamentFormData } from "../components/tournaments/create/form/schema";
import Toast from "react-native-toast-message";
import useApi from "../api/useApi";
import { useTranslation } from "react-i18next";

export const getTournaments = () => {
  const { fetchData } = useApi();
  return useQuery({
    queryKey: ["tournaments"],
    queryFn: async () => {
      const response = await fetchData<any, TournamentBase[]>("/tournaments");
      return response.data;
    },
    initialData: [],
  });
};

export const getCreatedTournaments = () => {
  const { fetchData } = useApi();
  return useQuery({
    queryKey: ["created-tournaments"],
    queryFn: async () => {
      const response = await fetchData<any, TournamentBase[]>("/tournaments/created");
      return response.data;
    },
    initialData: [],
  });
};

export const getParticipatedTournaments = () => {
  const { fetchData } = useApi();
  return useQuery({
    queryKey: ["participated-tournaments"],
    queryFn: async () => {
      const response = await fetchData<any, TournamentBase[]>("/tournaments/participated");
      return response.data;
    },
    initialData: [],
  });
};

export const registerTournament = () => {
  const queryClient = useQueryClient();
  const { fetchData } = useApi();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetchData<any, TournamentBase>(`/tournaments/${id}/register`, {
        method: "POST",
      });
      return response.data;
    },
    onError: (error) => {
      Toast.show({
        type: "errorToast",
        props: { text: error.message },
      });
    },
    // onSuccess: () => {
    //   Toast.show({
    //     type: "successToast",
    //     props: { text: "U SUCCESSFULLY REGISTRED" },
    //   });
    //   queryClient.invalidateQueries({
    //     queryKey: ["participated-tournaments"],
    //   });
    // },
  });
};

export const leaveTournament = () => {
  const queryClient = useQueryClient();
  const { fetchData } = useApi();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetchData<any, TournamentBase>(`/tournaments/${id}/leave`, {
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
    onSuccess: () => {
      Toast.show({
        type: "successToast",
        props: { text: "U leaved this tournament" },
      });
      queryClient.invalidateQueries({
        queryKey: ["participated-tournaments"],
      });
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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["created-tournaments"],
      });
      queryClient.invalidateQueries({
        queryKey: ["tournaments"],
      });
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
    onSuccess: (_, { id }) => {
      Toast.show({
        type: "successToast",
        props: { text: t("tournaments.edit.successMessage") },
      });
      // replace the updated tournament in the tournaments list cache
      // queryClient.setQueryData(["tournaments"], (prevData: Tournament[]) => {
      //   debugger;
      //   const idx = prevData.findIndex((tournament) => tournament.id === id);
      //   if (idx >= 0) {
      //     prevData[idx] = updatedTournament;
      //   }
      //   return [...prevData];
      // });
      queryClient.invalidateQueries({
        queryKey: ["created-tournaments"],
      });
      queryClient.invalidateQueries({
        queryKey: ["tournaments"],
      });
      queryClient.invalidateQueries({
        queryKey: ["tournament", id],
      });
    },
  });
};

export const deleteTournament = () => {
  const { fetchData } = useApi();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetchData<TournamentFormData, any>(`/tournaments/${id}`, {
        method: "DELETE",
      });
      return response.data;
    },
    onSuccess: (data) => {
      Toast.show({
        type: "successToast",
        props: { text: data.message },
      });
    },
    onError: (error) => {
      Toast.show({
        type: "errorToast",
        props: { text: error.message },
      });
    },
  });
};
