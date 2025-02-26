import * as ImagePicker from "expo-image-picker";
import { ImagePickerOptions } from "expo-image-picker";
import { Linking } from "react-native";
import { cameraPermissionAlert } from "../shared/alerts/alerts";
import { TFunction } from "i18next";

export const pickCameraImage = async ({
  options,
  t,
}: {
  options?: ImagePickerOptions;
  t: TFunction<"translation">;
}) => {
  const handleLaunchCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: "images",
      quality: 1,
      ...options,
    });
    if (!result.canceled && result.assets?.[0]) {
      return { ...result.assets[0], assetId: result.assets[0].uri };
    }

    return null;
  };

  const handleCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status === ImagePicker.PermissionStatus.GRANTED) {
      return await handleLaunchCamera();
    } else if (status === ImagePicker.PermissionStatus.DENIED) {
      cameraPermissionAlert(Linking.openSettings, t);
    }

    return null;
  };

  return await handleCameraPermission();
};
