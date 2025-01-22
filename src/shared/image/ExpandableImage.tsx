import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import {
  Alert,
  Dimensions,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import FastImage, { FastImageProps } from "@d11/react-native-fast-image";
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

type Props = {
  width: number;
  height: number;
  imageWrapper?: ViewStyle;
  onDelete?: () => void;
  onlyBaseImageProps?: FastImageProps;
  onlyExpandedImageProps?: FastImageProps;
} & FastImageProps;

const ExpandableImage = (props: Props) => {
  const {
    width: imgWidth,
    height: imgHeight,
    style,
    imageWrapper,
    onDelete,
    onlyBaseImageProps,
    onlyExpandedImageProps,
    ...rest
  } = props;

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const scale = useSharedValue(0);
  const position = useSharedValue([0, 0]);

  const [isOpen, setIsOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [shouldDelete, setShouldDelete] = useState(false);

  const [imgDimensions, setImgDimensions] = useState({ top: 0, left: 0 });

  const viewRef = useRef<View>(null);

  useLayoutEffect(() => {
    if (viewRef.current) {
      viewRef.current.measure((x, y, w, h, pageX, pageY) => {
        setImgDimensions({ left: pageX, top: pageY });
      });
    }
  }, [viewRef.current]);

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
  }, [isOpen, scale]);

  const animatedViewStyle = useAnimatedStyle(() => {
    const width = interpolate(scale.value, [0, 1], [imgWidth, windowWidth]);
    const height = interpolate(scale.value, [0, 1], [imgHeight, windowHeight]);

    const top = interpolate(scale.value, [0, 1], [imgDimensions.top, 0]);
    const left = interpolate(scale.value, [0, 1], [imgDimensions.left, 0]);

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

  const handleOpen = () => {
    if (viewRef.current) {
      viewRef.current.measure((x, y, w, h, pageX, pageY) => {
        setImgDimensions({ left: pageX, top: pageY });
      });
    }
    setIsOpen(true);
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDelete = () => {
    setIsOpen(false);
    setShouldDelete(true);
  };

  const deleteImage = () => {
    if (!isModalVisible && shouldDelete) {
      setShouldDelete(false);
      onDelete?.();
    }
  };

  const END_POSITION_X = 100;
  const END_POSITION_Y = 100;

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

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Animated.View
        style={{ opacity: isModalVisible ? 0 : 1, width: imgWidth, height: imgHeight }}
      >
        <Pressable
          style={{ width: imgWidth, height: imgHeight }}
          onPress={handleOpen}
          ref={viewRef}
          disabled={isModalVisible}
          onLongPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
        >
          <FastImage
            style={[style, { width: "100%", height: "100%" }]}
            {...rest}
            {...onlyBaseImageProps}
          />
        </Pressable>
      </Animated.View>

      <Modal
        isVisible={isModalVisible}
        backdropOpacity={0}
        animationIn="fadeIn"
        animationOut="fadeOut"
        onBackdropPress={handleClose}
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
          <TouchableOpacity onPress={() => deleteConfirmationAlert(handleDelete)}>
            <FontAwesome name="trash-o" size={24} color="white" />
          </TouchableOpacity>
        </Animated.View>

        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.modalWrapper, animatedWrapperStyle]}>
            <Animated.View style={[styles.imageWrapper, imageWrapper, animatedViewStyle]}>
              <FastImage
                style={[style, { width: "100%", height: "100%" }]}
                {...rest}
                {...onlyExpandedImageProps}
              />
            </Animated.View>
          </Animated.View>
        </GestureDetector>
      </Modal>
    </GestureHandlerRootView>
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

export default ExpandableImage;

const deleteConfirmationAlert = (onPress: () => void) => {
  Alert.alert("Are you sure you want to delete this image?", "", [
    {
      text: "Delete",
      onPress: onPress,
      style: "destructive",
    },
    {
      text: "Cancel",
      style: "cancel",
    },
  ]);
};
