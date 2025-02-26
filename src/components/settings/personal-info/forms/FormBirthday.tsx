import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useUser } from "@clerk/clerk-expo";
import { useTranslation } from "react-i18next";
import clerkTransformData from "@/src/utils/clerkTransformData";
import { useUpdateUserMutation } from "@/src/queries/user";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChangeBirthdayForm,
  schemaChangeBirthday,
} from "@/src/components/settings/personal-info/forms/schema";
import RHFormDatePicker from "@/src/shared/form/RHFormDatePicker";
import clerkHandleErrors from "@/src/utils/clerkHandleErrors";
import { useToast } from "@/src/hooks/useToast";

type Props = {
  renderTrigger: (onPress: () => void, value: string) => React.ReactNode;
  onLoadChange?: (isLoading: boolean) => void;
};

const FormBirthday = (props: Props) => {
  const { renderTrigger: triggerNode, onLoadChange } = props;
  const { t } = useTranslation();
  const { user } = useUser();
  const formDataMutation = useUpdateUserMutation();
  const { showSuccessToast } = useToast();

  useEffect(() => {
    onLoadChange?.(formDataMutation.isPending);
  }, [formDataMutation.isPending]);

  const methods = useForm<ChangeBirthdayForm>({
    mode: "onChange",
    resolver: zodResolver(schemaChangeBirthday),
    defaultValues: {
      birthday: !isNaN(new Date(user?.unsafeMetadata.birthday as string).getTime())
        ? new Date(user?.unsafeMetadata.birthday as string)
        : undefined,
    },
  });

  const { control, handleSubmit, setError } = methods;

  const onSubmit = (data: ChangeBirthdayForm) => {
    const formData = clerkTransformData(data, user?.unsafeMetadata || null);
    formDataMutation.mutate(formData, {
      onError: (error: any) => {
        clerkHandleErrors(error, setError);
      },
      onSuccess: () => {
        showSuccessToast("user_information_updated");
      },
    });
  };

  const updateValues = async () => {
    await handleSubmit(onSubmit)();
  };

  return (
    <FormProvider {...methods}>
      <RHFormDatePicker
        name="birthday"
        label={t("user.birthday")}
        onSubmitEditing={updateValues}
        datePickerProps={{
          minimumDate: new Date(new Date().getFullYear() - 100, 0, 1),
          maximumDate: new Date(),
          renderTrigger: ({ onPress, value }) => triggerNode(onPress, value),
          mode: "date",
        }}
        control={control}
      />
    </FormProvider>
  );
};

export default FormBirthday;
