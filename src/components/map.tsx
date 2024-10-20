import { StyleSheet, View, Image } from "react-native";
import React, { useRef } from "react";
import { Button } from "react-native-paper";
import MapView, { Marker } from "react-native-maps";

type MapProps = {};

const Map = ({}: MapProps) => {
  const mapRef = useRef<MapView | null>(null);

  const handleClick = () => {
    const coordinates = {
      latitude: 50,
      longitude: 30,
    };
    mapRef.current?.animateCamera(
      { center: coordinates, altitude: 500000 },
      { duration: 2000 }
    );
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation
        showsMyLocationButton
        ref={mapRef}
      >
        <Marker coordinate={{ latitude: 50, longitude: 30 }}>
          <View style={[styles.marker]}>
            <Image
              source={require("../../../assets/icon.png")}
              style={[styles.image]}
            />
          </View>
        </Marker>
      </MapView>
      <Button style={styles.button} mode="contained" onPress={handleClick}>
        click
      </Button>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  map: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  button: {
    flex: 3,
    position: "absolute",
    left: 100,
    top: 100,
  },
  marker: {
    justifyContent: "center",
    alignItems: "center",
    width: 20,
    height: 20,
  },
  image: {
    resizeMode: "contain",
    width: "100%",
    height: "100%",
  },
});
