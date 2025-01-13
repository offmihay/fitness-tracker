import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { TournamentRequest } from "../types/tournament";
import fetchApi from "../api/fetchApi";
import { TournamentFormData } from "../components/tournaments/create/types";

export const useAllTournaments = () => {
  return useQuery({
    queryKey: ["tournaments"],
    queryFn: async () => {
      const response = await fetchApi<any, TournamentRequest[]>("/tournaments");
      return response.data;
    },
    initialData: [],
    retry: 3,
    retryDelay: 3000,
  });
};

export const useTournamentByID = (id: string): UseQueryResult<TournamentRequest> => {
  return useQuery<TournamentRequest>({
    queryKey: ["tournament", id],
    queryFn: async () => {
      const response = await fetchApi<any, TournamentRequest>(`/tournaments/${id}`);
      return response.data;
    },
  });
};

export const useTournamentMutation = () => {
  return useMutation({
    mutationFn: async (data: TournamentFormData) => {
      const response = await fetchApi<TournamentFormData, any>("/tournaments", {
        method: "POST",
        body: data,
      });
      return response.data;
    },
  });
};
