import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomText from "../../components/shared/text/CustomText";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import TouchableBtn from "@/src/components/shared/touchable/TouchableBtn";
import { useSignInMutation } from "@/src/queries/signin";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import CustomTextInput from "@/src/components/shared/input/CustomTextInput";
import { Controller, useForm } from "react-hook-form";
import Animated, { FadeIn, FadeOut, LinearTransition } from "react-native-reanimated";
import CustomKeyboardAvoidingView from "@/src/components/shared/view/CustomKeyboardAvoidingView";
import DismissKeyboardView from "@/src/components/shared/view/DismissKeyboardView";

type Props = {};

type SignInData = {
  email: string;
  password: string;
};

const SignInModal = ({}: Props) => {
  const { t } = useTranslation();
  const router = useRouter();
  const theme = useCustomTheme();

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors: formErrors, isDirty },
    clearErrors,
    setError,
  } = useForm<SignInData>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const { signInMutation } = useSignInMutation();

  useEffect(() => {
    clearErrors();
  }, [watch("email"), watch("password")]);

  const onSignInPress = (data: SignInData) => {
    signInMutation.mutate(
      { emailAddress: data.email, password: data.password },
      {
        onSuccess: () => {
          router.push({
            pathname: "/",
          });
        },
        onError: (error: any) => {
          if (error.clerkError) {
            error.errors.forEach((err: any) => {
              const param = err.meta.paramName;
              const errParam =
                param === "identifier"
                  ? "email"
                  : param === "password"
                  ? "password"
                  : "root.clerkError";
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
      }
    );
  };

  return (
    <CustomKeyboardAvoidingView
      keyboardVerticalOffset={-50}
      style={{ backgroundColor: theme.colors.background }}
    >
      <DismissKeyboardView>
        <View style={[styles.wrapper, { backgroundColor: theme.colors.background }]}>
          <View style={[styles.contentWrapper]}>
            <View className="max-h-[200]">
              <Animated.View layout={LinearTransition} className="mb-12">
                <CustomText
                  type="subtitle"
                  style={{ textAlign: "center" }}
                  color={theme.colors.text}
                >
                  {t("signin.modal.title")}
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
                      label={t("signin.email")}
                      useClearButton
                      isError={!!formErrors.email}
                      textContentType="oneTimeCode"
                    />
                  )}
                  name="email"
                />
              </Animated.View>
              {formErrors.email?.message && (
                <Animated.View
                  layout={LinearTransition}
                  className="ml-2 mb-2"
                  entering={FadeIn.duration(300)}
                  exiting={FadeOut.duration(300)}
                >
                  <CustomText color={theme.colors.error} type="predefault">
                    {formErrors.email?.message}
                  </CustomText>
                </Animated.View>
              )}

              <Animated.View layout={LinearTransition}>
                <Controller
                  control={control}
                  rules={{
                    minLength: { value: 8, message: t("errors.password_too_short") },
                    maxLength: { value: 20, message: t("errors.password_too_long") },
                  }}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <CustomTextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      label={t("signin.password")}
                      isPassword
                      isError={!!formErrors.password}
                      // textContentType="oneTimeCode"
                    />
                  )}
                  name="password"
                />
              </Animated.View>
              {formErrors.password?.message && (
                <Animated.View
                  layout={LinearTransition}
                  className="ml-2 mb-1"
                  entering={FadeIn.duration(300)}
                  exiting={FadeOut.duration(300)}
                >
                  <CustomText color={theme.colors.error} type="predefault">
                    {formErrors.password?.message}
                  </CustomText>
                </Animated.View>
              )}

              <Animated.View layout={LinearTransition} className="ml-2 w-[200] mt-2">
                <TouchableOpacity onPress={void 0}>
                  <CustomText color="#0082FF" type="predefault">
                    {t("signin.modal.forgotPassword")}
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
              <Animated.View layout={LinearTransition} className="mt-6">
                <TouchableBtn
                  activeOpacity={0.85}
                  onPress={handleSubmit(onSignInPress)}
                  loading={signInMutation.isPending}
                  title={t("signin.modal.signin")}
                  disabled={!watch("email") || !watch("password") || !!formErrors.password}
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
    marginBottom: 200,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: "center",
  },
});

export default SignInModal;
