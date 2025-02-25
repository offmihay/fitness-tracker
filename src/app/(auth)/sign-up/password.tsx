import { StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { t } from "i18next";
import ButtonBack from "@/src/shared/button/ButtonBack";
import { useSignUpPasswordMutation } from "../../../queries/signup";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { Controller, FormProvider, useForm } from "react-hook-form";
import DismissKeyboardView from "@/src/shared/view/DismissKeyboardView";
import CustomKeyboardAvoidingView from "@/src/shared/view/CustomKeyboardAvoidingView";
import Animated, { FadeIn, FadeOut, LinearTransition } from "react-native-reanimated";
import clerkHandleErrors from "@/src/utils/clerkHandleErrors";
import ButtonDefault from "@/src/shared/button/ButtonDefault";
import CustomTextInput from "@/src/shared/input/CustomTextInput";
import CustomText from "@/src/shared/text/CustomText";

type PasswordData = {
  password: string;
  passwordConfirm: string;
};

const SignUpPasswordScreen = () => {
  const theme = useCustomTheme();
  const { email } = useLocalSearchParams();
  const router = useRouter();

  const methods = useForm<PasswordData>({
    defaultValues: { password: "", passwordConfirm: "" },
    mode: "onSubmit",
  });

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors: formErrors, isDirty },
    clearErrors,
    setError,
    reset,
  } = methods;

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
          router.push({
            pathname: "./verifycode",
          });
        },
        onError: (error: any) => {
          clerkHandleErrors(error, setError);
        },
      }
    );
  };

  return (
    <FormProvider {...methods}>
      <CustomKeyboardAvoidingView
        keyboardVerticalOffset={-200}
        style={{ backgroundColor: theme.colors.background }}
      >
        <ButtonBack />
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
                      minLength: { value: 8, message: t("errors.password_too_short") },
                      maxLength: { value: 20, message: t("errors.password_too_long") },
                    }}
                    render={({ field: { onChange, value, onBlur } }) => (
                      <CustomTextInput
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        label={t("signup.password")}
                        isPassword
                        isError={!!formErrors.password}
                        textContentType="oneTimeCode"
                        onClear={onClear}
                        autoCapitalize="none"
                      />
                    )}
                    name="password"
                  />
                  {formErrors.password?.message && (
                    <Animated.View
                      layout={LinearTransition}
                      className="ml-2 mb-2"
                      entering={FadeIn.duration(300)}
                      exiting={FadeOut.duration(300)}
                    >
                      <CustomText color={theme.colors.error} type="predefault">
                        {t(`errors.${formErrors.password?.message}`)}
                      </CustomText>
                    </Animated.View>
                  )}
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
                        textContentType="oneTimeCode"
                        autoCapitalize="none"
                      />
                    )}
                    name="passwordConfirm"
                  />
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
                        {t(`errors.${(error as { message: string }).message}`)}
                      </CustomText>
                    ))}
                  </Animated.View>
                )}
                <Animated.View layout={LinearTransition} className="mt-6">
                  <ButtonDefault
                    activeOpacity={0.85}
                    onPress={handleSubmit(onContinuePress)}
                    loading={signUpPasswordMutation.isPending}
                    title={t("signup.continue")}
                    disabled={
                      Object.keys(formErrors).length !== 0 ||
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

export default SignUpPasswordScreen;
