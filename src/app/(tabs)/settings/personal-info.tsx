import { StyleSheet, View, Image, Pressable, TouchableOpacity, Keyboard } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import ClearableTextInput from "@/src/components/shared/input/ClearableTextInput";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import DismissKeyboardView from "@/src/components/shared/input/DissmissKeyboardView";
import * as ImagePicker from "expo-image-picker";
import { useMutation } from "@tanstack/react-query";
import TouchableBtn from "@/src/components/shared/touchable/TouchableBtn";
import UserAvatar from "@/src/components/settings/UserAvatar";
import DatePickerInput from "@/src/components/settings/DatePickerInput";
import { pickImage } from "@/src/utils/imageUtils";
import {
  useSetProfileImageMutation,
  useUpdateUserMutation,
} from "@/src/hooks/mutations/useUserMutation";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";

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
  const { signOut } = useAuth();
  const { t } = useTranslation();
  const { user } = useUser();
  const [image, setImage] = useState<string | null>(user?.imageUrl || null);
  const [loadingImg, setLoadingImg] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      birthday: (user?.unsafeMetadata?.birthday as string) || "",
    },
  });

  const formDataMutation = useUpdateUserMutation({
    onSuccess: (data, variables) => {
      console.log("Profile updated successfully.");
      Keyboard.dismiss();
      reset(variables, { keepIsSubmitted: false, keepIsValid: true });
    },
    onError: (err) => {
      console.log("Error updating profile:", JSON.stringify(err));
    },
  });

  const setProfileImgMutation = useSetProfileImageMutation({
    onError: (err) => {
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

        <View className="flex gap-4 mt-6">
          {/* <CustomTextInput disabled value={user?.primaryEmailAddress?.emailAddress} /> */}
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <ClearableTextInput
                autoComplete="given-name"
                label={t("settings.personalInfo.firstName")}
                onChangeText={onChange}
                value={value}
                useClearButton
              />
            )}
            name="firstName"
          />
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <ClearableTextInput
                autoComplete="family-name"
                label={t("settings.personalInfo.lastName")}
                onChangeText={onChange}
                value={value}
                useClearButton
              />
            )}
            name="lastName"
          />
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <DatePickerInput
                label={t("settings.personalInfo.birthday")}
                value={value}
                onChange={onChange}
              />
            )}
            name="birthday"
          />
        </View>
        <TouchableBtn
          onPress={handleSubmit(onSubmit)}
          className="mt-6"
          loading={formDataMutation.isPending}
          disabled={!isDirty}
          nodeLeft={(color) => <FontAwesome6 name="save" size={24} color={color} />}
          title={t("settings.personalInfo.saveChanges")}
        />
      </View>
    </DismissKeyboardView>
  );
};

const styles = StyleSheet.create({});

export default PersonalInfo;
