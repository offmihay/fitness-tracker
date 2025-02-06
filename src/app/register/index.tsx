import { Keyboard, StyleSheet, View } from "react-native";
import React from "react";
import { registerTournament } from "@/src/queries/tournaments";
import LayoutStatic from "@/src/components/navigation/layouts/LayoutStatic";
import ButtonDefault from "@/src/shared/button/ButtonDefault";
import { router, useLocalSearchParams } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useUser } from "@clerk/clerk-expo";
import { useUpdateUserMutation } from "@/src/queries/user";
import { ChangeUserFormData } from "@/src/components/settings/personal-info/forms/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRegistrationFormData, schemaUserRegistration } from "@/src/components/register/schema";
import RHFormInput from "@/src/shared/form/RHFormInput";
import clerkTransformData from "@/src/utils/clerkTransformData";
import clerkHandleErrors from "@/src/utils/clerkHandleErrors";
import CustomAnimatedView from "@/src/shared/view/CustomAnimatedView";
import CustomText from "@/src/shared/text/CustomText";

type Props = {};

const RegistrationFormScreen = (props: Props) => {
  const {} = props;
  const { id } = useLocalSearchParams();

  const { t } = useTranslation();
  const { user } = useUser();
  const formDataMutation = useUpdateUserMutation();

  const methods = useForm<UserRegistrationFormData>({
    mode: "onChange",
    resolver: zodResolver(schemaUserRegistration),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      phoneNumber:
        typeof user?.unsafeMetadata.phoneNumber === "string"
          ? user?.unsafeMetadata.phoneNumber
          : "+380",
    },
  });

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors: formErrors, isDirty },
  } = methods;

  const onSubmit = (data: UserRegistrationFormData) => {
    const formData = clerkTransformData(data);
    formDataMutation.mutate(formData, {
      onSuccess: () => {
        Keyboard.dismiss();
        navigateToNext();
      },
      onError: (error: any) => {
        clerkHandleErrors(error, setError, t);
      },
    });
  };

  const handlePress = async () => {
    if (isDirty) {
      await handleSubmit(onSubmit)();
    } else {
      navigateToNext();
    }
  };

  const navigateToNext = () => {
    router.navigate(
      {
        pathname: "./confirm",
        params: { id },
      },
      {
        relativeToDirectory: true,
      }
    );
  };

  return (
    <LayoutStatic
      name="registration"
      isDefaultCompressed
      headerConfig={{ maxHeight: 70, minHeight: 70 }}
    >
      <FormProvider {...methods}>
        <View style={styles.wrapper}>
          <CustomText type="subtitle" className="mb-6">
            Type your personal information to contact with you
          </CustomText>
          <RHFormInput
            name="firstName"
            label={t("settings.personalInfo.firstName")}
            control={control}
            rules={{
              required: { message: "required" },
            }}
            inputProps={{
              useClearButton: true,
              returnKeyType: "done",
            }}
          />
          <RHFormInput
            name="lastName"
            label={t("settings.personalInfo.lastName")}
            control={control}
            rules={{
              required: { message: "required" },
            }}
            inputProps={{
              useClearButton: true,
              returnKeyType: "done",
            }}
          />
          <RHFormInput
            name="phoneNumber"
            label={t("settings.personalInfo.phoneNumber")}
            control={control}
            rules={{
              required: { message: "required" },
            }}
            inputProps={{
              useClearButton: true,
              returnKeyType: "done",
            }}
          />
          <CustomAnimatedView>
            <ButtonDefault
              className="mt-6"
              title="Confirm"
              disabled={Object.keys(formErrors).length > 0}
              onPress={handlePress}
              loading={formDataMutation.isPending}
            />
          </CustomAnimatedView>
        </View>
      </FormProvider>
    </LayoutStatic>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    display: "flex",
    gap: 4,
  },
});

export default RegistrationFormScreen;
