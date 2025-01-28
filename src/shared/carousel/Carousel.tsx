import { StyleSheet, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import PagerView from "react-native-pager-view";
import { TournamentRequest } from "../../types/tournament";
import Skeleton from "../skeleton/Skeleton";
import FastImage, { FastImageProps } from "@d11/react-native-fast-image";
import CustomArrow from "../button/arrow/CustomArrow";

type Props = {
  images: { imageUri: string }[];
  imageProps?: FastImageProps;
  useArrows?: boolean;
  onSwipe?: (index: number) => void;
  choosenIndex?: number;
};

const Carousel = (props: Props) => {
  const { images, useArrows, onSwipe, choosenIndex: indexActive, imageProps } = props;

  const ref = useRef<PagerView>(null);
  const [currIndex, setCurrIndex] = useState(0);

  useEffect(() => {
    if (typeof indexActive === "number") {
      ref.current?.setPage(indexActive);
    }
  }, [indexActive]);

  const [imagesWithStatus, setImagesWithStatus] =
    useState<{ imageUri: string; isLoaded?: boolean }[]>(images);

  const handleSetImageStatus = ({
    image,
    key,
    isLoaded,
  }: {
    image: { imageUri: string };
    key: number;
    isLoaded: boolean;
  }) => {
    const updatedImage = { ...image, isLoaded };
    setImagesWithStatus((prev) => {
      const newImages = [...prev];
      newImages[key] = updatedImage;
      return newImages;
    });
  };

  useEffect(() => {
    setCurrIndex(indexActive || 0);
  }, []);

  const handleSwipe = (index: number) => {
    setCurrIndex(index);
    onSwipe?.(index);
  };

  const handleImageScroll = (dir: "left" | "right") => {
    switch (dir) {
      case "left": {
        setCurrIndex((prev) => {
          if (prev > 0) {
            ref.current?.setPage(prev - 1);
            onSwipe?.(prev - 1);
            return prev - 1;
          } else {
            return prev;
          }
        });
        break;
      }
      case "right": {
        setCurrIndex((prev) => {
          if (prev < imagesWithStatus.length - 1) {
            ref.current?.setPage(prev + 1);
            onSwipe?.(prev + 1);
            return prev + 1;
          } else {
            return prev;
          }
        });
        break;
      }
    }
  };

  return (
    <>
      <PagerView
        style={{ width: "100%", height: "100%" }}
        initialPage={currIndex}
        ref={ref}
        scrollEnabled={true}
        onPageSelected={(e) => handleSwipe(e.nativeEvent.position)}
      >
        {imagesWithStatus.map((img, index) => {
          return (
            <View key={index}>
              {/* <Skeleton visible={imagesWithStatus[index].isLoaded} /> */}
              <FastImage
                source={{ uri: img.imageUri }}
                style={{ width: "100%", height: "100%" }}
                onLoadStart={() =>
                  handleSetImageStatus({ image: img, key: index, isLoaded: false })
                }
                onLoadEnd={() => handleSetImageStatus({ image: img, key: index, isLoaded: true })}
                {...imageProps}
              />
            </View>
          );
        })}
      </PagerView>
      {useArrows && (
        <>
          <CustomArrow
            dir="left"
            onPress={() => handleImageScroll("left")}
            isDisabled={currIndex === 0}
          />
          <CustomArrow
            dir="right"
            onPress={() => handleImageScroll("right")}
            isDisabled={currIndex === imagesWithStatus.length - 1}
          />
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({});

export default Carousel;
