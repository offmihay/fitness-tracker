import { useQuery } from "@tanstack/react-query";
import * as Location from "expo-location";

export type GeoCoordinates = {
  latitude: number;
  longitude: number;
};
export const useUserCoordinates = () => {
  return useQuery<GeoCoordinates>({
    queryKey: ["userCoordinates"],
    queryFn: async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== Location.PermissionStatus.GRANTED) {
        return {
          latitude: 0,
          longitude: 0,
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
