import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { Tournament } from "../types/TournamentType";
import fetchApi from "../api/Api";

export const useAllTournaments = () => {
  return useQuery({
    queryKey: ["tournaments"],
    queryFn: async () => {
      const response = await fetchApi<any, Tournament[]>("/tournaments");
      return response.data;
    },
    initialData: [],
  });
};

export const useTournamentByID = (id: string): UseQueryResult<Tournament> => {
  return useQuery<Tournament>({
    queryKey: ["tournament", id],
    queryFn: async () => {
      const response = await fetchApi<any, Tournament>(`/tournaments/${id}`);
      return response.data;
    },
  });
};

export const useTournamentMutation = () => {
  return useMutation({
    mutationFn: async (data: Tournament): Promise<Tournament> => {
      const response = await fetchApi<Tournament, Tournament>("/tournaments", {
        method: "POST",
        body: data,
      });
      return response.data;
    },
  });
};
