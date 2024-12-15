import * as ImagePicker from "expo-image-picker";
import { ImagePickerOptions } from "expo-image-picker";
import { Alert, Linking } from "react-native";

export const pickGalleryImage = async (options?: ImagePickerOptions) => {
  const handleLaunchGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      selectionLimit: 1,
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
      ...options,
    });

    if (!result.canceled && result.assets?.[0]) {
      return result.assets[0];
    }

    return null;
  };

  const handleGalleryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === ImagePicker.PermissionStatus.GRANTED) {
      return await handleLaunchGallery();
    } else if (status === ImagePicker.PermissionStatus.DENIED) {
      createAlert();
    }

    return null;
  };

  const createAlert = () =>
    Alert.alert(
      "App doesn't have permission to your gallery. Go to settings and change Gallery permissions.",
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

  return await handleGalleryPermission();
};
