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
import { useChangePasswordForRecover } from "@/src/queries/recover";
import { useToast } from "@/src/hooks/useToast";

type PasswordData = {
  password: string;
};

const SignUpPasswordScreen = () => {
  const theme = useCustomTheme();
  const { showSuccessToast } = useToast();
  const router = useRouter();

  const methods = useForm<PasswordData>({
    defaultValues: { password: "" },
    mode: "onSubmit",
  });

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors: formErrors },
    clearErrors,
    setError,
  } = methods;

  const changePasswordMutation = useChangePasswordForRecover();

  useEffect(() => {
    clearErrors();
  }, [watch("password")]);

  const onContinuePress = (data: PasswordData) => {
    changePasswordMutation.mutate(data.password, {
      onSuccess: () => {
        showSuccessToast("password_changed");
        router.dismissTo({
          pathname: "sign-in",
        });
      },
      onError: (error: any) => {
        clerkHandleErrors(error, setError);
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <ButtonBack />
      <DismissKeyboardView>
        <View style={[styles.wrapper, { backgroundColor: theme.colors.background }]}>
          <View style={[styles.contentWrapper]}>
            <View className="h-[300]">
              <Animated.View layout={LinearTransition} className="mb-12">
                <CustomText type="subtitle" center color={theme.colors.text}>
                  {t("recoverPassword.typeStrongPassword")}
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
                  loading={changePasswordMutation.isPending}
                  title={t("signup.continue")}
                  disabled={Object.keys(formErrors).length !== 0 || !watch("password")}
                />
              </Animated.View>
            </View>
          </View>
        </View>
      </DismissKeyboardView>
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 160,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: "center",
  },
});

export default SignUpPasswordScreen;
