import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { t } from "i18next";
import ClearableTextInput from "../../../components/shared/input/ClearableTextInput";
import CustomText from "../../../components/shared/text/CustomText";
import Loader from "@/src/components/shared/loader/Loader";
import TouchableBack from "@/src/components/shared/touchable/TouchableBack";
import TouchableBtn from "@/src/components/shared/touchable/TouchableBtn";
import useCountdown from "@/src/hooks/useCountdown";
import {
  useResendVerificationCodeMutation,
  useVerifyEmailCodeMutation,
} from "../../../hooks/mutations/useSignUpMutation";
import DismissKeyboardView from "@/src/components/shared/input/DissmissKeyboardView";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";

const SignUpVerifyCodeScreen = () => {
  const theme = useCustomTheme("dark");
  const router = useRouter();
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const { secondsLeft, setSecondsLeft } = useCountdown(30);

  const resendCodeMutation = useResendVerificationCodeMutation();
  const verifyCodeMutation = useVerifyEmailCodeMutation();

  const handleResendCode = () => {
    resendCodeMutation.mutate(undefined, {
      onSuccess: () => {
        setSecondsLeft(30);
        setErrors([]);
      },
      onError: () => {
        setSecondsLeft(null);
        setErrors(["Unable to resend new code"]);
      },
    });
  };

  const onPressVerify = () => {
    verifyCodeMutation.mutate(code, {
      onSuccess: () => {
        router.replace("/");
      },
      onError: (err: any) => {
        if (err.clerkError) {
          setErrors(err.errors.map((err: any) => err.longMessage || err.message));
        }
      },
    });
  };

  return (
    <DismissKeyboardView style={[styles.wrapper, { backgroundColor: theme.colors.background }]}>
      <TouchableBack themeStyle={theme.dark ? "dark" : "light"} />

      <View className="mt-[130]">
        <CustomText type="subtitle" center color={theme.colors.text}>
          {t("signup.titleVerifyCode")}
        </CustomText>
        <View className="mt-14">
          <View className="relative">
            <ClearableTextInput
              value={code}
              label={t("signup.code")}
              onChangeText={setCode}
              themeStyle={theme.dark ? "dark" : "light"}
              keyboardType="number-pad"
            />
            {secondsLeft !== null && (
              <CustomText className="pl-2 pt-3" color={theme.colors.text} type="predefault">
                {`${t("signup.notReceiveCode")} `}
                {`${t("signup.tryAgainIn")}: ${secondsLeft}`}
              </CustomText>
            )}
            <TouchableBtn
              activeOpacity={0.85}
              onPress={onPressVerify}
              loading={verifyCodeMutation.isPending}
              className="absolute bottom-[-135]"
              title={t("signup.complete")}
            />
          </View>
          {secondsLeft === 0 && secondsLeft !== null && (
            <TouchableOpacity onPress={handleResendCode} disabled={resendCodeMutation.isPending}>
              <CustomText color="#0082FF" type="predefault" className="pl-2 pt-1">
                {t("signup.requestNewCode")}
                {resendCodeMutation.isPending && (
                  <Loader style={{ margin: 0, width: 25, height: 15 }} />
                )}
              </CustomText>
            </TouchableOpacity>
          )}

          <CustomText color={theme.colors.error} className="ml-2 mt-2 max-h-[50]" type="predefault">
            {errors.map((err) => t(`errors.${err}`))}
          </CustomText>
        </View>
      </View>
    </DismissKeyboardView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    position: "relative",
  },
});

export default SignUpVerifyCodeScreen;
