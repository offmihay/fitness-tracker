import { ActivityIndicator, StyleSheet, View } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { BlurView } from "expo-blur";

type Props = {
  isVisible: boolean;
};

const LoadingModal = (props: Props) => {
  const { isVisible } = props;

  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0}
      animationIn="fadeIn"
      animationOut="fadeOut"
      style={{ margin: 0 }}
      animationInTiming={1}
      animationOutTiming={1}
    >
      <BlurView style={styles.wrapper} intensity={20}>
        <ActivityIndicator size="large" />
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoadingModal;
