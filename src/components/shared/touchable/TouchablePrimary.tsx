import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Loader from "../loader/Loader";

type Props = {
  loading?: boolean;
  children: React.ReactNode;
} & React.ComponentProps<typeof TouchableOpacity>;

const TouchablePrimary = ({ loading, children, ...rest }: Props) => {
  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.85} disabled={loading} {...rest}>
      {!loading && children}
      {loading && (
        <View style={styles.loaderWrapper}>
          <Loader />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#7968F2",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  loaderWrapper: {
    position: "absolute",
    width: "100%",
    left: 0,
    right: 0,
  },
});

export default TouchablePrimary;
