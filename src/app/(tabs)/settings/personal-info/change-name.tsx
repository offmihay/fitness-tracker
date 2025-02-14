import { StyleSheet, View } from "react-native";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useUser } from "@clerk/clerk-expo";
import { useTranslation } from "react-i18next";
import StickyFooterView from "@/src/shared/view/StickyFooterView";
import clerkTransformData from "@/src/utils/clerkTransformData";
import { useUpdateUserMutation } from "@/src/queries/user";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChangeUserFormData,
  schemaChangeName,
} from "@/src/components/settings/personal-info/forms/schema";
import { useRouter } from "expo-router";
import clerkHandleErrors from "@/src/utils/clerkHandleErrors";
import LayoutStatic from "@/src/components/navigation/layouts/LayoutStatic";
import DismissKeyboardView from "@/src/shared/view/DismissKeyboardView";
import ButtonDefault from "@/src/shared/button/ButtonDefault";
import RHFormInput from "@/src/shared/form/RHFormInput";
import Toast from "react-native-toast-message";

const ChangeNameScreen = () => {
  const { t } = useTranslation();
  const { user } = useUser();
  const formDataMutation = useUpdateUserMutation();
  const router = useRouter();

  const methods = useForm<ChangeUserFormData>({
    mode: "onChange",
    resolver: zodResolver(schemaChangeName),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors: formErrors, isDirty },
    setError,
  } = methods;

  const onSubmit = (data: ChangeUserFormData) => {
    const formData = clerkTransformData(data, user?.unsafeMetadata || null);
    formDataMutation.mutate(formData, {
      onSuccess: () => {
        router.back();
      },
      onError: (error: any) => {
        clerkHandleErrors(error, setError);
      },
    });
  };

  const updateValues = async () => {
    try {
      await handleSubmit(onSubmit)();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <>
      <LayoutStatic name="changeName">
        <FormProvider {...methods}>
          <View style={styles.wrapper}>
            <RHFormInput
              name="firstName"
              label={t("user.firstName")}
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
              label={t("user.lastName")}
              control={control}
              rules={{
                required: true,
              }}
              inputProps={{
                useClearButton: true,
                returnKeyType: "done",
              }}
            />
          </View>
        </FormProvider>
      </LayoutStatic>
      <StickyFooterView offset={{ closed: 0, opened: 100 }}>
        <View style={styles.buttonWrapper}>
          <ButtonDefault
            title={t("common.applyChanges")}
            disabled={!isDirty || Object.keys(formErrors).length > 0}
            onPress={updateValues}
            loading={formDataMutation.isPending}
            statusAnimation={{
              enabled: true,
              useOnlySuccess: true,
              isSuccess: formDataMutation.isSuccess,
              timeOut: 3000,
            }}
          />
        </View>
      </StickyFooterView>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  buttonWrapper: {
    paddingTop: 10,
    paddingBottom: 120,
    paddingHorizontal: 20,
  },
});

export default ChangeNameScreen;
