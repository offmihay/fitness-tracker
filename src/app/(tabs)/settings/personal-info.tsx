import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  SafeAreaView,
  Button,
  Pressable,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState } from "react";
import CustomText from "../../../components/shared/text/CustomText";
import { useUser } from "@clerk/clerk-expo";
import ClearableTextInput from "@/src/components/shared/input/ClearableTextInput";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import DismissKeyboardView from "@/src/components/shared/input/DissmissKeyboardView";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useMutation } from "@tanstack/react-query";
import Loader from "@/src/components/shared/loader/Loader";
import DateTimePickerModal from "react-native-modal-datetime-picker";

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
  const theme = useCustomTheme();
  const { user } = useUser();
  const [loading, setLoading] = useState(true);

  const [image, setImage] = useState<string | null>(user?.imageUrl || null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: user?.firstName || "",
      birthday: (user?.unsafeMetadata?.birthday as string) || "",
    },
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled && result.assets && result.assets[0].base64) {
      const imgBase64 = `data:image/jpeg;base64,${result.assets[0].base64}`;
      setImage(imgBase64);
      setProfileImgMutation.mutate(imgBase64);
    }
  };

  const setProfileImgMutation = useMutation({
    mutationFn: (imgUrl: string): Promise<void> => {
      if (!user) return Promise.resolve();
      return user.setProfileImage({ file: imgUrl }).then(() => undefined);
    },
    onError: (err) => {
      console.log("Error setting profile image:", JSON.stringify(err));
    },
  });

  const formDataMutation = useMutation({
    mutationFn: (data: FormData): Promise<void> => {
      if (!user) return Promise.resolve();
      return user.update(data).then(() => undefined);
    },
    onSuccess: () => {
      console.log("Profile updated successfully.");
    },
    onError: (err) => {
      console.log("Error updating profile:", JSON.stringify(err));
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

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (date: Date, onChange: (date: Date) => void) => {
    onChange(date);
    hideDatePicker();
    handleSubmit(onSubmit)();
  };

  return (
    <DismissKeyboardView>
      <View className="m-4">
        <View className="flex items-center mt-4">
          <Pressable className="flex items-center" onPress={pickImage}>
            <View
              style={[styles.avatar, { backgroundColor: theme.colors.surfaceLight }]}
              className="relative"
            >
              {!image && <Entypo name="camera" size={35} color={theme.colors.primary} />}
              {image && (
                <Image
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                    opacity: setProfileImgMutation.isPending || loading ? 0.5 : 1,
                  }}
                  source={{ uri: image }}
                  onLoadStart={() => setLoading(true)}
                  onLoad={() => setLoading(false)}
                />
              )}
              {(setProfileImgMutation.isPending || loading) && (
                <View className="absolute left-0 top-0 w-full h-full flex items-center justify-center">
                  <Loader style={{ width: 70, height: 70 }} />
                </View>
              )}
            </View>
            <TouchableOpacity onPress={pickImage} className="mt-2">
              <CustomText style={{ color: theme.colors.primary }}>Change avatar</CustomText>
            </TouchableOpacity>
          </Pressable>
        </View>

        <View className="my-6">
          <CustomText>Email: {user?.primaryEmailAddress?.emailAddress}</CustomText>
        </View>

        <View className="flex gap-2">
          <CustomText style={{ textAlign: "center", marginBottom: 10 }}>
            Your personal information:
          </CustomText>

          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <ClearableTextInput
                autoComplete="given-name"
                placeholder={t("settings.personal-info.name")}
                onChangeText={onChange}
                value={value}
                useClearButton
                onEndEditing={handleSubmit(onSubmit)}
              />
            )}
            name="firstName"
          />
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <View>
                <ClearableTextInput
                  placeholder={t("settings.personal-info.birthday")}
                  disabled
                  onPressIn={showDatePicker}
                  value={value ? new Date(value).toLocaleDateString() : ""}
                  useClearButton
                />
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={(date) => handleConfirm(date, onChange)}
                  onCancel={hideDatePicker}
                />
              </View>
            )}
            name="birthday"
          />
        </View>
      </View>
    </DismissKeyboardView>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
});

export default PersonalInfo;
