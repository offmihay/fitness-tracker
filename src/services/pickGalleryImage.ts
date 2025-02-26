import * as ImagePicker from "expo-image-picker";
import { ImagePickerOptions } from "expo-image-picker";
import { TFunction } from "i18next";
import { Linking } from "react-native";
import { galleryPermissionAlert } from "../shared/alerts/alerts";

export const pickGalleryImage = async ({
  options,
  t,
}: {
  options?: ImagePickerOptions;
  t: TFunction<"translation">;
}) => {
  const handleLaunchGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      quality: 1,
      ...options,
    });

    if (!result.canceled && result.assets) {
      return result.assets;
    }

    return null;
  };

  const handleGalleryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === ImagePicker.PermissionStatus.GRANTED) {
      return await handleLaunchGallery();
    } else if (status === ImagePicker.PermissionStatus.DENIED) {
      galleryPermissionAlert(Linking.openSettings, t);
    }

    return null;
  };

  return await handleGalleryPermission();
};
