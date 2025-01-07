import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { t } from "i18next";
import CustomText from "../../../components/shared/text/CustomText";
import Loader from "@/src/components/shared/loader/Loader";
import TouchableBack from "@/src/components/shared/button/ButtonBack";
import TouchableBtn from "@/src/components/shared/button/ButtonDefault";
import useCountdown from "@/src/hooks/useCountdown";
import {
  useResendVerificationCodeMutation,
  useVerifyEmailCodeMutation,
} from "../../../queries/signup";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { FormProvider, useForm } from "react-hook-form";
import DismissKeyboardView from "@/src/components/shared/view/DismissKeyboardView";
import CustomKeyboardAvoidingView from "@/src/components/shared/view/CustomKeyboardAvoidingView";
import Animated, { FadeIn, FadeOut, LinearTransition } from "react-native-reanimated";
import RHFormInput from "@/src/components/shared/form/RHFormInput";

type VerificationCodeData = {
  code: string;
};

const SignUpVerifyCodeScreen = () => {
  const theme = useCustomTheme();
  const router = useRouter();

  const { secondsLeft, setSecondsLeft } = useCountdown(30);

  const methods = useForm<VerificationCodeData>({
    defaultValues: {
      code: "",
    },
    mode: "onSubmit",
  });

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors: formErrors, isDirty },
    reset,
    setError,
    clearErrors,
  } = methods;

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
    <FormProvider {...methods}>
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
                  <RHFormInput
                    name="code"
                    label={t("signup.code")}
                    control={control}
                    inputProps={{
                      isError: !!formErrors.code,
                      keyboardType: "number-pad",
                      maxLength: 6,
                    }}
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
                  <TouchableBtn
                    activeOpacity={0.85}
                    onPress={handleSubmit(onPressVerify)}
                    loading={verifyCodeMutation.isPending}
                    title={t("signup.complete")}
                    disabled={watch("code").length != 6 || Object.keys(formErrors).length !== 0}
                  />
                </Animated.View>
              </View>
            </View>
          </View>
        </DismissKeyboardView>
      </CustomKeyboardAvoidingView>
    </FormProvider>
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
