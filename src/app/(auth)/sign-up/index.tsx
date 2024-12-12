import { View, StyleSheet, TouchableOpacity, Keyboard, StatusBar } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { t } from "i18next";

import CustomText from "../../../components/shared/text/CustomText";

import TouchableBtn from "@/src/components/shared/touchable/TouchableBtn";
import TouchableBack from "@/src/components/shared/touchable/TouchableBack";
import { useSignUpMutation } from "../../../queries/signup";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import CustomTextInput from "@/src/components/shared/input/CustomTextInput";
import { Controller, useForm } from "react-hook-form";
import Animated, { FadeIn, FadeOut, LinearTransition } from "react-native-reanimated";
import CustomKeyboardAvoidingView from "@/src/components/shared/view/CustomKeyboardAvoidingView";
import DismissKeyboardView from "@/src/components/shared/view/DismissKeyboardView";

type EmailData = {
  email: string;
};

export default function SignUpEmailScreen() {
  const theme = useCustomTheme();
  const router = useRouter();

  const signUpMutation = useSignUpMutation();

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors: formErrors, isDirty },
    setError,
    clearErrors,
    reset,
  } = useForm<EmailData>({
    defaultValues: {
      email: "",
    },
    mode: "onSubmit",
  });

  useEffect(() => {
    clearErrors();
  }, [watch("email")]);

  const onCheckUpEmail = (data: EmailData) => {
    signUpMutation.mutate(data.email, {
      onSuccess: () => {
        router.navigate({
          pathname: "/sign-up/password",
          params: { email: watch("email") },
        });
      },
      onError: (error: any) => {
        if (error.clerkError) {
          error.errors.forEach((err: any) => {
            const param = err.meta.paramName;
            const errParam = param === "email_address" ? "email" : "root.clerkError";
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
  };

  return (
    <CustomKeyboardAvoidingView
      keyboardVerticalOffset={-250}
      style={{ backgroundColor: theme.colors.background }}
    >
      <TouchableBack />
      <DismissKeyboardView>
        <View style={[styles.wrapper]}>
          <View style={[styles.contentWrapper]}>
            <View className="h-[300]">
              <Animated.View layout={LinearTransition} className="mb-12">
                <CustomText type="subtitle" color={theme.colors.text} center>
                  {t("signup.titleEmail")}
                </CustomText>
              </Animated.View>
              <Animated.View layout={LinearTransition}>
                <Controller
                  control={control}
                  rules={{
                    maxLength: { value: 30, message: t("errors.email_too_long") },
                    pattern: {
                      value: /^\s*[\w-\.]+@([\w-]+\.)+[\w-]{1,4}\s*$/g,
                      message: t("errors.email_invalid"),
                    },
                  }}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <CustomTextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      label={t("signup.email")}
                      keyboardType="email-address"
                      useClearButton
                      isError={!!formErrors.email}
                    />
                  )}
                  name="email"
                />
              </Animated.View>

              <Animated.View
                layout={LinearTransition}
                className="ml-2 mb-1"
                entering={FadeIn.duration(300)}
                exiting={FadeOut.duration(300)}
              >
                {formErrors.email?.message && (
                  <CustomText color={theme.colors.error} type="predefault">
                    {formErrors.email?.message}
                  </CustomText>
                )}
              </Animated.View>

              <Animated.View layout={LinearTransition} className="ml-2 w-[200] mt-2">
                <TouchableOpacity
                  onPress={() =>
                    router.navigate({
                      pathname: "/sign-in-modal",
                    })
                  }
                >
                  <CustomText color="#0082FF" type="predefault">
                    {t("signup.alreadyHaveAccount")}
                    {/* <Loader style={{ margin: 0, width: 25, height: 15 }} /> */}
                  </CustomText>
                </TouchableOpacity>
              </Animated.View>
              <Animated.View
                layout={LinearTransition}
                className="ml-2 mt-1"
                entering={FadeIn.duration(300)}
                exiting={FadeOut.duration(300)}
              >
                {formErrors.root &&
                  Object.values(formErrors.root).map((error, index) => (
                    <CustomText color={theme.colors.error} type="predefault" key={index}>
                      {(error as { message: string }).message}
                    </CustomText>
                  ))}
              </Animated.View>
              <Animated.View className="mt-6" layout={LinearTransition}>
                <TouchableBtn
                  onPress={handleSubmit(onCheckUpEmail)}
                  loading={signUpMutation.isPending}
                  title={t("signup.continue")}
                  disabled={!watch("email") || !!formErrors.email}
                />
              </Animated.View>
              {/* <Animated.View style={{ marginTop: 10 }}>
                <CustomText>asd</CustomText>
              </Animated.View> */}
            </View>
          </View>
        </View>
      </DismissKeyboardView>
    </CustomKeyboardAvoidingView>
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
