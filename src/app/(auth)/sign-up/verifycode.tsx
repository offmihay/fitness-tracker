import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { t } from "i18next";
import CustomText from "../../../components/shared/text/CustomText";
import Loader from "@/src/components/shared/loader/Loader";
import TouchableBack from "@/src/components/shared/touchable/TouchableBack";
import TouchableBtn from "@/src/components/shared/touchable/TouchableBtn";
import useCountdown from "@/src/hooks/useCountdown";
import {
  useResendVerificationCodeMutation,
  useVerifyEmailCodeMutation,
} from "../../../mutations/useSignUpMutation";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import CustomTextInput from "@/src/components/shared/input/CustomTextInput";
import { Controller, useForm } from "react-hook-form";
import DismissKeyboardView from "@/src/components/shared/view/DismissKeyboardView";
import CustomKeyboardAvoidingView from "@/src/components/shared/view/CustomKeyboardAvoidingView";
import Animated, { FadeIn, FadeOut, LinearTransition } from "react-native-reanimated";

type VerificationCodeData = {
  code: string;
};

const SignUpVerifyCodeScreen = () => {
  const theme = useCustomTheme();
  const router = useRouter();

  const { secondsLeft, setSecondsLeft } = useCountdown(30);
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors: formErrors, isDirty },
    reset,
    setError,
    clearErrors,
  } = useForm<VerificationCodeData>({
    defaultValues: {
      code: "",
    },
    mode: "onSubmit",
  });

  useEffect(() => {
    clearErrors();
  }, [watch("code")]);

  const resendCodeMutation = useResendVerificationCodeMutation();
  const verifyCodeMutation = useVerifyEmailCodeMutation();

  const handleResendCode = () => {
    resendCodeMutation.mutate(undefined, {
      onSuccess: () => {
        setSecondsLeft(30);
        clearErrors();
      },
      onError: (error: any) => {
        setSecondsLeft(null);
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
  };

  const onPressVerify = (data: VerificationCodeData) => {
    verifyCodeMutation.mutate(data.code, {
      onSuccess: () => {
        router.replace("/");
      },
      onError: (error: any) => {
        if (error.clerkError) {
          error.errors.forEach((err: any) => {
            const param = err.meta.paramName;
            const errParam = param === "code" ? "code" : "root.clerkError";
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
      keyboardVerticalOffset={-200}
      style={{ backgroundColor: theme.colors.background }}
    >
      <TouchableBack />
      <DismissKeyboardView>
        <View style={[styles.wrapper, { backgroundColor: theme.colors.background }]}>
          <View style={[styles.contentWrapper]}>
            <View className="h-[300]">
              <Animated.View className="mb-12" layout={LinearTransition}>
                <CustomText type="subtitle" center color={theme.colors.text}>
                  {t("signup.titleVerifyCode")}
                </CustomText>
              </Animated.View>
              <Animated.View layout={LinearTransition}>
                <Controller
                  control={control}
                  rules={{
                    minLength: 6,
                    maxLength: 6,
                  }}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <CustomTextInput
                      value={value}
                      label={t("signup.code")}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      keyboardType="number-pad"
                      maxLength={6}
                      isError={!!formErrors.code}
                    />
                  )}
                  name="code"
                />
              </Animated.View>

              {formErrors.code?.message && (
                <Animated.View
                  layout={LinearTransition}
                  className="ml-2 mb-1"
                  entering={FadeIn.duration(300)}
                  exiting={FadeOut.duration(300)}
                >
                  <CustomText color={theme.colors.error} type="predefault">
                    {formErrors.code?.message}
                  </CustomText>
                </Animated.View>
              )}

              <Animated.View className="ml-2 mt-1" layout={LinearTransition}>
                {secondsLeft !== null && (
                  <CustomText color={theme.colors.text} type="predefault">
                    {`${t("signup.notReceiveCode")} `}
                    {`${t("signup.tryAgainIn")}: ${secondsLeft}`}
                  </CustomText>
                )}
              </Animated.View>
              <Animated.View className="mt-1 ml-2" layout={LinearTransition}>
                <TouchableOpacity
                  onPress={handleResendCode}
                  disabled={
                    secondsLeft !== 0 || secondsLeft === null || resendCodeMutation.isPending
                  }
                  style={{ width: 200 }}
                >
                  <View className="flex flex-row items-center">
                    <CustomText
                      color={secondsLeft === 0 && secondsLeft !== null ? "#0082FF" : "grey"}
                      type="predefault"
                    >
                      {t("signup.requestNewCode")}
                    </CustomText>
                    {resendCodeMutation.isPending && (
                      <View>
                        <Loader style={{ width: 20, height: 20 }} />
                      </View>
                    )}
                  </View>
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

              <Animated.View className="mt-6">
                <TouchableBtn
                  activeOpacity={0.85}
                  onPress={handleSubmit(onPressVerify)}
                  loading={verifyCodeMutation.isPending}
                  title={t("signup.complete")}
                  disabled={watch("code").length != 6 || !!formErrors.code}
                />
              </Animated.View>
            </View>
          </View>
        </View>
      </DismissKeyboardView>
    </CustomKeyboardAvoidingView>
  );
};

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

export default SignUpVerifyCodeScreen;
