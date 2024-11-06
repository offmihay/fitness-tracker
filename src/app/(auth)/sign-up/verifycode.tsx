import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSignUp } from "@clerk/clerk-expo";
import { useCustomTheme } from "../../../hooks/useCustomTheme";
import { Link, useRouter } from "expo-router";
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import { t } from "i18next";
import ClearableTextInput from "../../../components/shared/input/ClearableTextInput";
import CustomText from "../../../components/shared/text/CustomText";
import { useMutation } from "@tanstack/react-query";
import Loader from "@/src/components/shared/loader/Loader";
import TouchableBack from "@/src/components/shared/touchable/TouchableBack";
import TouchablePrimary from "@/src/components/shared/touchable/TouchablePrimary";
import useCountdown from "@/src/hooks/useCountdown";

type Props = {};

const SignUpPasseordScreen = ({}: Props) => {
  const router = useRouter();

  const { isLoaded, signUp, setActive } = useSignUp();
  const [code, setCode] = useState("");

  const [errors, setErrors] = useState<string[]>([]);

  const { secondsLeft, setSecondsLeft } = useCountdown(30);

  const resendCodeMutation = useMutation({
    mutationFn: () =>
      isLoaded
        ? signUp.prepareEmailAddressVerification({ strategy: "email_code" })
        : Promise.resolve(undefined),
    onSuccess: () => {
      setSecondsLeft(30);
    },
    onError: () => {
      setSecondsLeft(null);
      setErrors(["Unable to resend new code"]);
    },
  });

  const handleResendCode = () => resendCodeMutation.mutate();

  const signUpMutation = useMutation({
    mutationFn: async (code: string) => {
      if (!isLoaded) {
        return Promise.resolve(undefined);
      }
      await signUp.attemptEmailAddressVerification({ code });
      if (signUp.status === "complete") {
        await setActive({ session: signUp.createdSessionId });
      }
    },
    onSuccess: () => {
      router.replace("/");
    },
    onError: (err: any) => {
      if (err.clerkError) {
        setErrors(err.errors.map((err: any) => err.longMessage || err.message));
      }
    },
  });

  const onPressVerify = () => signUpMutation.mutate(code);

  return (
    <View style={styles.wrapper}>
      <TouchableBack />

      <View className="mt-[150]">
        <CustomText type="subtitle" center color="white">
          {t("signup.titleVerifyCode")}
        </CustomText>
        <View className="mt-12">
          <View className="relative">
            <ClearableTextInput
              value={code}
              placeholder="Code..."
              onChangeText={setCode}
              themeStyle="dark"
              keyboardType="number-pad"
            />
            {secondsLeft !== null && (
              <CustomText className="pl-1 pt-3" color="white" type="predefault">
                {`${t("signup.notReceiveCode")} `}
                {`${t("signup.tryAgainIn")}: ${secondsLeft}`}
              </CustomText>
            )}
            <TouchablePrimary
              activeOpacity={0.85}
              onPress={onPressVerify}
              loading={signUpMutation.isPending}
              className="absolute bottom-[-150]"
            >
              <CustomText color="white" type="defaultSemiBold">
                {t("signup.complete")}
              </CustomText>
            </TouchablePrimary>
          </View>
          {secondsLeft === 0 && secondsLeft !== null && (
            <TouchableOpacity onPress={handleResendCode} disabled={resendCodeMutation.isPending}>
              <CustomText color="#0082FF" type="predefault" className="pl-1">
                {t("signup.requestNewCode")}
                {resendCodeMutation.isPending && (
                  <Loader style={{ margin: 0, width: 25, height: 15 }} />
                )}
              </CustomText>
            </TouchableOpacity>
          )}

          <CustomText color="red" className="ml-2 mt-2">
            {errors.map((err) => t(`errors.${err}`))}
          </CustomText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: "#141414",
    position: "relative",
  },
});

export default SignUpPasseordScreen;
