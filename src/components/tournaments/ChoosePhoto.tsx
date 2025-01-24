import {
  ActionSheetIOS,
  Keyboard,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import Loader from "../../shared/loader/Loader";
import ChooseCameraModal from "../../shared/modal/ChooseCameraModal";
import { pickCameraImage } from "@/src/services/pickCameraImage";
import { pickGalleryImage } from "@/src/services/pickGalleryImage";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { ImagePickerAsset } from "expo-image-picker";
import { useUploadImage } from "@/src/queries/upload-image";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { useTranslation } from "react-i18next";
import ButtonInput from "../../shared/button/ButtonInput";
import CustomIcon from "../../shared/icon/CustomIcon";
import CustomAnimatedView from "../../shared/view/CustomAnimatedView";
import ErrorAnimatedView from "../../shared/view/ErrorAnimatedView";
import FastImage from "@d11/react-native-fast-image";
import CustomText from "@/src/shared/text/CustomText";
import DeleteContextMenu from "@/src/shared/context/DeleteContextMenu";
import ExpandableImage from "@/src/shared/image/ExpandableImage";
import ExpandableGroupImages from "@/src/shared/image/ExpandableGroupImages";

export type ImageForm = {
  publicId: string;
};

export type UploadedImageAsset = ImagePickerAsset & {
  publicId?: string;
  isError?: boolean;
  uniqueID?: string;
  secure_url?: string;
};

type Props = {
  onImageUploadSuccess: (images: ImageForm[]) => void;
  errorMessage: string;
};

const ChoosePhoto = (props: Props) => {
  const { onImageUploadSuccess, errorMessage } = props;
  const { t } = useTranslation();
  const theme = useCustomTheme();

  const uploadImage = useUploadImage();
  const [images, setImages] = useState<UploadedImageAsset[]>([]);

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const openActionSheetIOS = () => {
    Keyboard.dismiss();
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [t("common.cancel"), t("common.openGallery"), t("common.openCamera")],
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
        } else if (buttonIndex === 1) {
          handleGalleryImagePick();
        } else if (buttonIndex === 2) {
          handleCameraImagePick();
        }
      }
    );
  };

  const handleOpenCameraModal = () => {
    if (Platform.OS === "ios") {
      openActionSheetIOS();
    } else {
      Keyboard.dismiss();
      bottomSheetRef.current?.present();
    }
  };

  const handleGalleryImagePick = async () => {
    const result = await pickGalleryImage({ allowsEditing: true });

    result && handleUploadImage({ ...result[0], uniqueID: `${result[0].assetId}${Date.now()}` });
  };

  const handleCameraImagePick = async () => {
    const result = await pickCameraImage({ aspect: [3, 4] });
    result && handleUploadImage({ ...result, uniqueID: `${result.assetId}${Date.now()}` });
  };

  const handleUploadImage = (imagePickerAsset: UploadedImageAsset) => {
    if (!imagePickerAsset) return;
    const isExisted = images.some((img) => img.uniqueID === imagePickerAsset.uniqueID);

    if (!isExisted) {
      setImages((prev) => [...prev, { ...imagePickerAsset, isError: false }]);
    } else {
      setImages((prev) =>
        prev.map((img) =>
          img.assetId === imagePickerAsset.assetId ? { ...img, isError: false } : img
        )
      );
    }
    uploadImage.mutate(imagePickerAsset, {
      onSuccess: (data) => {
        setImages((prev) =>
          prev.map((img) =>
            img.assetId === imagePickerAsset.assetId
              ? { ...img, publicId: data.public_id, secure_url: data.secure_url }
              : img
          )
        );
        FastImage.preload([{ uri: data.secure_url }]);
      },
      onError: (error) => {
        setImages((prev) =>
          prev.map((img) =>
            img.assetId === imagePickerAsset.assetId ? { ...img, isError: true } : img
          )
        );
      },
    });
  };

  const handleDelete = (image: UploadedImageAsset) => {
    setImages((prev) => prev.filter((img) => img.uniqueID !== image.uniqueID));
  };

  useEffect(() => {
    const readyImages = images
      .filter((img) => img.publicId && !img.isError)
      .map((img) => ({ publicId: img.publicId! }));
    onImageUploadSuccess(readyImages);
  }, [images]);

  return (
    <CustomAnimatedView>
      <View className="flex flex-row flex-wrap gap-3 py-1">
        <View style={{ width: 160 }}>
          <ButtonInput onPress={handleOpenCameraModal} disabled={uploadImage.isPending}>
            <View
              className="flex flex-row gap-2 w-full justify-center"
              style={{ opacity: uploadImage.isPending ? 0.5 : 1 }}
            >
              <CustomIcon
                render={(color, size) => <FontAwesome name="image" size={size} color={color} />}
              />
              <CustomText>Add photo</CustomText>
            </View>
          </ButtonInput>
        </View>

        {images && (
          <ExpandableGroupImages
            key={images.map((img) => img.uniqueID).join(",")}
            images={images.map((img) => ({
              ...img,
              source: { uri: img.secure_url },
              width: 45,
              height: 45,
              isError: img.isError || false,
            }))}
            expadedImageWrapperStyle={{ borderRadius: 5 }}
            onDelete={(index) => handleDelete(images[index])}
            renderItem={(image, index) => {
              const isError = image.isError;
              const isUploading = uploadImage.isPending && !image.publicId && !isError;

              return (
                <DeleteContextMenu
                  onDelete={() => handleDelete(image)}
                  key={index}
                  isDisabled={isUploading}
                >
                  <View
                    style={{
                      borderWidth: 1,
                      borderRadius: 5,
                      borderColor: isError ? theme.colors.error : theme.colors.surface,
                      overflow: "hidden",
                    }}
                  >
                    <FastImage
                      source={{ uri: image?.uri, priority: FastImage.priority.high }}
                      style={{
                        width: "100%",
                        height: "100%",
                        opacity: isUploading || isError ? 0.7 : 1,
                      }}
                      resizeMode={FastImage.resizeMode.contain}
                    />

                    {isUploading && (
                      <View className="absolute left-0 top-0 w-full h-full flex items-center justify-center">
                        <Loader style={{ width: 45, height: 45 }} />
                      </View>
                    )}
                    {isError && (
                      <View className="absolute left-0 top-0 w-full h-full flex items-center justify-center">
                        <TouchableOpacity onPress={() => handleUploadImage(image)}>
                          <FontAwesome6 name="arrow-rotate-right" size={18} color="white" />
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </DeleteContextMenu>
              );
            }}
          />
        )}

        <ChooseCameraModal
          ref={bottomSheetRef}
          onGallery={() => handleGalleryImagePick()}
          onCamera={() => handleCameraImagePick()}
        />
      </View>
      <View className="mt-1">
        <ErrorAnimatedView
          message={
            images
              .filter((img) => img.publicId && !img.isError)
              .map((img) => ({ publicId: img.publicId! })).length === 0
              ? errorMessage
              : ""
          }
        />
      </View>
    </CustomAnimatedView>
  );
};

export default ChoosePhoto;
