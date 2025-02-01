import { useMutation, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { Tournament } from "../types/tournament";
import fetchApi from "../api/fetchApi";
import { TournamentFormData } from "../components/tournaments/create/form/schema";
import Toast from "react-native-toast-message";

export const getTournaments = () => {
  return useQuery({
    queryKey: ["tournaments"],
    queryFn: async () => {
      const response = await fetchApi<any, Tournament[]>("/tournaments");
      return response.data;
    },
    initialData: [],
  });
};

export const getTournamentByID = (id: string): UseQueryResult<Tournament> => {
  return useQuery<Tournament>({
    queryKey: ["tournament", id],
    queryFn: async () => {
      const response = await fetchApi<any, Tournament>(`/tournaments/${id}`);

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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data, id }: { data: TournamentFormData; id: string }) => {
      const response = await fetchApi<TournamentFormData, Tournament>(`/tournaments/${id}`, {
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
    onSuccess: (updatedTournament, { id }) => {
      Toast.show({
        type: "successToast",
        props: { text: "Successfully updated tournament" },
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
        queryKey: ["tournaments"],
      });
      queryClient.invalidateQueries({
        queryKey: ["tournament", id],
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
