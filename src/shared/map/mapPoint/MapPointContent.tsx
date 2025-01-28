import { Alert, Linking, Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MapView, { MapPressEvent, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import Toast from "react-native-toast-message";
import ButtonDefault from "@/src/shared/button/ButtonDefault";
import { useBottomSheetModal } from "@gorhom/bottom-sheet";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { MaterialIcons } from "@expo/vector-icons";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";

export type LocationObject = {
  latitude: number;
  longitude: number;
};

type Props = { onChoose?: (location: LocationObject) => void; geoCoordinates?: LocationObject };

const MapPointContent = (props: Props) => {
  const theme = useCustomTheme();
  const { onChoose, geoCoordinates: initialCoodinates } = props;
  const { dismiss } = useBottomSheetModal();
  const mapRef = useRef<MapView | null>(null);

  const [location, setLocation] = useState<LocationObject | null>(null);
  const [geoCoordinates, setGeoCoordinates] = useState<LocationObject | null>(
    initialCoodinates || null
  );
  const [permissionStatus, setPermissionStatus] = useState<
    "granted" | "denied" | "undetermined" | null
  >(null);

  const getPermissonStatus = async () => {
    const { status } = await Location.requestBackgroundPermissionsAsync();
    setPermissionStatus(status);
    return status;
  };

  const getCurrentLocation = async () => {
    const userLocation = await Location.getCurrentPositionAsync({});

    const latitude = userLocation.coords.latitude;
    const longitude = userLocation.coords.longitude;
    if (!!latitude && !!longitude) {
      return {
        latitude,
        longitude,
      };
    }
  };

  const zoomToLocation = (location: LocationObject) => {
    mapRef.current?.animateCamera(
      { center: location, altitude: 50000, zoom: 14 },
      { duration: 1000 }
    );
  };

  useEffect(() => {
    const fetchPermissionAndLocation = async () => {
      permissionStatus || (await getPermissonStatus());
      // if (status === "granted") {
      //   const location = await getCurrentLocation();
      //   location && setLocation(location);
      // }
    };

    fetchPermissionAndLocation();
  }, []);

  const onMapReady = () => {
    const coords = geoCoordinates || location;
    coords && zoomToLocation(coords);
  };

  useEffect(() => {
    const coords = location;
    coords && zoomToLocation(coords);
  }, [location]);

  const handleSetLocation = async () => {
    const status = permissionStatus || (await getPermissonStatus());
    if (status === "granted") {
      const location = await getCurrentLocation();
      location && setLocation(location);
    } else {
      Alert.alert(
        "App doesn't have permission to your location. Go to settings and change Location permissions.",
        "",
        [
          {
            text: "Settings",
            onPress: Linking.openSettings,
            style: "default",
          },
          {
            text: "Cancel",
            style: "cancel",
          },
        ]
      );
      return;
    }
  };

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
          onMapReady={onMapReady}
          style={styles.map}
          showsUserLocation
          showsMyLocationButton
          ref={mapRef}
          provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
          onPress={onLocationSelect}
          zoomControlEnabled={false}
        >
          {geoCoordinates && <Marker coordinate={geoCoordinates}></Marker>}
        </MapView>
      </View>
      <View style={styles.applyBtn}>
        <ButtonDefault
          title="Apply choice"
          disabled={!geoCoordinates}
          activeOpacity={0.9}
          onPress={() => handleApplyChoice()}
        />
      </View>
      <View style={styles.applyBtn}>
        <TouchableOpacity
          style={[styles.myLocationBtn, { backgroundColor: theme.colors.surface }]}
          onPress={handleSetLocation}
          disabled={!geoCoordinates}
        >
          <MaterialIcons name="my-location" size={30} color={theme.colors.link} />
        </TouchableOpacity>
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

  applyBtn: {
    position: "absolute",
    bottom: 40,
    left: 30,
    right: 30,
  },

  myLocationBtn: {
    position: "absolute",
    bottom: 90,
    right: 0,
    width: 50,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
});

export default MapPointContent;
