import React, { ReactNode } from "react";
import { StyleSheet, View, StyleProp, ViewStyle } from "react-native";
import FastImage, { Source, ResizeMode } from "@d11/react-native-fast-image";

interface BackgroundImageProps {
  source: Source;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  resizeMode?: ResizeMode;
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({
  source,
  children,
  style,
  resizeMode = FastImage.resizeMode.cover,
}) => {
  return (
    <View style={[styles.container, style]}>
      <FastImage style={styles.image} source={source} resizeMode={resizeMode} />
      <View style={styles.childrenContainer}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  childrenContainer: {
    flex: 1,
  },
});

export default BackgroundImage;
