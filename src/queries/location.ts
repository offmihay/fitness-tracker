import { useEffect } from "react";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useApi from "../api/useApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export type GeoCoordinates = {
  latitude: number;
  longitude: number;
};

export const useUserCoordinates = (disableFetchLocation?: boolean) => {
  const { fetchData } = useApi();
  const queryClient = useQueryClient();

  const fetchLocation = async (): Promise<GeoCoordinates | null> => {
    const { status } = await Location.getForegroundPermissionsAsync();
    if (status !== Location.PermissionStatus.GRANTED && !disableFetchLocation) {
      const response = await fetchData<any, { lat: number; lng: number }>("/location");
      if (response.data.lat && response.data.lng) {
        return {
          latitude: response.data.lat,
          longitude: response.data.lng,
        };
      }
      return null;
    }
    const newStatus = await Location.requestForegroundPermissionsAsync();
    if (newStatus.status === Location.PermissionStatus.DENIED) {
      return null;
    }
    const location = await Location.getCurrentPositionAsync();
    const apiCoords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    await AsyncStorage.setItem("userCoordinates", JSON.stringify(apiCoords));
    return apiCoords;
  };

  const getCachedLocation = async (): Promise<GeoCoordinates | null> => {
    const storageLocationJSON = await AsyncStorage.getItem("userCoordinates");
    return storageLocationJSON ? JSON.parse(storageLocationJSON) : null;
  };

  const query = useQuery<GeoCoordinates | null>({
    queryKey: ["userCoordinates"],
    queryFn: async () => {
      const cached = await getCachedLocation();
      if (cached) {
        return cached;
      }
      return null;
    },
    staleTime: 1000 * 60 * 15,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    meta: {
      disableGlobalErrorHandler: true,
    },
    retry: 0,
  });

  useEffect(() => {
    (async () => {
      const newLocation = await fetchLocation();
      if (newLocation) {
        queryClient.setQueryData(["userCoordinates"], newLocation);
      }
    })();
  }, []);

  return query;
};
