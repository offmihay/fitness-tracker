import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { TournamentRequest } from "../types/tournament";
import fetchApi from "../api/fetchApi";
import { TournamentFormData } from "../components/tournaments/create/form/schema";
import Toast from "react-native-toast-message";

export const getTournaments = () => {
  return useQuery({
    queryKey: ["tournaments"],
    queryFn: async () => {
      const response = await fetchApi<any, TournamentRequest[]>("/tournaments");
      return response.data;
    },
    initialData: [],
    retry: 3,
    retryDelay: 1000,
  });
};

export const getTournamentByID = (id: string): UseQueryResult<TournamentRequest> => {
  return useQuery<TournamentRequest>({
    queryKey: ["tournament", id],
    queryFn: async () => {
      const response = await fetchApi<any, TournamentRequest>(`/tournaments/${id}`);

      return response.data;
    },
  });
};

export const postTournament = () => {
  return useMutation({
    mutationFn: async (data: TournamentFormData) => {
      const response = await fetchApi<TournamentFormData, any>("/tournaments", {
        method: "POST",
        body: data,
      });
      return response.data;
    },
    onError: (error) => {
      Toast.show({
        type: "errorToast",
        props: { text: error.message },
      });
    },
  });
};

export const updateTournament = () => {
  return useMutation({
    mutationFn: async ({ data, id }: { data: TournamentFormData; id: string }) => {
      const response = await fetchApi<TournamentFormData, any>(`/tournaments/${id}`, {
        method: "PUT",
        body: data,
      });
      return response.data;
    },
    onError: (error) => {
      Toast.show({
        type: "errorToast",
        props: { text: error.message },
      });
    },
  });
};

export const deleteTournament = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetchApi<TournamentFormData, any>(`/tournaments/${id}`, {
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
