import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { memo, useState } from "react";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { Tournament } from "@/src/types/tournament";
import Skeleton from "@/src/shared/skeleton/Skeleton";
import FastImage from "@d11/react-native-fast-image";
import CustomText from "@/src/shared/text/CustomText";
import ExpandableImage from "@/src/shared/image/ExpandableImage";
import CreatorContextMenu from "../../tournaments/common/CreatorContextMenu";
import { Entypo } from "@expo/vector-icons";
import ManageUsersContextMenu, {
  ManageUsersContextOptions,
} from "../../tournaments/common/ManageUsersContextMenu";

type Props = {
  data: Tournament["participants"][number];
  type: "participant" | "creator";
  onRemoveParticipant?: () => void;
};

const ParticipantCard = ({ type, data, onRemoveParticipant }: Props) => {
  const theme = useCustomTheme();
  const [isLoadedImg, setIsLoadedImg] = useState(false);

  const handleSelectContext = (option: ManageUsersContextOptions) => {
    if (option === "remove") {
      onRemoveParticipant?.();
    }
  };

  return (
    <View style={[{ backgroundColor: theme.colors.surface }, styles.wrapper]}>
      <View className="flex flex-row items-center justify-between h-full gap-4">
        <View className="flex flex-row items-center gap-4">
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

          <CustomText>{`${data.firstName} ${data.lastName}`}</CustomText>
        </View>

        {type === "creator" && (
          <View>
            <ManageUsersContextMenu onSelect={handleSelectContext}>
              <TouchableOpacity
                style={[styles.footerBtn, { backgroundColor: theme.colors.surfaceLight }]}
                activeOpacity={0.5}
              >
                <Entypo name="dots-three-horizontal" size={18} color={theme.colors.text} />
              </TouchableOpacity>
            </ManageUsersContextMenu>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    height: 70,
  },

  border: {
    borderWidth: 1,
    borderColor: "red",
  },

  footerBtn: {
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
  },
});

export default memo(ParticipantCard);
