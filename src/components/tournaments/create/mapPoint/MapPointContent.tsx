import { Platform, StyleSheet, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MapView, { MapPressEvent, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import Toast from "react-native-toast-message";
import { FontAwesome6 } from "@expo/vector-icons";
import ButtonDefault from "@/src/shared/button/ButtonDefault";
import { useBottomSheetModal } from "@gorhom/bottom-sheet";

export type LocationObject = {
  latitude: number;
  longitude: number;
};

type Props = { onChoose?: (location: LocationObject) => void; geoCoordinates?: LocationObject };

const MapPointContent = (props: Props) => {
  const { onChoose, geoCoordinates: initialCoodinates } = props;
  const { dismiss } = useBottomSheetModal();
  const mapRef = useRef<MapView | null>(null);

  const [location, setLocation] = useState<LocationObject | null>(null);
  const [geoCoordinates, setGeoCoordinates] = useState<LocationObject | null>(
    initialCoodinates || null
  );

  //   useEffect(() => {
  //     async function getCurrentLocation() {
  //       let { status } = await Location.requestForegroundPermissionsAsync();
  //       if (status !== "granted") {
  //         Toast.show({
  //           type: "errorToast",
  //           props: { text: "Permission to access location was denied" },
  //         });
  //         return;
  //       }

  //       let location = await Location.getCurrentPositionAsync({});
  //       setLocation(location);
  //     }

  //     getCurrentLocation();
  //   }, []);

  // const onMapReady = () => {
  //   mapRef.current?.animateCamera(
  //     { center: geoCoordinates, altitude: 1000, zoom: 10 },
  //     { duration: 1000 }
  //   );
  // };

  const onLocationSelect = (event: MapPressEvent) => {
    setGeoCoordinates(event.nativeEvent.coordinate);
  };

  const handleApplyChoice = () => {
    dismiss();
    geoCoordinates && onChoose?.(geoCoordinates);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.mapContainer}>
        <MapView
          // onMapReady={onMapReady}
          style={styles.map}
          showsUserLocation
          showsMyLocationButton
          ref={mapRef}
          provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
          onPress={onLocationSelect}
          zoomControlEnabled={false}
        >
          {geoCoordinates && (
            <Marker coordinate={geoCoordinates}>
              <View style={[styles.marker]}>
                <FontAwesome6 name="location-dot" size={40} color="red" />
              </View>
            </Marker>
          )}
        </MapView>
      </View>
      <View style={styles.btn}>
        <ButtonDefault
          title="Apply choice"
          disabled={!geoCoordinates}
          activeOpacity={0.9}
          onPress={() => handleApplyChoice()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    overflow: "hidden",
    position: "relative",
    // paddingTop: 50,
  },
  map: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    overflow: "hidden",
  },

  marker: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
  },

  btn: {
    position: "absolute",
    bottom: 40,
    left: 30,
    right: 30,
  },
});

export default MapPointContent;
