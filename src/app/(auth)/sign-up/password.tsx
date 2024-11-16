import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { t } from "i18next";
import CustomText from "../../../components/shared/text/CustomText";
import TouchableBack from "@/src/components/shared/touchable/TouchableBack";
import TouchableBtn from "@/src/components/shared/touchable/TouchableBtn";
import { useSignUpPasswordMutation } from "../../../mutations/useSignUpMutation";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import CustomTextInput from "@/src/components/shared/input/CustomTextInput";
import { Controller, useForm } from "react-hook-form";
import DismissKeyboardView from "@/src/components/shared/view/DismissKeyboardView";
import CustomKeyboardAvoidingView from "@/src/components/shared/view/CustomKeyboardAvoidingView";
import Animated, { FadeIn, FadeOut, LinearTransition } from "react-native-reanimated";

type PasswordData = {
  password: string;
  passwordConfirm: string;
};

const SignUpPasswordScreen = () => {
  const theme = useCustomTheme();
  const { email } = useLocalSearchParams();
  const router = useRouter();
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors: formErrors, isDirty },
    reset,
    setError,
    clearErrors,
  } = useForm<PasswordData>({
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
    mode: "onSubmit",
  });

  const signUpPasswordMutation = useSignUpPasswordMutation();

  const onClear = (isClear: boolean) => {
    isClear && reset();
  };

  useEffect(() => {
    clearErrors();
  }, [watch("password"), watch("passwordConfirm")]);

  const onContinuePress = (data: PasswordData) => {
    if (data.password !== data.passwordConfirm) {
      setError("password", {});
      setError("passwordConfirm", {});
      setError("root.matchingError", {
        type: "errors.password_not_matching",
        message: t(`errors.password_not_matching`),
      });
      return;
    }
    signUpPasswordMutation.mutate(
      { emailAddress: email as string, password: data.password },
      {
        onSuccess: () => {
          router.navigate({
            pathname: "/sign-up/verifycode",
          });
        },
        onError: (error: any) => {
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
      }
    );
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
              <Animated.View layout={LinearTransition} className="mb-12">
                <CustomText type="subtitle" center color={theme.colors.text}>
                  {t("signup.titlePassword")}
                </CustomText>
              </Animated.View>
              <Animated.View layout={LinearTransition}>
                <Controller
                  control={control}
                  rules={{
                    minLength: { value: 8, message: "Password is too short" },
                    maxLength: { value: 20, message: "Password is too long" },
                  }}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <CustomTextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      label={t("signup.password")}
                      isPassword
                      isError={!!formErrors.password}
                      onClear={onClear}
                    />
                  )}
                  name="password"
                />
                <Animated.View
                  layout={LinearTransition}
                  className="ml-2 mb-1"
                  entering={FadeIn.duration(300)}
                  exiting={FadeOut.duration(300)}
                >
                  {formErrors.password?.message && (
                    <CustomText color={theme.colors.error} type="predefault">
                      {formErrors.password?.message}
                    </CustomText>
                  )}
                </Animated.View>
              </Animated.View>
              <Animated.View layout={LinearTransition}>
                <Controller
                  control={control}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <CustomTextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      label={t("signup.confirmPassword")}
                      isPassword
                      isError={!!formErrors.passwordConfirm}
                    />
                  )}
                  name="passwordConfirm"
                />
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
                  onPress={handleSubmit(onContinuePress)}
                  loading={signUpPasswordMutation.isPending}
                  title={t("signup.continue")}
                  disabled={
                    !!formErrors.password ||
                    !!formErrors.passwordConfirm ||
                    !watch("password") ||
                    !watch("passwordConfirm")
                  }
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
    paddingHorizontal: 10,
    marginBottom: 100,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: "center",
  },
});

export default SignUpPasswordScreen;
