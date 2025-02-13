import { useState, useCallback } from "react";
import { pickCameraImage } from "@/src/services/pickCameraImage";
import { pickGalleryImage } from "@/src/services/pickGalleryImage";
import { useUploadImage } from "@/src/queries/upload-image";
import FastImage from "@d11/react-native-fast-image";
import { ImagePickerAsset } from "expo-image-picker";
import { Platform } from "react-native";
import { t } from "i18next";

export type UploadedImageAsset = {
  fileName?: string | null;
  mimeType?: string;
  assetId?: string | null;
  uri: string;
  publicId?: string;
  isError?: boolean;
  uniqueID?: string;
  secure_url?: string;
  width: number;
  height: number;
};

export function useImagePicker(defaultImages?: UploadedImageAsset[]) {
  const uploadImage = useUploadImage();
  const [images, setImages] = useState<UploadedImageAsset[]>(defaultImages || []);

  const handleUploadImage = useCallback(
    (img: UploadedImageAsset) => {
      if (!img) return;
      const isExisted = images.some((image) => image.uniqueID === img.uniqueID);

      if (!isExisted) {
        setImages((prev) => [...prev, { ...img, isError: false }]);
      } else {
        setImages((prev) =>
          prev.map((image) =>
            image.assetId === img.assetId ? { ...image, isError: false } : image
          )
        );
      }

      uploadImage.mutate(img, {
        onSuccess: (data) => {
          setImages((prev) =>
            prev.map((image) =>
              image.assetId === img.assetId
                ? {
                    ...image,
                    publicId: data.public_id,
                    secure_url: data.secure_url,
                  }
                : image
            )
          );
          FastImage.preload([{ uri: data.secure_url }]);
        },
        onError: () => {
          setImages((prev) =>
            prev.map((image) =>
              image.assetId === img.assetId ? { ...image, isError: true } : image
            )
          );
        },
      });
    },
    [images, uploadImage]
  );

  const pickFromGallery = useCallback(async () => {
    const result = await pickGalleryImage({
      options: {
        aspect: [4, 3],
        allowsEditing: Platform.OS === "android" ? true : false,
      },
      t,
    });
    if (!result || result.length === 0) return;
    const [picked] = result;
    handleUploadImage({
      ...picked,
      uniqueID: `${picked.assetId}${Date.now()}`,
    });
  }, [handleUploadImage]);

  const pickFromCamera = useCallback(async () => {
    const result = await pickCameraImage({
      options: {
        aspect: [4, 3],
        allowsEditing: Platform.OS === "android" ? true : false,
      },
      t,
    });
    if (!result) return;
    handleUploadImage({
      ...result,
      uniqueID: `${result.assetId}${Date.now()}`,
    });
  }, [handleUploadImage]);

  const removeImage = useCallback((image: UploadedImageAsset) => {
    setImages((prev) => prev.filter((img) => img.uniqueID !== image.uniqueID));
  }, []);

  return {
    images,
    setImages,
    pickFromGallery,
    pickFromCamera,
    removeImage,
    handleUploadImage,
    uploadImageMutation: uploadImage,
  };
}
