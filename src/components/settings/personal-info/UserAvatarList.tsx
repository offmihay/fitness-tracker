import React, { useRef, useState } from "react";
import {
  View,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  ActionSheetIOS,
  Platform,
  Alert,
} from "react-native";
import { Entypo, Feather } from "@expo/vector-icons";
import Loader from "../../../shared/loader/Loader";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import CustomIcon from "../../../shared/icon/CustomIcon";
import { useUser } from "@clerk/clerk-expo";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useSetProfileImageMutation } from "@/src/queries/user";
import { pickGalleryImage } from "@/src/services/pickGalleryImage";
import { pickCameraImage } from "@/src/services/pickCameraImage";
import ChooseCameraModal from "../../../shared/modal/ChooseCameraModal";
import FastImage from "@d11/react-native-fast-image";
import CustomText from "@/src/shared/text/CustomText";
import { useTranslation } from "react-i18next";
import DeleteContextMenu from "@/src/shared/context/DeleteContextMenu";
import ExpandableImage from "@/src/shared/image/ExpandableImage";

const UserAvatarList = () => {
  const theme = useCustomTheme();
  const { user } = useUser();
  const [image, setImage] = useState<string | null>((user?.hasImage && user?.imageUrl) || null);
  const [loadingImg, setLoadingImg] = useState(false);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const { t } = useTranslation();

  const handleOpenCameraModal = () => {
    if (Platform.OS === "ios") {
      openActionSheetIOS();
    } else {
      Keyboard.dismiss();
      bottomSheetRef.current?.present();
    }
  };

  const openActionSheetIOS = () => {
    Keyboard.dismiss();
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [t("common.cancel"), t("common.openGallery"), t("common.openCamera")],
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
        } else if (buttonIndex === 1) {
          handleGalleryImagePick();
        } else if (buttonIndex === 2) {
          handleCameraImagePick();
        }
      }
    );
  };

  const setProfileImgMutation = useSetProfileImageMutation();

  const { isPending } = setProfileImgMutation;

  const saveProfileImage = (uri: string | null) => {
    const prevImage = image;

    setProfileImgMutation.mutate(uri, {
      onError: () => {
        setImage(prevImage);
      },
      onSuccess: (data) => {
        setImage(data.publicUrl);
      },
      onSettled: () => {
        setProfileImgMutation.reset();
        !uri && setImage(null);
      },
    });
  };

  const handleGalleryImagePick = async () => {
    const result = await pickGalleryImage({ base64: true, allowsEditing: true });
    result && saveProfileImage(`data:image/jpeg;base64,${result[0].base64}`);
  };

  const handleCameraImagePick = async () => {
    const result = await pickCameraImage({ base64: true, allowsEditing: true });
    result && saveProfileImage(`data:image/jpeg;base64,${result.base64}`);
  };

  return (
    <>
      <View style={styles.wrapper}>
        <View style={styles.contentWrapper}>
          <DeleteContextMenu onDelete={() => saveProfileImage(null)} isDisabled={!image}>
            <TouchableOpacity onPress={handleOpenCameraModal} activeOpacity={0.7}>
              <View
                style={[styles.avatar, { backgroundColor: theme.colors.surfaceLight }]}
                className="relative"
              >
                {!image && <Entypo name="camera" size={24} color={theme.colors.primary} />}
                {image && (
                  <ExpandableImage
                    key={`image-${image}`}
                    width={50}
                    height={50}
                    source={{ uri: image }}
                    style={{
                      width: "100%",
                      height: "100%",
                      opacity: isPending || loadingImg ? 0.5 : 1,
                    }}
                    imageWrapper={{ borderRadius: 100 }}
                    resizeMode={FastImage.resizeMode.contain}
                    onDelete={() => saveProfileImage(null)}
                    onlyBaseImageProps={{
                      onLoadStart: () => setLoadingImg(true),
                      onLoadEnd: () => setLoadingImg(false),
                      onError: () => setLoadingImg(false),
                    }}
                  />
                )}
                {(isPending || loadingImg) && (
                  <View style={styles.loader}>
                    <Loader style={{ width: 50, height: 50 }} />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </DeleteContextMenu>

          <CustomText type="default">Profile photo</CustomText>
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
