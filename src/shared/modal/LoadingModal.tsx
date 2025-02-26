import { ActivityIndicator, StyleSheet, View } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";

type Props = {
  isVisible: boolean;
};

const LoadingModal = (props: Props) => {
  const { isVisible } = props;

  if (!isVisible) {
    return null;
  }
  return (
    <View
      style={{
        flex: 1,
        position: "absolute",
        width: "100%",
        height: "100%",
      }}
    >
      <BlurView style={styles.wrapper} intensity={5}>
        <ActivityIndicator size="large" />
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 1100,
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoadingModal;
