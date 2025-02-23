import { useQuery } from "@tanstack/react-query";
import * as Location from "expo-location";
import useApi from "../api/useApi";

export type GeoCoordinates = {
  latitude: number;
  longitude: number;
};
export const useUserCoordinates = (disableFetchLocation?: boolean) => {
  const { fetchData } = useApi();
  return useQuery<GeoCoordinates | undefined>({
    queryKey: ["userCoordinates"],
    queryFn: async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== Location.PermissionStatus.GRANTED && !disableFetchLocation) {
        const response = await fetchData<any, { lat: number; lng: number }>("/location");
        return {
          latitude: response.data.lat,
          longitude: response.data.lng,
        };
      }
      const location = await Location.getCurrentPositionAsync({});
      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    },
    staleTime: 1000 * 60 * 15,
    meta: {
      disableGlobalErrorHandler: true,
    },
  });
};
