import { useState, useCallback } from "react";
import { pickCameraImage } from "@/src/services/pickCameraImage";
import { pickGalleryImage } from "@/src/services/pickGalleryImage";
import { useUploadImage } from "@/src/queries/upload-image";
import FastImage from "@d11/react-native-fast-image";
import { ImagePickerAsset } from "expo-image-picker";

export type UploadedImageAsset = ImagePickerAsset & {
  publicId?: string;
  isError?: boolean;
  uniqueID?: string;
  secure_url?: string;
};

export function useImagePicker() {
  const uploadImage = useUploadImage();

  const [images, setImages] = useState<UploadedImageAsset[]>([]);

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
    const result = await pickGalleryImage({ allowsEditing: true });
    if (!result || result.length === 0) return;
    const [picked] = result;
    handleUploadImage({
      ...picked,
      uniqueID: `${picked.assetId}${Date.now()}`,
    });
  }, [handleUploadImage]);

  const pickFromCamera = useCallback(async () => {
    const result = await pickCameraImage({ aspect: [3, 4] });
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
