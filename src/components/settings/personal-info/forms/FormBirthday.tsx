import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useUser } from "@clerk/clerk-expo";
import { useTranslation } from "react-i18next";
import clerkTransformData from "@/src/utils/clerkTransformData";
import { useUpdateUserMutation } from "@/src/queries/user";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChangeBirthdayFormData,
  schemaChangeBirthday,
} from "@/src/components/settings/personal-info/forms/schema";
import RHFormDatePicker from "@/src/shared/form/RHFormDatePicker";
import clerkHandleErrors from "@/src/utils/clerkHandleErrors";
import Toast from "react-native-toast-message";

type Props = {
  renderTrigger: (onPress: () => void, value: string) => React.ReactNode;
};

const FormBirthday = (props: Props) => {
  const { renderTrigger: triggerNode } = props;
  const { t } = useTranslation();
  const { user } = useUser();
  const formDataMutation = useUpdateUserMutation();

  const methods = useForm<ChangeBirthdayFormData>({
    mode: "onChange",
    resolver: zodResolver(schemaChangeBirthday),
    defaultValues: {
      birthday: !isNaN(new Date(user?.unsafeMetadata.birthday as string).getTime())
        ? new Date(user?.unsafeMetadata.birthday as string)
        : undefined,
    },
  });

  const { control, handleSubmit, setError } = methods;

  const onSubmit = (data: ChangeBirthdayFormData) => {
    const formData = clerkTransformData(data, user?.unsafeMetadata || null);
    formDataMutation.mutate(formData, {
      onSuccess: () => {
        Toast.show({
          type: "successToast",
          props: { text: "Successfully updated profile information" },
        });
      },
      onError: (error: any) => {
        clerkHandleErrors(error, setError, t);
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
    <FormProvider {...methods}>
      <RHFormDatePicker
        name="birthday"
        label={t("settings.personalInfo.birthday")}
        onSubmitEditing={updateValues}
        datePickerProps={{
          minimumDate: new Date(new Date().getFullYear() - 100, 0, 1),
          maximumDate: new Date(),
          renderTrigger: ({ onPress, value }) => triggerNode(onPress, value),
        }}
        control={control}
      />
    </FormProvider>
  );
};

export default FormBirthday;
