import { ActionSheetIOS, Keyboard, Platform } from "react-native";
import React, { useRef, useEffect } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import ChooseCameraModal from "../modal/ChooseCameraModal";
import { UploadedImageAsset, useImagePicker } from "@/src/hooks/useImagePicker";
import { UseMutationResult } from "@tanstack/react-query";
import { ImageUploadResponse } from "@/src/queries/upload-image";
import { ImagePickerAsset } from "expo-image-picker";
import { t } from "i18next";

export type ImageForm = {
  publicId: string;
};

export type ImageResource = {
  publicId: string;
  secure_url?: string;
};

const emptyUpdoadedImage: UploadedImageAsset = {
  uri: "",
  width: 200,
  height: 200,
  isError: false,
};

type triggerProps = {
  uploadImageMutation: UseMutationResult<ImageUploadResponse, Error, ImagePickerAsset, unknown>;
  handleOpenModal: () => void;
  images: UploadedImageAsset[];
  handleDelete: (image: UploadedImageAsset) => void;
  handleUploadImage: (image: ImagePickerAsset) => void;
};

type Props = {
  renderUI: (props: triggerProps) => React.ReactNode;
  onImageUploadSuccess: (images: ImageForm[]) => void;
  defaultImages?: ImageResource[];
};

const ImagePickerController = (props: Props) => {
  const { renderUI, onImageUploadSuccess, defaultImages } = props;
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const {
    images,
    pickFromGallery,
    pickFromCamera,
    removeImage,
    handleUploadImage,
    uploadImageMutation,
  } = useImagePicker(
    defaultImages?.map((img, index) => ({
      publicId: img.publicId,
      secure_url: img.secure_url,
      ...emptyUpdoadedImage,
      uniqueID: `${img.publicId}_${index}_${Date.now()}`,
    }))
  );

  const openActionSheetIOS = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [t("common.cancel"), t("common.openGallery"), t("common.openCamera")],
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 1) {
          pickFromGallery();
        } else if (buttonIndex === 2) {
          pickFromCamera();
        }
      }
    );
  };

  const handleOpenModal = () => {
    Keyboard.dismiss();
    if (Platform.OS === "ios") {
      openActionSheetIOS();
    } else {
      bottomSheetRef.current?.present();
    }
  };

  useEffect(() => {
    const readyImages = images
      .filter((img) => img.publicId && !img.isError)
      .map((img) => ({ publicId: img.publicId! }));
    onImageUploadSuccess(readyImages);
  }, [images]);

  return (
    <>
      {renderUI({
        images,
        uploadImageMutation,
        handleOpenModal,
        handleDelete: removeImage,
        handleUploadImage,
      })}

      <ChooseCameraModal
        ref={bottomSheetRef}
        onGallery={() => pickFromGallery()}
        onCamera={() => pickFromCamera()}
      />
    </>
  );
};

export default ImagePickerController;
