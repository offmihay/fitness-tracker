import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { t } from "i18next";
import ButtonBack from "@/src/shared/button/ButtonBack";
import { useSignUpMutation } from "../../../queries/signup";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { FormProvider, useForm } from "react-hook-form";
import Animated, { FadeIn, FadeOut, LinearTransition } from "react-native-reanimated";
import CustomKeyboardAvoidingView from "@/src/shared/view/CustomKeyboardAvoidingView";
import DismissKeyboardView from "@/src/shared/view/DismissKeyboardView";
import clerkHandleErrors from "@/src/utils/clerkHandleErrors";
import ButtonDefault from "@/src/shared/button/ButtonDefault";
import RHFormInput from "@/src/shared/form/RHFormInput";
import CustomText from "@/src/shared/text/CustomText";
import { usePrepareForRecover } from "@/src/queries/recover";

type EmailData = {
  email: string;
};

export default function RecoverPasswordFirstScreen() {
  const theme = useCustomTheme();
  const router = useRouter();

  const recoverPasswordMutation = usePrepareForRecover();

  const methods = useForm<EmailData>({
    defaultValues: { email: "" },
    mode: "onSubmit",
  });

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors: formErrors, isDirty },
    clearErrors,
    setError,
  } = methods;

  useEffect(() => {
    clearErrors();
  }, [watch("email")]);

  const onCheckUpEmail = (data: EmailData) => {
    recoverPasswordMutation.mutate(data.email, {
      onSuccess: () => {
        router.push(
          {
            pathname: "./code",
            params: { email: watch("email") },
          },
          { relativeToDirectory: true }
        );
      },
      onError: (error: any) => {
        const paramMapper = (paramName: string) => {
          if (paramName === "email_address") return "email";
          return "root.clerkError";
        };
        clerkHandleErrors(error, setError, paramMapper);
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <ButtonBack style={{ top: 20 }} />
      <DismissKeyboardView>
        <View style={[styles.wrapper]}>
          <View style={[styles.contentWrapper]}>
            <View className="h-[300]">
              <Animated.View layout={LinearTransition} className="mb-12">
                <CustomText type="subtitle" color={theme.colors.text} center>
                  {t("recoverPassword.title")}
                </CustomText>
              </Animated.View>

              <RHFormInput
                name="email"
                label={t("signup.email")}
                control={control}
                inputProps={{
                  useClearButton: true,
                  isError: !!formErrors.email,
                  autoCapitalize: "none",
                  keyboardType: "email-address",
                }}
                rules={{
                  maxLength: { value: 30, message: "email_too_long" },
                  pattern: {
                    value: /^\s*[\w-\.]+@([\w-]+\.)+[\w-]{1,4}\s*$/g,
                    message: "email_invalid",
                  },
                }}
              />
              {formErrors.root && (
                <Animated.View
                  layout={LinearTransition}
                  className="ml-2 mt-1"
                  entering={FadeIn.duration(300)}
                  exiting={FadeOut.duration(300)}
                >
                  {Object.values(formErrors.root).map((error, index) => (
                    <CustomText color={theme.colors.error} type="predefault" key={index}>
                      {t(`errors.${(error as { message: string }).message}`)}
                    </CustomText>
                  ))}
                </Animated.View>
              )}
              <Animated.View className="mt-6" layout={LinearTransition}>
                <ButtonDefault
                  onPress={handleSubmit(onCheckUpEmail)}
                  loading={recoverPasswordMutation.isPending}
                  title={t("signup.continue")}
                  disabled={!watch("email") || Object.keys(formErrors).length !== 0}
                />
              </Animated.View>
            </View>
          </View>
        </View>
      </DismissKeyboardView>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 200,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: "center",
  },
});
