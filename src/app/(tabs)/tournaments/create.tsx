import { Keyboard, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Controller, Form, FormProvider, useForm } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomTextInput from "@/src/components/shared/input/CustomTextInput";
import { useTranslation } from "react-i18next";
import { ImageResult, Tournament } from "@/src/types/Tournament";
import { useTournamentMutation } from "@/src/queries/tournaments";

import RHFormInput from "@/src/components/shared/form/RHFormInput";
import TouchableBtn from "@/src/components/shared/touchable/TouchableBtn";
import RHFormDatePicker from "@/src/components/shared/form/RHFormDatePicker";
import DropdownCheckbox, { DropdownItem } from "@/src/components/shared/dropdown/DropdownCheckbox";
import CustomPicker from "@/src/components/shared/picker/CustomPicker";
import CustomPickerItem from "@/src/components/shared/picker/CustomPickerItem";
import DropdownModal from "@/src/components/shared/modal/DropdownModal";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import RHFormDropdownInput from "@/src/components/shared/form/RHFormDropdownInput";
import CustomText from "@/src/components/shared/text/CustomText";
import { FontAwesome } from "@expo/vector-icons";
import ChooseCameraModal from "@/src/components/shared/modal/ChooseCameraModal";
import { pickCameraImage } from "@/src/utils/pickCameraImage";
import { pickGalleryImage } from "@/src/utils/pickGalleryImage";
import { ImagePickerAsset } from "expo-image-picker";
import { usePendingUploads, useUploadImage } from "@/src/queries/upload-image";
import { Image } from "expo-image";
import Loader from "@/src/components/shared/loader/Loader";

type Props = {};

