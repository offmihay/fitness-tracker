import React, { useRef, useState } from "react";
import { View, Image, Pressable, TouchableOpacity, StyleSheet, Keyboard } from "react-native";
import { Entypo, Feather } from "@expo/vector-icons";
import CustomText from "../../shared/text/CustomText";
import Loader from "../../shared/loader/Loader";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import CustomIcon from "../../shared/icon/CustomIcon";
import { Divider } from "react-native-paper";
import { useUser } from "@clerk/clerk-expo";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useSetProfileImageMutation } from "@/src/queries/user";
import { pickGalleryImage } from "@/src/services/pickGalleryImage";
import { pickCameraImage } from "@/src/services/pickCameraImage";
import ChooseCameraModal from "../../shared/modal/ChooseCameraModal";

const UserAvatarList = () => {
  const theme = useCustomTheme();
  const { user } = useUser();
  const [image, setImage] = useState<string | null>(user?.imageUrl || null);
  const [loadingImg, setLoadingImg] = useState(true);
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handleOpenCameraModal = () => {
    Keyboard.dismiss();
    bottomSheetRef.current?.present();
  };

  const setProfileImgMutation = useSetProfileImageMutation();

  const { isPending } = setProfileImgMutation;

  const saveProfileImage = (uri: string | null) => {
    if (uri) {
      setImage(uri);
      setProfileImgMutation.mutate(uri, {
        onError: (err) => {
          setImage(user?.imageUrl || null);
          console.log("Error setting profile image:", JSON.stringify(err));
        },
      });
    }
  };

  const handleGalleryImagePick = async () => {
    const result = await pickGalleryImage({ base64: true });
    result && saveProfileImage(`data:image/jpeg;base64,${result[0].base64}`);
  };

  const handleCameraImagePick = async () => {
    const result = await pickCameraImage({ base64: true });
    result && saveProfileImage(`data:image/jpeg;base64,${result.base64}`);
  };

  return (
    <>
      <View style={styles.wrapper}>
        <View style={styles.contentWrapper}>
          <Pressable onPress={void 0}>
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
                    opacity: isPending || loadingImg ? 0.5 : 1,
                  }}
                  source={{ uri: image }}
                  onLoadStart={() => setLoadingImg(true)}
                  onLoad={() => setLoadingImg(false)}
                />
              )}
              {(isPending || loadingImg) && (
                <View style={styles.loader}>
                  <Loader style={{ width: 70, height: 70 }} />
                </View>
              )}
            </View>
          </Pressable>
          <TouchableOpacity onPress={handleOpenCameraModal}>
            <CustomText type="default">Profile photo</CustomText>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleOpenCameraModal}>
          <View style={styles.btnWrapper}>
            <CustomIcon render={(color) => <Feather name="edit" size={24} color={color} />} />
          </View>
        </TouchableOpacity>
      </View>
      <ChooseCameraModal
        ref={bottomSheetRef}
        onGallery={() => handleGalleryImagePick()}
        onCamera={() => handleCameraImagePick()}
      />
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  loader: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  contentWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    display: "flex",
    flexDirection: "row",
    gap: 24,
    alignItems: "center",
  },

  btnWrapper: {
    paddingRight: 20,
    width: 70,
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
  },
});

export default UserAvatarList;
