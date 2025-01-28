import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import CustomAnimatedView from "@/src/shared/view/CustomAnimatedView";
import ButtonInput from "@/src/shared/button/ButtonInput";
import CustomIcon from "@/src/shared/icon/CustomIcon";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import CustomText from "@/src/shared/text/CustomText";
import ExpandableGroupImages from "@/src/shared/image/ExpandableGroupImages";
import DeleteContextMenu from "@/src/shared/context/DeleteContextMenu";
import FastImage from "@d11/react-native-fast-image";
import Loader from "@/src/shared/loader/Loader";
import ErrorAnimatedView from "@/src/shared/view/ErrorAnimatedView";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import ImagePickerController, {
  ImageForm,
} from "../../../shared/controllers/ImagePickerController";

type Props = {
  errorMessage: string;
  onImageUploadSuccess: (images: ImageForm[]) => void;
};

const ChooseImageSection = (props: Props) => {
  const theme = useCustomTheme();
  const { errorMessage, onImageUploadSuccess } = props;

  return (
    <ImagePickerController
      onImageUploadSuccess={onImageUploadSuccess}
      renderUI={({
        uploadImageMutation,
        handleOpenCameraModal,
        images,
        handleDelete,
        handleUploadImage,
      }) => (
        <CustomAnimatedView>
          <View className="flex flex-row flex-wrap gap-3 py-1">
            <View className="w-full">
              <ButtonInput onPress={handleOpenCameraModal} disabled={uploadImageMutation.isPending}>
                <View
                  className="flex flex-row gap-2 w-full justify-center"
                  style={{ opacity: uploadImageMutation.isPending ? 0.5 : 1 }}
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
                  const isUploading = uploadImageMutation.isPending && !image.publicId && !isError;

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
      )}
    />
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});

export default ChooseImageSection;
