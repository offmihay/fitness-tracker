import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { useSignInMutation } from "@/src/queries/signin";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { FormProvider, useForm } from "react-hook-form";
import Animated, { FadeIn, FadeOut, LinearTransition } from "react-native-reanimated";
import DismissKeyboardView from "@/src/shared/view/DismissKeyboardView";
import clerkHandleErrors from "@/src/utils/clerkHandleErrors";
import ButtonDefault from "@/src/shared/button/ButtonDefault";
import RHFormInput from "@/src/shared/form/RHFormInput";
import CustomText from "@/src/shared/text/CustomText";

type Props = {};

type SignInData = {
  email: string;
  password: string;
};

const SignInModal = ({}: Props) => {
  const { t } = useTranslation();
  const router = useRouter();
  const theme = useCustomTheme();

  const methods = useForm<SignInData>({
    defaultValues: { email: "", password: "" },
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
          const paramMapper = (paramName: string) => {
            if (paramName === "identifier") return "email";
            if (paramName === "password") return "password";
            return "root.clerkError";
          };
          clerkHandleErrors(error, setError, t, paramMapper);
        },
      }
    );
  };

  return (
    <FormProvider {...methods}>
      <DismissKeyboardView>
        <View style={[styles.wrapper, { backgroundColor: theme.colors.background }]}>
          <View style={[styles.contentWrapper]}>
            <Animated.View layout={LinearTransition} className="mb-12">
              <CustomText type="subtitle" style={{ textAlign: "center" }} color={theme.colors.text}>
                {t("signin.modal.title")}
              </CustomText>
            </Animated.View>

            <RHFormInput
              name="email"
              label={t("signin.email")}
              control={control}
              inputProps={{
                useClearButton: true,
                isError: !!formErrors.email,
                textContentType: "oneTimeCode",
              }}
            />

            <RHFormInput
              name="password"
              label={t("signin.password")}
              control={control}
              inputProps={{
                isPassword: true,
                isError: !!formErrors.password,
                textContentType: "password",
              }}
              rules={{
                minLength: { value: 8, message: t("errors.password_too_short") },
                maxLength: { value: 20, message: t("errors.password_too_long") },
              }}
            />

            <Animated.View layout={LinearTransition} className="ml-2 w-[200] mt-2">
              <TouchableOpacity onPress={void 0}>
                <CustomText color="#0082FF" type="predefault">
                  {t("signin.modal.forgotPassword")}
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
            <Animated.View layout={LinearTransition} className="mt-6">
              <ButtonDefault
                activeOpacity={0.85}
                onPress={handleSubmit(onSignInPress)}
                loading={signInMutation.isPending}
                title={t("signin.modal.signin")}
                disabled={
                  !watch("email") || !watch("password") || Object.keys(formErrors).length !== 0
                }
              />
            </Animated.View>
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
    marginBottom: 280,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: "center",
  },
});

export default SignInModal;
