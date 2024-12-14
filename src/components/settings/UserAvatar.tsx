import React from "react";
import { View, Image, Pressable, TouchableOpacity, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import CustomText from "../shared/text/CustomText";
import Loader from "../shared/loader/Loader";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";

type UserAvatarProps = {
  image: string | null;
  loading: boolean;
  onPickImage: () => void;
  isPending: boolean;
  onLoadStart: () => void;
  onLoad: () => void;
};

const UserAvatar: React.FC<UserAvatarProps> = ({
  image,
  loading,
  onPickImage,
  onLoadStart,
  onLoad,
  isPending,
}) => {
  const theme = useCustomTheme();

  return (
    <Pressable className="flex items-center w-[170]" onPress={onPickImage}>
      <View
        style={[styles.avatar, { backgroundColor: theme.colors.surfaceLight }]}
        className="relative"
      >
        {!image && <Entypo name="camera" size={35} color={theme.colors.primary} />}
        {image && (
          <Image
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              opacity: isPending || loading ? 0.5 : 1,
            }}
            source={{ uri: image }}
            onLoadStart={onLoadStart}
            onLoad={onLoad}
          />
        )}
        {(isPending || loading) && (
          <View className="absolute left-0 top-0 w-full h-full flex items-center justify-center">
            <Loader style={{ width: 70, height: 70 }} />
          </View>
        )}
      </View>
      <TouchableOpacity onPress={onPickImage} className="mt-2">
        <CustomText color={theme.colors.primary} type="default">
          Change avatar
        </CustomText>
      </TouchableOpacity>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
});

export default UserAvatar;
