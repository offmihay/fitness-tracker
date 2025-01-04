import { StyleSheet } from "react-native";
import React from "react";
import ChoosePhoto, { UploadedImageAsset } from "@/src/components/tournaments/ChoosePhoto";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {};

const Tournaments = ({}: Props) => {
  const updateImages = (images: UploadedImageAsset[]) => {
    // console.log(images);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <ChoosePhoto onImageUploadSuccess={updateImages} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});

export default Tournaments;
