import { StyleSheet, View } from "react-native";
import React, { memo, useState } from "react";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { Tournament } from "@/src/types/types";
import Skeleton from "@/src/shared/skeleton/Skeleton";
import FastImage from "@d11/react-native-fast-image";
import CustomText from "@/src/shared/text/CustomText";
import ExpandableImage from "@/src/shared/image/ExpandableImage";

type Props = {
  data: Tournament["participants"][number];
};

const ParticipantCard = ({ data }: Props) => {
  const theme = useCustomTheme();
  const [isLoadedImg, setIsLoadedImg] = useState(false);

  return (
    <View style={[{ backgroundColor: theme.colors.surface }, styles.wrapper]}>
      <View className="flex flex-row items-center h-full gap-4">
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 100,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Skeleton height={50} visible={isLoadedImg} />
          <ExpandableImage
            source={{
              uri: data.imageUrl,
              priority: FastImage.priority.normal,
            }}
            style={{
              width: "100%",
              height: "100%",
            }}
            imageWrapper={{ borderRadius: 100 }}
            resizeMode={FastImage.resizeMode.contain}
            disableDelete
            onlyBaseImageProps={{
              onLoadStart: () => setIsLoadedImg(false),
              onLoadEnd: () => setIsLoadedImg(true),
              onError: () => setIsLoadedImg(true),
            }}
          />
        </View>
        <View>
          <CustomText>{`${data.firstName} ${data.lastName}`}</CustomText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },

  border: {
    borderWidth: 1,
    borderColor: "red",
  },
});

export default memo(ParticipantCard);
