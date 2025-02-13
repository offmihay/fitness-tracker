import React, { useEffect, useRef, useState, useLayoutEffect, Children } from "react";
import {
  Alert,
  Dimensions,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import FastImage, { FastImageProps, Source } from "@d11/react-native-fast-image";
import Animated, {
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import { Feather, FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import Modal from "react-native-modal";
import * as Haptics from "expo-haptics";
import Carousel from "../carousel/Carousel";
import { deleteImageConfirmationAlert } from "../alerts/alerts";
import { t } from "i18next";

export type ExpandableGroupImagesProps<T extends Object> = {
  expadedImageWrapperStyle?: ViewStyle;
  onDelete?: (index: number) => void;
  images: Array<T & { width: number; height: number; isError: boolean } & FastImageProps>;
  renderItem: (image: T, index: number) => React.ReactNode;
};

const ExpandableGroupImages = <T extends Object>(props: ExpandableGroupImagesProps<T>) => {
  const { expadedImageWrapperStyle, onDelete, images, renderItem } = props;

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const scale = useSharedValue(0);
  const position = useSharedValue([0, 0]);

  const [isOpen, setIsOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [indexToDelete, setIndexToDelete] = useState<number | null>(null);

  const [imgCoordinates, setImgCoordinates] = useState({
    top: windowHeight / 2,
    left: -100,
  });

  const [choosenImageIndex, setChoosenImageIndex] = useState(0);

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    scale.value = withTiming(
      isOpen ? 1 : 0,
      {
        duration: 250,
      },
      (finished) => {
        if (!isOpen && finished) {
          runOnJS(handleCloseModal)();
        }
      }
    );
  }, [isOpen, scale, activeImageIndex]);

  const animatedViewStyle = useAnimatedStyle(() => {
    const width = interpolate(scale.value, [0, 1], [0, windowWidth]);
    const height = interpolate(scale.value, [0, 1], [0, windowHeight]);

    const top = interpolate(scale.value, [0, 1], [imgCoordinates.top, 0]);
    const left = interpolate(scale.value, [0, 1], [imgCoordinates.left, 0]);

    return {
      width,
      height,
      top,
      left,
      transform: [{ translateX: position.value[0] }, { translateY: position.value[1] }],
    };
  });

  const animatedWrapperStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      scale.value,
      [0, 1],
      ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.9)"]
    );
    return {
      backgroundColor,
    };
  });

  const animatedContentStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 0.5], [0, 1]);
    return {
      opacity,
    };
  });

  const handleOpen = (index: number) => {
    setChoosenImageIndex(index);
    setIsOpen(true);
    setIsModalVisible(true);
  };
  const handleClose = () => {
    const index = activeImageIndex;
    setIsOpen(false);
  };

  const handleDelete = () => {
    setIsOpen(false);
    setIndexToDelete(activeImageIndex);
  };

  const deleteImage = () => {
    if (!isModalVisible && typeof indexToDelete === "number") {
      setIndexToDelete(null);
      onDelete?.(indexToDelete);
    }
  };

  const END_POSITION_X = 100;
  const END_POSITION_Y = 120;

  const panGesture = Gesture.Pan()
    .onStart((e) => {
      position.value = [0, 0];
    })
    .onUpdate((e) => {
      position.value = [0, e.translationY * 1.2];
    })
    .onEnd((e) => {
      if (
        e.translationX > END_POSITION_X ||
        e.translationX < -END_POSITION_Y ||
        e.translationY > END_POSITION_Y ||
        e.translationY < -END_POSITION_Y
      ) {
        runOnJS(handleClose)();
        position.value = withTiming([0, 0]);
      } else {
        position.value = withSpring([0, 0]);
      }
    });

  const filteredImages = images.filter((image) => !image.isError);
  const imagesSources = filteredImages.map((image) => image.source) as Source[];

  return (
    <>
      {images.map((image, index) => {
        return (
          <Animated.View key={index} style={{ width: image.width, height: image.height }}>
            <Pressable
              style={{ width: image.width, height: image.height }}
              onPress={() => handleOpen(index)}
              disabled={isModalVisible || !!image.isError}
              onLongPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
            >
              {renderItem(image, index)}
            </Pressable>
          </Animated.View>
        );
      })}

      <Modal
        isVisible={isModalVisible}
        backdropOpacity={0}
        animationIn="fadeIn"
        animationOut="fadeOut"
        onBackButtonPress={handleClose}
        style={{ margin: 0 }}
        animationInTiming={30}
        animationOutTiming={30}
        onModalHide={deleteImage}
      >
        <Animated.View style={[styles.backBtn, animatedContentStyle]}>
          <TouchableOpacity onPress={handleClose}>
            <Feather name="chevron-left" size={40} color="white" />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.deleteBtn, animatedContentStyle]}>
          <TouchableOpacity onPress={() => deleteImageConfirmationAlert(handleDelete, t)}>
            <FontAwesome name="trash-o" size={24} color="white" />
          </TouchableOpacity>
        </Animated.View>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Animated.View style={[styles.modalWrapper, animatedWrapperStyle]}>
            <Animated.View
              style={[styles.imageWrapper, animatedViewStyle, expadedImageWrapperStyle]}
            >
              <GestureDetector gesture={panGesture}>
                <Carousel
                  images={imagesSources.map(({ uri }) => ({ imageUri: uri! }))}
                  onSwipe={(index) => {
                    setActiveImageIndex(index);
                  }}
                  choosenIndex={choosenImageIndex}
                  imageProps={{
                    resizeMode: FastImage.resizeMode.contain,
                  }}
                />
              </GestureDetector>
            </Animated.View>
          </Animated.View>
        </GestureHandlerRootView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalWrapper: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    position: "relative",
  },

  imageWrapper: {
    position: "absolute",
    overflow: "hidden",
  },

  backBtn: {
    position: "absolute",
    paddingLeft: 20,
    paddingTop: 30,
    top: 28,
    left: -15,
    zIndex: 10,
  },

  deleteBtn: {
    position: "absolute",
    paddingRight: 20,
    paddingTop: 30,
    top: 35,
    right: 0,
    zIndex: 10,
  },
});

export default ExpandableGroupImages;
