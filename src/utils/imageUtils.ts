import * as ImagePicker from "expo-image-picker";

export const pickImage = async (): Promise<string | null> => {
  let result = await ImagePicker.launchImageLibraryAsync({
    selectionLimit: 1,
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 4],
    quality: 1,
    base64: true,
  });

  if (!result.canceled && result.assets && result.assets[0].base64) {
    return `data:image/jpeg;base64,${result.assets[0].base64}`;
  }

  return null;
};