const CreateTournament = ({}: Props) => {
  const { t } = useTranslation();
  const createTournamentMutation = useTournamentMutation();
  const { data: pendingUploads = {} } = usePendingUploads();

  const uploadImage = useUploadImage();
  const [images, setImages] = useState<ImagePickerAsset[] | []>([]);

  const methods = useForm<Tournament>({
    defaultValues: {},
    mode: "onChange",
  });

  const {
    control,
    handleSubmit,
    watch,
    setFocus,
    setValue,
    formState: { errors: formErrors },
  } = methods;

  const handleFormSubmit = (data: Tournament) => {
    createTournamentMutation.mutate(data, {
      onSuccess: (data) => {
        console.log("Tournament created:", data);
      },
      onError: (error) => {
        console.error("Failed to create tournament:", error);
      },
    });
  };

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const handleOpenCameraModal = () => {
    Keyboard.dismiss();
    bottomSheetRef.current?.present();
  };

  const handleGalleryImagePick = async () => {
    const result = await pickGalleryImage({ allowsMultipleSelection: true, selectionLimit: 3 });
    result && handleUploadImage(result);
  };

  const handleCameraImagePick = async () => {
    const result = await pickCameraImage({});
    result && handleUploadImage([result]);
  };

  const handleUploadImage = (images: ImagePickerAsset[]) => {
    if (images) {
      setImages(images);
      images.forEach((image) => {
        uploadImage.mutate(
          { image, asset_id: image.assetId || "" },
          {
            onSuccess: (data) => {
              setValue("images", [data.result]); // change because onSuccess return only last uploaded image
            },
            onError: (error) => {
              console.error("Failed to upload image:", error);
            },
          }
        );
      });
    }
  };

  const isUploading = (asset_id: string) => !!pendingUploads[asset_id];

  return (
    <FormProvider {...methods}>
      <KeyboardAwareScrollView
        scrollEnabled={true}
        extraScrollHeight={-70}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
      >
        <View style={styles.wrapper}>
          <View className="flex flex-col gap-4">
            <RHFormInput
              name="title"
              label={"title"}
              control={control}
              onSubmitEditing={() => setFocus("description")}
            />
            <View className="flex flex-row gap-3 items-center">
              <TouchableBtn
                title="Choose photo"
                type="grey"
                nodeLeft={(color) => <FontAwesome name="image" size={24} color={color} />}
                style={{ width: 180 }}
                onPress={handleOpenCameraModal}
              />

              <View className="flex flex-row gap-2">
                {images &&
                  images.map((image, index) => (
                    <View className="relative" key={index}>
                      <Image
                        source={{ uri: image?.uri }}
                        style={{
                          width: 45,
                          height: 45,
                          borderRadius: 5,
                          opacity: isUploading(image.assetId!) ? 0.7 : 1,
                        }}
                      />
                      {isUploading(image.assetId!) && (
                        <View className="absolute left-0 top-0 w-full h-full flex items-center justify-center">
                          <Loader style={{ width: 45, height: 45 }} />
                        </View>
                      )}
                    </View>
                  ))}
              </View>

              <ChooseCameraModal
                ref={bottomSheetRef}
                onGallery={() => handleGalleryImagePick()}
                onCamera={() => handleCameraImagePick()}
              />
            </View>

            <RHFormInput
              name="description"
              label={"description"}
              inputProps={{
                style: {
                  height: 100,
                },
                styleWrapper: {
                  height: 110,
                },
                multiline: true,
                returnKeyType: "default",
              }}
              control={control}
            />
            <RHFormDatePicker
              name="dateStart"
              label={"Start date"}
              datePickerProps={{
                minimumDate: new Date(),
                maximumDate: new Date(new Date().getFullYear() + 5, 0, 1),
              }}
              control={control}
            />
            <RHFormDatePicker
              name="dateEnd"
              label={"End date"}
              datePickerProps={{
                minimumDate: watch("dateStart") ? new Date(watch("dateStart")) : undefined,
              }}
              control={control}
            />
            <View className="flex flex-row">
              <View className="w-1/2 pr-1">
                <RHFormDropdownInput
                  control={control}
                  name="skillLevel"
                  label="SkillLevel"
                  dropdownProps={{
                    selectedValue: watch("skillLevel"),
                    onValueChange: (itemValue) => setValue("skillLevel", itemValue),
                    items: [
                      { label: "Amateur", value: "Amateur" },
                      { label: "Beginner", value: "Beginner" },
                      { label: "Professional", value: "Professional" },
                    ],
                    selectAnLabel: "Select skillLevel ...",
                  }}
                />
              </View>
              <View className="w-1/2 pl-1">
                <RHFormDropdownInput
                  control={control}
                  name="format"
                  label="Format"
                  dropdownProps={{
                    selectedValue: watch("format"),
                    onValueChange: (itemValue) => setValue("format", itemValue),
                    items: [
                      { label: "Singles", value: "Singles" },
                      { label: "Doubles", value: "Doubles" },
                      { label: "Squad", value: "Squad" },
                    ],
                    selectAnLabel: "Select format...",
                  }}
                />
              </View>
            </View>
            <RHFormInput
              name="city"
              label={"city"}
              control={control}
              onSubmitEditing={() => setFocus("location")}
            />
            <RHFormInput
              name="location"
              label={"location"}
              control={control}
              onSubmitEditing={() => setFocus("entryFee")}
            />
            <RHFormInput
              name="entryFee"
              label={"entryFee"}
              inputProps={{ keyboardType: "numbers-and-punctuation" }}
              control={control}
              onSubmitEditing={() => setFocus("prizePool")}
            />
            <RHFormInput
              name="prizePool"
              label={"prizePool"}
              inputProps={{
                keyboardType: "numbers-and-punctuation",
              }}
              control={control}
              onSubmitEditing={() => setFocus("ageRestrictions.minAge")}
            />

            <View className="flex flex-row">
              <View className="w-1/2 pr-1">
                <RHFormInput
                  name="ageRestrictions.minAge"
                  label={"minAge"}
                  inputProps={{ keyboardType: "numbers-and-punctuation" }}
                  control={control}
                  onSubmitEditing={() => setFocus("ageRestrictions.maxAge")}
                />
              </View>
              <View className="w-1/2 pl-1">
                <RHFormInput
                  name="ageRestrictions.maxAge"
                  label={"maxAge"}
                  inputProps={{
                    keyboardType: "numbers-and-punctuation",
                  }}
                  control={control}
                  onSubmitEditing={() => void 0}
                />
              </View>
            </View>
          </View>

          <TouchableBtn title="Create" className="mt-4" onPress={handleSubmit(handleFormSubmit)} />
        </View>
      </KeyboardAwareScrollView>
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});

export default CreateTournament;
