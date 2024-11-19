import { StyleSheet, View, Keyboard, TouchableOpacity, ScrollView } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import UserAvatar from "@/src/components/settings/UserAvatar";
import DatePickerInput from "@/src/components/settings/DatePickerInput";
import { useSetProfileImageMutation, useUpdateUserMutation } from "@/src/mutations/useUserMutation";
import CustomTextInput from "@/src/components/shared/input/CustomTextInput";
import { useNavigation } from "expo-router";
import CustomText from "@/src/components/shared/text/CustomText";
import useFocusWithTimeout from "@/src/hooks/useFocusWithTimeout";
import ChooseCameraModal from "@/src/components/settings/ChooseCameraModal";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { pickCameraImage } from "@/src/utils/pickCameraImage";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import TouchableBtn from "@/src/components/shared/touchable/TouchableBtn";
import { Octicons } from "@expo/vector-icons";
import { pickGalleryImage } from "@/src/utils/pickGalleryImage";

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
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { user } = useUser();
  const [image, setImage] = useState<string | null>(user?.imageUrl || null);
  const [loadingImg, setLoadingImg] = useState(true);
  const { isAnyInputFocused, handleFocus, handleBlur } = useFocusWithTimeout(100);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const theme = useCustomTheme();

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

  const resetValues = () => {
    if (user) {
      reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        birthday: (user.unsafeMetadata?.birthday as string) || "",
      });
    }
  };

  const updateValues = async () => {
    try {
      await handleSubmit(onSubmit)();
    } catch (error) {
      console.error("Form submission error:", error);
      resetValues();
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        isAnyInputFocused || isDirty ? (
          <TouchableOpacity
            onPress={updateValues}
            className="pb-1"
            disabled={Object.keys(formErrors).length !== 0 || !isDirty}
          >
            <CustomText
              weight="bold"
              type="upperdefault"
              color={theme.colors.text}
              style={{ opacity: Object.keys(formErrors).length !== 0 || !isDirty ? 0.5 : 1 }}
            >
              {t("common.done")}
            </CustomText>
          </TouchableOpacity>
        ) : null,
      headerLeft: () =>
        isAnyInputFocused || isDirty ? (
          <TouchableOpacity
            onPress={() => {
              resetValues();
              Keyboard.dismiss();
            }}
            className=""
          >
            <CustomText weight="normal" type="upperdefault" color={theme.colors.text}>
              {t("common.cancel")}
            </CustomText>
          </TouchableOpacity>
        ) : null,
    });
  }, [navigation, isAnyInputFocused, Object.keys(formErrors).length, isDirty]);

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
    resetValues();
  }, [user, reset]);

  const handleOpenCameraModal = () => {
    Keyboard.dismiss();
    bottomSheetRef.current?.present();
  };

  const setProfileImgMutation = useSetProfileImageMutation({
    onError: (err) => {
      setImage(user?.imageUrl || null);
      console.log("Error setting profile image:", JSON.stringify(err));
    },
  });

  const handleGalleryImagePick = useCallback(async () => {
    const result = await pickGalleryImage();
    if (result) {
      setImage(result);
      setProfileImgMutation.mutate(result);
    }
  }, [setProfileImgMutation]);

  const handleCameraImagePick = useCallback(async () => {
    const result = await pickCameraImage();
    if (result) {
      setImage(result);
      setProfileImgMutation.mutate(result);
    }
  }, [setProfileImgMutation]);

  return (
    <KeyboardAwareScrollView
      style={styles.wrapper}
      keyboardShouldPersistTaps="always"
      keyboardOpeningTime={100}
      contentContainerStyle={{ width: "100%", margin: 0 }}
      scrollEnabled={true}
      extraScrollHeight={-125}
      extraHeight={10}
      showsVerticalScrollIndicator={false}
    >
      <View className="mx-auto mt-4">
        <UserAvatar
          image={image}
          loading={loadingImg}
          onPickImage={handleOpenCameraModal}
          isPending={setProfileImgMutation.isPending}
          onLoadStart={() => setLoadingImg(true)}
          onLoad={() => setLoadingImg(false)}
        />
      </View>
      <View className="mt-8">
        <CustomTextInput
          disabled
          disabledText
          value={user?.primaryEmailAddress?.emailAddress}
          label={t("settings.personalInfo.email")}
        />
      </View>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value, onBlur } }) => (
          <CustomTextInput
            onBlur={handleBlur}
            onFocus={handleFocus}
            autoComplete="given-name"
            label={t("settings.personalInfo.firstName")}
            onChangeText={onChange}
            value={value}
            useClearButton
            isError={!!formErrors.firstName}
            returnKeyType="done"
            onSubmitEditing={updateValues}
          />
        )}
        name="firstName"
      />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value, onBlur } }) => (
          <CustomTextInput
            onBlur={handleBlur}
            onFocus={handleFocus}
            autoComplete="family-name"
            label={t("settings.personalInfo.lastName")}
            onChangeText={onChange}
            value={value}
            isError={!!formErrors.lastName}
            useClearButton
            returnKeyType="done"
            onSubmitEditing={updateValues}
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
            selectedDate={value ? new Date(value) : new Date()}
            onConfirm={updateValues}
          />
        )}
        name="birthday"
      />
      <TouchableBtn
        onPress={() => signOut()}
        title={t("settings.personalInfo.signOut")}
        nodeLeft={(color) => <Octicons name="sign-out" size={20} color={color} />}
        type="grey"
        className="mt-6"
      />

      <ChooseCameraModal
        ref={bottomSheetRef}
        onGallery={() => handleGalleryImagePick()}
        onCamera={() => handleCameraImagePick()}
      />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});

export default PersonalInfo;
