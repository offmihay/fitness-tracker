import { StyleSheet, View, Keyboard } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import TouchableBtn from "@/src/components/shared/touchable/TouchableBtn";
import UserAvatar from "@/src/components/settings/UserAvatar";
import DatePickerInput from "@/src/components/settings/DatePickerInput";
import { pickImage } from "@/src/utils/imageUtils";
import {
  useSetProfileImageMutation,
  useUpdateUserMutation,
} from "@/src/hooks/mutations/useUserMutation";
import { FontAwesome6 } from "@expo/vector-icons";
import CustomTextInput from "@/src/components/shared/input/CustomTextInput";
import * as ImagePicker from "expo-image-picker";
import DismissKeyboardView from "@/src/components/shared/view/DismissKeyboardView";

type PersonalInfoProps = {};

type FormData = {
  firstName?: string;
  lastName?: string;
  primaryEmailAddressId?: string;
  primaryPhoneNumberId?: string;
  primaryWeb3WalletId?: string;
  username?: string;
  unsafeMetadata?: Record<string, any>;
};

const PersonalInfo = ({}: PersonalInfoProps) => {
  const { t } = useTranslation();
  const { user } = useUser();
  const [image, setImage] = useState<string | null>(user?.imageUrl || null);
  const [loadingImg, setLoadingImg] = useState(true);

  const {
    watch,
    control,
    handleSubmit,
    formState: { errors: formErrors, isDirty },
    reset,
    setError,
  } = useForm({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      birthday: (user?.unsafeMetadata?.birthday as string) || "",
    },
    mode: "onChange",
  });

  const formDataMutation = useUpdateUserMutation({
    onSuccess: (_, variables) => {
      Keyboard.dismiss();
      reset(variables, { keepIsSubmitted: false, keepIsValid: true });
    },
    onError: (error: any) => {
      if (error.clerkError) {
        error.errors.forEach((err: any) => {
          const errParam = "root.clerkError";
          setError(errParam, {
            type: err.code,
            message: t(`errors.${err.code}`),
          });
        });
      } else {
        setError("root.serverError", {
          type: "server_error",
          message: t(`errors.server_error`),
        });
      }
    },
  });

  const setProfileImgMutation = useSetProfileImageMutation({
    onError: (err) => {
      setImage(user?.imageUrl || null);
      console.log("Error setting profile image:", JSON.stringify(err));
    },
  });

  const handleImagePick = useCallback(async () => {
    const result = await pickImage();
    if (result) {
      setImage(result);
      setProfileImgMutation.mutate(result);
    }
  }, [setProfileImgMutation]);

  const handleCameraPress = async () => {
    // const permission = await ImagePicker.getCameraPermissionsAsync();
    // if (permission.status !== ImagePicker.PermissionStatus.GRANTED) {
    //   const requestPermission = await ImagePicker.requestCameraPermissionsAsync();
    //   if (requestPermission.status !== ImagePicker.PermissionStatus.GRANTED) {
    //     return null;
    //   }
    // }
    const requestPermission = await ImagePicker.requestCameraPermissionsAsync();
    if (requestPermission.status === ImagePicker.PermissionStatus.GRANTED) {
      return null;
    }

    const result = await ImagePicker.launchCameraAsync({
      selectionLimit: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      cameraType: ImagePicker.CameraType.front,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!result.canceled && result.assets && result.assets[0].base64) {
      return `data:image/jpeg;base64,${result.assets[0].base64}`;
    }

    return null;
  };

  const onSubmit = (data: FormData) => {
    const permittedKeys = [
      "firstName",
      "lastName",
      "primaryEmailAddressId",
      "primaryPhoneNumberId",
      "primaryWeb3WalletId",
      "unsafeMetadata",
      "username",
    ];
    const permittedData = Object.fromEntries(
      Object.entries(data).filter(
        ([key, value]) => permittedKeys.includes(key) && value !== undefined
      )
    );

    const unpermittedData = Object.fromEntries(
      Object.entries(data).filter(([key]) => !permittedKeys.includes(key))
    );

    const formData = { ...permittedData, unsafeMetadata: unpermittedData };
    formDataMutation.mutate(formData);
  };

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        birthday: (user.unsafeMetadata?.birthday as string) || "",
      });
    }
  }, [user, reset]);

  return (
    <DismissKeyboardView className="h-full">
      <View className="m-4 h-full">
        <View className="mx-auto">
          <UserAvatar
            image={image}
            loading={loadingImg}
            onPickImage={handleImagePick}
            isPending={setProfileImgMutation.isPending}
            onLoadStart={() => setLoadingImg(true)}
            onLoad={() => setLoadingImg(false)}
          />
        </View>

        {/* <CustomTextInput disabled value={user?.primaryEmailAddress?.emailAddress} /> */}
        <Controller
          control={control}
          rules={
            {
              // required: "First name is required",
            }
          }
          render={({ field: { onChange, value, onBlur } }) => (
            <CustomTextInput
              onBlur={onBlur}
              autoComplete="given-name"
              label={t("settings.personalInfo.firstName")}
              onChangeText={onChange}
              value={value}
              useClearButton
              isError={!!formErrors.firstName}
              returnKeyType="done"
            />
          )}
          name="firstName"
        />
        <Controller
          control={control}
          rules={{
            // required: "Last name is required",
            maxLength: 15,
          }}
          render={({ field: { onChange, value, onBlur } }) => (
            <CustomTextInput
              onBlur={onBlur}
              autoComplete="family-name"
              label={t("settings.personalInfo.lastName")}
              onChangeText={onChange}
              value={value}
              isError={!!formErrors.lastName}
              useClearButton
              returnKeyType="done"
            />
          )}
          name="lastName"
        />
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <DatePickerInput
              label={t("settings.personalInfo.birthday")}
              value={value}
              onChange={onChange}
            />
          )}
          name="birthday"
        />
        <TouchableBtn
          onPress={handleSubmit(onSubmit)}
          className="mt-6"
          loading={formDataMutation.isPending}
          disabled={!isDirty}
          nodeLeft={(color) => <FontAwesome6 name="save" size={24} color={color} />}
          title={t("settings.personalInfo.saveChanges")}
          checkAnimation={{
            enabled: true,
            isSuccess: formDataMutation.isSuccess,
            isError: formDataMutation.isError,
            timeOut: 2000,
          }}
        />
      </View>
    </DismissKeyboardView>
  );
};

const styles = StyleSheet.create({});

export default PersonalInfo;
