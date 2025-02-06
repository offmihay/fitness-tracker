import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
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
  ImageResource,
} from "../../../shared/controllers/ImagePickerController";
import ExpandableImage from "@/src/shared/image/ExpandableImage";

type Props = {
  errorMessage: string;
  onImageUploadSuccess: (images: ImageResource[]) => void;
  defaultImages?: ImageResource[];
};

const ChooseImageSection = (props: Props) => {
  const theme = useCustomTheme();
  const { errorMessage, onImageUploadSuccess, defaultImages } = props;

  return (
    <ImagePickerController
      onImageUploadSuccess={onImageUploadSuccess}
      defaultImages={defaultImages}
      renderUI={({
        images,
        handleOpenModal,
        uploadImageMutation,
        handleDelete,
        handleUploadImage,
      }) => (
        <CustomAnimatedView>
          <View className="flex flex-row flex-wrap gap-3 py-1">
            <View className="w-full">
              <ButtonInput onPress={handleOpenModal} disabled={uploadImageMutation.isPending}>
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

            {images.length > 0 && (
              <ScrollView horizontal contentContainerStyle={{ gap: 10 }}>
                {images.map((image, index) => {
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
                        <ExpandableImage
                          key={`image-${image}`}
                          width={60}
                          height={60}
                          source={{ uri: image.uri.length !== 0 ? image.uri : image.secure_url }}
                          style={{
                            width: "100%",
                            height: "100%",
                            opacity: isUploading || isError ? 0.7 : 1,
                          }}
                          imageWrapper={{ borderRadius: 5 }}
                          resizeMode={FastImage.resizeMode.contain}
                          onDelete={() => handleDelete(images[index])}
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
                })}
              </ScrollView>
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
