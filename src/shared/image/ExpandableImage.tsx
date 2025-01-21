import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
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
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";

type Props = {
  width: ViewStyle["width"];
  height: ViewStyle["height"];
  imageWrapper?: ViewStyle;
  onDelete?: () => void;
  onlyBaseImageProps?: FastImageProps;
  onlyExpandedImageProps?: FastImageProps;
} & FastImageProps;

const ExpandableImage = (props: Props) => {
  const {
    width,
    height,
    style,
    imageWrapper,
    onDelete,
    onlyBaseImageProps,
    onlyExpandedImageProps,
    ...rest
  } = props;
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const END_POSITION_X = 100;
  const END_POSITION_Y = 150;

  const scale = useSharedValue(0);

  const position = useSharedValue([0, 0]);

  const [isOpen, setIsOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsModalVisible(true);
    } else {
      setTimeout(() => {
        setIsModalVisible(false);
      }, 250);
    }
  }, [isOpen]);

  const [imgDimensions, setImgDimensions] = useState({ width: 0, height: 0, top: 0, left: 0 });

  const viewRef = useRef<View>(null);

  useEffect(() => {
    if (viewRef.current) {
      viewRef.current.measure((x, y, width, height, pageX, pageY) => {
        setImgDimensions({ left: pageX, top: pageY, width, height });
      });
    }
  }, [viewRef.current]);

  useEffect(() => {
    scale.value = withTiming(isOpen ? 1 : 0, {
      duration: 250,
    });
  }, [isOpen, scale]);

  const animatedViewStyle = useAnimatedStyle(() => {
    const width = interpolate(scale.value, [0, 1], [imgDimensions.width, windowWidth]);
    const height = interpolate(scale.value, [0, 1], [imgDimensions.height, windowHeight]);

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
      viewRef.current.measure((x, y, width, height, pageX, pageY) => {
        setImgDimensions({ left: pageX, top: pageY, width, height });
      });
    }
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDelete = () => {
    setIsOpen(false);
    setTimeout(() => {
      onDelete?.();
    }, 300);
  };

  const panGesture = Gesture.Pan()
    .onStart((e) => {
      position.value = [0, 0];
    })
    .onUpdate((e) => {
      position.value = [0, e.translationY];
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
      <Animated.View style={{ opacity: isModalVisible ? 0 : 1, width: width, height: height }}>
        <Pressable
          style={{ width: width, height: height }}
          onPress={handleOpen}
          ref={viewRef}
          disabled={isModalVisible}
        >
          <FastImage
            style={[
              style,
              {
                width: "100%",
                height: "100%",
              },
            ]}
            {...rest}
            {...onlyBaseImageProps}
          />
        </Pressable>
      </Animated.View>

      <Modal transparent={true} animationType="fade" visible={isModalVisible}>
        <Animated.View style={[styles.backBtn, animatedContentStyle]}>
          <TouchableOpacity onPress={handleClose}>
            <FontAwesome6 name="arrow-left-long" size={24} color="white" />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.deleteBtn, animatedContentStyle]}>
          <TouchableOpacity onPress={handleDelete}>
            <FontAwesome name="trash-o" size={24} color="white" />
          </TouchableOpacity>
        </Animated.View>

        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.modalWrapper, animatedWrapperStyle]}>
            <Animated.View style={[styles.imageWrapper, imageWrapper, animatedViewStyle]}>
              <FastImage
                style={[
                  style,
                  {
                    width: "100%",
                    height: "100%",
                  },
                ]}
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
    top: 50,
    left: 0,
    zIndex: 10,
    width: 100,
    height: 80,
  },

  deleteBtn: {
    position: "absolute",
    paddingTop: 30,
    top: 50,
    right: 0,
    zIndex: 10,
    width: 50,
    height: 80,
  },
});

export default ExpandableImage;
