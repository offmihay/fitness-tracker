import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { Tournament } from "../types/Tournament";
import testData from "../../assets/testData.json";

export const useAllTournamentsQuery = (
  options?: UseQueryOptions<Tournament[]>
): UseQueryResult<Tournament[]> => {
  return useQuery<Tournament[]>({
    queryKey: ["tournaments"],
    queryFn: async (): Promise<Tournament[]> => {
      const data = fetch("https://67532eb7f3754fcea7bb12e9.mockapi.io/tournaments").then(
        (response) => response.json()
      );
      return data;
      // return testData as Tournament[];
    },
    initialData: [],
    ...options,
  });
};

export const useTournamentQuery = (
  id: string,
  options?: UseQueryOptions<Tournament>
): UseQueryResult<Tournament> => {
  return useQuery<Tournament>({
    queryKey: ["tournament", id],
    queryFn: async (): Promise<Tournament> => {
      const data = await fetch(
        `https://67532eb7f3754fcea7bb12e9.mockapi.io/tournaments/${id}`
      ).then((response) => response.json());

      return data;
    },

    ...options,
  });
};
