import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { Tournament, TournamentBase, TournamentStatus } from "../types/tournament";
import { TournamentFormData } from "../components/tournaments/create/form/schema";
import useApi from "../api/useApi";
import { useTranslation } from "react-i18next";
import { TournamentQuery } from "../components/home/types";

export const getAllTournaments = (queryParams: Partial<TournamentQuery>) => {
  const { fetchData } = useApi();
  const limit = 10;

  return useInfiniteQuery<TournamentBase[], Error>({
    queryKey: ["tournaments", queryParams],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetchData<any, TournamentBase[]>("/tournaments", {
        queryParams: { ...queryParams, page: pageParam as number, limit },
      });
      return response.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < limit) {
        return undefined;
      }
      return allPages.length + 1;
    },
  });
};

export const getMyTournaments = (isFinished: boolean = false) => {
  const { fetchData } = useApi();
  const queryClient = useQueryClient();
  const cache = queryClient.getQueryData<TournamentBase[]>(["my-tournaments", isFinished]);

  return useQuery({
    queryKey: ["my-tournaments", isFinished],
    queryFn: async () => {
      const response = await fetchData<any, TournamentBase[]>("/tournaments/my", {
        queryParams: {
          finished: isFinished,
        },
      });
      return response.data;
    },
    refetchOnWindowFocus: true,
    enabled: !cache,
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
      queryClient.setQueryData<Tournament[]>(["my-tournaments", false], (prev) => {
        if (prev) {
          const index = prev.findIndex((t) => t.id === data.id);
          if (index === -1) {
            return [data, ...prev];
          } else {
            return [...prev.slice(0, index), data, ...prev.slice(index + 1)];
          }
        }
        return [data];
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
    onSuccess: (data) => {
      queryClient.setQueryData(["tournament", data.id], data);
      queryClient.setQueriesData<Tournament[]>(
        { queryKey: ["my-tournaments"] },
        (prev) => prev && prev.filter((t) => t.id !== data.id)
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
      queryClient.setQueryData<Tournament[]>(["my-tournaments", false], (prev) =>
        prev ? [data, ...prev] : [data]
      );
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
    onSuccess: (data, { id }) => {
      const isFinished = !data.isActive || data.status === TournamentStatus.FINISHED;
      queryClient.setQueryData(["tournament", data.id], data);
      queryClient.setQueryData<Tournament[]>(["my-tournaments", isFinished], (prev) => {
        if (prev) {
          const index = prev.findIndex((t) => t.id === data.id);
          if (index === -1) {
            return [data, ...prev];
          } else {
            return [...prev.slice(0, index), data, ...prev.slice(index + 1)];
          }
        }
        return [data];
      });
      queryClient.setQueryData<Tournament[]>(["my-tournaments", !isFinished], (prev) => {
        if (prev) {
          return prev.filter((t) => t.id !== data.id);
        }
        return [];
      });
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
      queryClient.setQueriesData<Tournament[]>(
        { queryKey: ["my-tournaments", true] },
        (prev) => prev && prev.filter((t) => t.id !== id)
      );
      queryClient.setQueriesData<Tournament[]>(
        { queryKey: ["my-tournaments", false] },
        (prev) => prev && prev.filter((t) => t.id !== id)
      );
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
        `/tournaments/${tournamentId}/user`,
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
      queryClient.setQueryData(["tournament", data.id], data);
    },
  });
};

export const updateStatus = () => {
  const { fetchData } = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ tournamentId, isActive }: { tournamentId: string; isActive: boolean }) => {
      const response = await fetchData<TournamentFormData, Tournament>(
        `/tournaments/${tournamentId}/status`,
        {
          queryParams: {
            isActive: isActive,
          },
          method: "PATCH",
        }
      );
      return response.data;
    },
    onSuccess: (data, { isActive }) => {
      queryClient.setQueryData(["tournament", data.id], data);
      queryClient.setQueryData<Tournament[]>(["my-tournaments", !isActive], (prev) => {
        if (prev) {
          const index = prev.findIndex((t) => t.id === data.id);
          if (index === -1) {
            return [data, ...prev];
          } else {
            return [...prev.slice(0, index), data, ...prev.slice(index + 1)];
          }
        }
        return [data];
      });
      queryClient.setQueryData<Tournament[]>(["my-tournaments", isActive], (prev) => {
        if (prev) {
          return prev.filter((t) => t.id !== data.id);
        }
        return [];
      });
    },
  });
};
