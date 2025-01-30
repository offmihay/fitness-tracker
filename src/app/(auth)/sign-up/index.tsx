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

type EmailData = {
  email: string;
};

export default function SignUpEmailScreen() {
  const theme = useCustomTheme();
  const router = useRouter();

  const signUpMutation = useSignUpMutation();

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
    signUpMutation.mutate(data.email, {
      onSuccess: () => {
        router.push(
          {
            pathname: "./password",
            params: { email: watch("email") },
          },
          { relativeToDirectory: true }
        );
      },
      onError: (error: any) => {
        console.log(error);
        const paramMapper = (paramName: string) => {
          if (paramName === "email_address") return "email";
          return "root.clerkError";
        };
        clerkHandleErrors(error, setError, t, paramMapper);
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <CustomKeyboardAvoidingView
        keyboardVerticalOffset={-250}
        style={{ backgroundColor: theme.colors.background }}
      >
        <ButtonBack />
        <DismissKeyboardView>
          <View style={[styles.wrapper]}>
            <View style={[styles.contentWrapper]}>
              <View className="h-[300]">
                <Animated.View layout={LinearTransition} className="mb-12">
                  <CustomText type="subtitle" color={theme.colors.text} center>
                    {t("signup.titleEmail")}
                  </CustomText>
                </Animated.View>

                <RHFormInput
                  name="email"
                  label={t("signup.email")}
                  control={control}
                  inputProps={{
                    useClearButton: true,
                    isError: !!formErrors.email,
                  }}
                  rules={{
                    maxLength: { value: 30, message: t("errors.email_too_long") },
                    pattern: {
                      value: /^\s*[\w-\.]+@([\w-]+\.)+[\w-]{1,4}\s*$/g,
                      message: t("errors.email_invalid"),
                    },
                  }}
                />

                <Animated.View layout={LinearTransition} className="ml-2 w-[200] mt-2">
                  <TouchableOpacity
                    onPress={() =>
                      router.navigate({
                        pathname: "/sign-in",
                      })
                    }
                  >
                    <CustomText color="#0082FF" type="predefault">
                      {t("signup.alreadyHaveAccount")}
                      {/* <Loader style={{ margin: 0, width: 25, height: 15 }} /> */}
                    </CustomText>
                  </TouchableOpacity>
                </Animated.View>
                {formErrors.root && (
                  <Animated.View
                    layout={LinearTransition}
                    className="ml-2 mt-1"
                    entering={FadeIn.duration(300)}
                    exiting={FadeOut.duration(300)}
                  >
                    {Object.values(formErrors.root).map((error, index) => (
                      <CustomText color={theme.colors.error} type="predefault" key={index}>
                        {(error as { message: string }).message}
                      </CustomText>
                    ))}
                  </Animated.View>
                )}
                <Animated.View className="mt-6" layout={LinearTransition}>
                  <ButtonDefault
                    onPress={handleSubmit(onCheckUpEmail)}
                    loading={signUpMutation.isPending}
                    title={t("signup.continue")}
                    disabled={!watch("email") || Object.keys(formErrors).length !== 0}
                  />
                </Animated.View>
              </View>
            </View>
          </View>
        </DismissKeyboardView>
      </CustomKeyboardAvoidingView>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 100,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: "center",
  },
});
