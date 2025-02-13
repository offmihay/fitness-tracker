import { StyleSheet, View } from "react-native";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useUser } from "@clerk/clerk-expo";
import { useTranslation } from "react-i18next";
import clerkTransformData from "@/src/utils/clerkTransformData";
import { useUpdateUserMutation } from "@/src/queries/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import clerkHandleErrors from "@/src/utils/clerkHandleErrors";
import RHFormInput from "@/src/shared/form/RHFormInput";
import Toast from "react-native-toast-message";
import StickyFooterView from "@/src/shared/view/StickyFooterView";
import ButtonDefault from "@/src/shared/button/ButtonDefault";
import {
  OrganizerFormData,
  schemaOrganizer,
} from "@/src/components/tournaments/create/organizer/schema";
import LayoutStatic from "@/src/components/navigation/layouts/LayoutStatic";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

const OrganizerForm = () => {
  const { t } = useTranslation();
  const { user } = useUser();
  const formDataMutation = useUpdateUserMutation();
  const router = useRouter();

  const methods = useForm<OrganizerFormData>({
    mode: "onChange",
    resolver: zodResolver(schemaOrganizer),
    defaultValues: {
      organizerName:
        typeof user?.unsafeMetadata.organizerName === "string"
          ? user?.unsafeMetadata.organizerName
          : "",
      organizerDetails:
        typeof user?.unsafeMetadata.organizerDetails === "string"
          ? user?.unsafeMetadata.organizerDetails
          : "",
      organizerEmail:
        typeof user?.unsafeMetadata.organizerEmail === "string"
          ? user?.unsafeMetadata.organizerEmail
          : "",
      organizerPhone:
        typeof user?.unsafeMetadata.organizerPhone === "string"
          ? user?.unsafeMetadata.organizerPhone
          : "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors: formErrors, isDirty },
    setError,
  } = methods;

  const onSubmit = (data: OrganizerFormData) => {
    const formData = clerkTransformData(data, user?.unsafeMetadata || null);
    formDataMutation.mutate(formData, {
      onSuccess: () => {
        Toast.show({
          type: "successToast",
          props: { text: "Successfully updated profile information" },
        });
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
      <LayoutStatic name="organizerInfo" isDefaultCompressed={true}>
        <FormProvider {...methods}>
          <View style={styles.wrapper}>
            <KeyboardAwareScrollView
              keyboardShouldPersistTaps="always"
              contentContainerStyle={{ paddingVertical: 20 }}
            >
              <View style={{ paddingHorizontal: 20, display: "flex", gap: 6 }}>
                <RHFormInput
                  name="organizerName"
                  label={t("user.organizerName")}
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
                  name="organizerEmail"
                  label={t("user.organizerEmail")}
                  control={control}
                  rules={{
                    required: true,
                  }}
                  inputProps={{
                    useClearButton: true,
                    returnKeyType: "done",
                  }}
                />
                <RHFormInput
                  name="organizerPhone"
                  label={t("user.organizerPhone")}
                  control={control}
                  rules={{
                    required: true,
                  }}
                  inputProps={{
                    useClearButton: true,
                    returnKeyType: "done",
                  }}
                />
                <RHFormInput
                  name="organizerDetails"
                  label={t("user.organizerDetails")}
                  control={control}
                  rules={{
                    required: true,
                  }}
                  inputProps={{
                    style: { height: 70 },
                    styleWrapper: { height: 80 },
                    multiline: true,
                    textAlignVertical: "top",
                    returnKeyType: "default",
                    useClearButton: false,
                  }}
                />
              </View>
            </KeyboardAwareScrollView>
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
    paddingBottom: 0,
    flex: 1,
  },

  buttonWrapper: {
    paddingTop: 10,
    paddingBottom: 120,
    paddingHorizontal: 20,
  },
});

export default OrganizerForm;
