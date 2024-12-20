import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import TouchableBtn from "@/src/components/shared/touchable/TouchableBtn";
import { router } from "expo-router";
import { pickGalleryImage } from "@/src/utils/pickGalleryImage";
import { ImagePickerAsset } from "expo-image-picker";
import { Image } from "expo-image";
import { useMutation } from "@tanstack/react-query";
import FormData from "form-data";
import CustomText from "@/src/components/shared/text/CustomText";

type Props = {};

const Workouts = ({}: Props) => {
  const [image, setImage] = useState<ImagePickerAsset | null>(null);
  const [uploadedImage, setUploadedImage] = useState<any>();

  const uploadImageMutation = useMutation({
    mutationFn: async (images: ImagePickerAsset[]) => {
      const formData = new FormData();

      images.forEach((img) => {
        formData.append("file", {
          uri: img.uri,
          name: img.fileName,
          type: img.type,
        });
      });

      const resp = await fetch(
        "https://fitness-tracker-backend-production-1f9c.up.railway.app/files",
        {
          method: "POST",
          body: formData as any,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return await resp.json();
    },
    onSuccess: (data) => {
      setUploadedImage(data);
    },
  });

  const handleSelectImage = async () => {
    const result = await pickGalleryImage();
    result && setImage(result);
  };

  const handleUploadImage = () => {
    image && uploadImageMutation.mutate(image);
  };

  const handleCreateTournament = () => {
    router.push({
      pathname: "/tournaments/create",
    });
  };

  return (
    <View style={styles.wrapper} className="gap-4">
      <TouchableBtn title="Create tournament" onPress={handleCreateTournament} />

      <TouchableBtn title="Select image" onPress={handleSelectImage} />

      {image && (
        <>
          <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />
          <TouchableBtn
            title="Upload image"
            onPress={handleUploadImage}
            loading={uploadImageMutation.isPending}
          />
        </>
      )}

      {uploadedImage && (
        <>
          <CustomText>Uploaded image:</CustomText>
          <Image source={{ uri: uploadedImage.secure_url }} style={{ width: 200, height: 200 }} />
        </>
      )}
    </View>
  );
};

export default Workouts;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});
