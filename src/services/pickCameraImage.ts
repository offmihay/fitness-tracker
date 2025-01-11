import * as ImagePicker from "expo-image-picker";
import { ImagePickerOptions } from "expo-image-picker";
import { Alert, Linking } from "react-native";

export const pickCameraImage = async (options?: ImagePickerOptions) => {
  const handleLaunchCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: "images",
      allowsEditing: true,
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
      createAlert();
    }

    return null;
  };

  const createAlert = () =>
    Alert.alert(
      "App doesn't have permission to your camera. Go to settings and change Camera permissions.",
      "",
      [
        {
          text: "Settings",
          onPress: Linking.openSettings,
          style: "default",
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );

  return await handleCameraPermission();
};
