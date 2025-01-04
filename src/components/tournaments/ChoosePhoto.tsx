import { Keyboard, StyleSheet, View } from "react-native";
import React, { useRef, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import Loader from "../shared/loader/Loader";
import ChooseCameraModal from "../shared/modal/ChooseCameraModal";
import TouchableBtn from "../shared/touchable/TouchableBtn";
import { pickCameraImage } from "@/src/utils/pickCameraImage";
import { pickGalleryImage } from "@/src/utils/pickGalleryImage";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { ImagePickerAsset } from "expo-image-picker";
import { useUploadImage } from "@/src/queries/upload-image";
import { Image } from "expo-image";

export type UploadedImageAsset = ImagePickerAsset & {
  publicId?: string;
  isError?: boolean;
};

type Props = {
  onImageUploadSuccess: (images: UploadedImageAsset[]) => void;
};

const ChoosePhoto = (props: Props) => {
  const { onImageUploadSuccess } = props;

  const uploadImage = useUploadImage();

  const [images, setImages] = useState<UploadedImageAsset[]>([]);

  // image which is currently being uploaded
  const [uploadingImage, setUploadingImage] = useState<UploadedImageAsset>();

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handleOpenCameraModal = () => {
    Keyboard.dismiss();
    bottomSheetRef.current?.present();
  };

  const handleGalleryImagePick = async () => {
    const result = await pickGalleryImage({ allowsMultipleSelection: true, selectionLimit: 3 });

    result && handleUploadImages(result);
  };

  const handleCameraImagePick = async () => {
    const result = await pickCameraImage({});
    result && handleUploadImages([result]);
  };

  const handleUploadImages = (imagePickerAssets: ImagePickerAsset[]) => {
    images.push(...imagePickerAssets);
    imagePickerAssets.forEach((imagePickerAsset) => {
      if (imagePickerAsset) {
        const imageToUpload: UploadedImageAsset = { ...imagePickerAsset };
        setUploadingImage(imageToUpload);

        uploadImage.mutate(imagePickerAsset, {
          onSuccess: (data) => {
            imageToUpload.publicId = data.public_id;
            onImageUploadSuccess(images);
          },
          onError: (error) => {
            // todo: handle errors
            imageToUpload.isError = true;
          },
          onSettled: (data) => {
            setUploadingImage(undefined);
            console.log(data);
          },
        });
      }
    });
  };

  return (
    <View className="flex gap-2">
      <TouchableBtn
        title="Choose photo"
        type="grey"
        nodeLeft={(color) => <FontAwesome name="image" size={24} color={color} />}
        style={{ width: 180 }}
        onPress={handleOpenCameraModal}
      />

      {images && (
        <View className="flex flex-row gap-2 flex-wrap">
          {images.map((image, index) => {
            const isUploading =
              uploadImage.isPending &&
              !image.publicId &&
              image.publicId === uploadingImage?.publicId;

            return (
              <View className="relative" key={index}>
                <Image
                  source={{ uri: image?.uri }}
                  style={{
                    width: 45,
                    height: 45,
                    borderRadius: 5,
                    opacity: isUploading ? 0.7 : 1,
                  }}
                />
                {isUploading && (
                  <View className="absolute left-0 top-0 w-full h-full flex items-center justify-center">
                    <Loader style={{ width: 45, height: 45 }} />
                  </View>
                )}
              </View>
            );
          })}
        </View>
      )}

      <ChooseCameraModal
        ref={bottomSheetRef}
        onGallery={() => handleGalleryImagePick()}
        onCamera={() => handleCameraImagePick()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});

export default ChoosePhoto;
