import { Platform, StyleSheet, View } from "react-native";
import React, { useRef } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import MapView, { Callout, MapPressEvent, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";

type Props = {
  geoCoordinates?: {
    latitude: number;
    longitude: number;
  };
  description?: string;
};

const CustomMap = ({ geoCoordinates, description }: Props) => {
  const mapRef = useRef<MapView | null>(null);
  const theme = useCustomTheme();

  const onMapReady = () => {
    mapRef.current?.animateCamera(
      { center: geoCoordinates, altitude: 1000, zoom: 10 },
      { duration: 1000 }
    );
  };

  return (
    <>
      <MapView
        style={styles.map}
        showsUserLocation
        showsMyLocationButton
        ref={mapRef}
        onMapReady={onMapReady}
        provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
      >
        {geoCoordinates && (
          <Marker coordinate={geoCoordinates}>
            <View style={[styles.marker]}>
              <FontAwesome6 name="location-dot" size={40} color="red" />
            </View>
          </Marker>
        )}
      </MapView>
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  marker: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
  },

  containerStyle: { backgroundColor: "white", padding: 20 },
});

export default CustomMap;
