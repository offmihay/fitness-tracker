import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { Tournament } from "../types/Tournament";

const getData = async <TData>(url: string) => {
  const data = await fetch(url);
  const json = await data.json();
  return json as TData;
};

export const useAllTournamentsQuery = () => {
  return useQuery({
    queryKey: ["tournaments"],
    queryFn: () => {
      return getData<Tournament[]>("https://67532eb7f3754fcea7bb12e9.mockapi.io/tournaments");
    },
    initialData: [],
  });
};

export const useTournamentQuery = (id: string): UseQueryResult<Tournament> => {
  return useQuery<Tournament>({
    queryKey: ["tournament", id],
    queryFn: async (): Promise<Tournament> => {
      const data = await fetch(
        `https://67532eb7f3754fcea7bb12e9.mockapi.io/tournaments/${id}`
      ).then((response) => response.json());

      return data;
    },
  });
};

export const useCreateTournamentMutation = () => {
  return useMutation({
    mutationFn: async (data: Tournament): Promise<Tournament> => {
      const response = await fetch("https://67532eb7f3754fcea7bb12e9.mockapi.io/tournaments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create tournament");
      }

      return response.json();
    },
  });
};
