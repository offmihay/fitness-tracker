import * as ImagePicker from "expo-image-picker";
import { Alert, Linking } from "react-native";

export const pickCameraImage = async (): Promise<string | null> => {
  const handleLaunchCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      aspect: [3, 4],
      base64: true,
    });
    if (!result.canceled && result.assets && result.assets[0].base64) {
      return `data:image/jpeg;base64,${result.assets[0].base64}`;
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
