import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSignUp } from "@clerk/clerk-expo";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCustomTheme } from "../../../hooks/useCustomTheme";
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import { t } from "i18next";
import PasswordInput from "../../../components/shared/input/PasswordInput";
import CustomText from "../../../components/shared/text/CustomText";
import { useMutation } from "@tanstack/react-query";
import Loader from "@/src/components/shared/loader/Loader";
import TouchableBack from "@/src/components/shared/touchable/TouchableBack";
import TouchablePrimary from "@/src/components/shared/touchable/TouchablePrimary";

type Props = {};

type signUp = {
  emailAddress: string;
  password: string;
};

const SignUpPasswordScreen = ({}: Props) => {
  const { email } = useLocalSearchParams();
  const router = useRouter();

  const { isLoaded, signUp, setActive } = useSignUp();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    errors.length !== 0 && setErrors([]);
  }, [password, passwordConfirm]);

  const signUpMutation = useMutation({
    mutationFn: async ({ emailAddress, password }: signUp) => {
      if (isLoaded) {
        const signUpResponse = await signUp.create({
          emailAddress,
          password,
        });
        return (
          signUpResponse &&
          (await signUp.prepareEmailAddressVerification({ strategy: "email_code" }))
        );
      } else {
        return Promise.resolve(undefined);
      }
    },
    onSuccess: () => {
      router.navigate({
        pathname: "/sign-up/verifycode",
      });
    },
    onError: (err: any) => {
      if (err.clerkError) {
        setErrors(err.errors.map((err: any) => err.longMessage || err.message));
      }
    },
  });

  const onContinuePress = () =>
    password === passwordConfirm
      ? signUpMutation.mutate({ emailAddress: email as string, password })
      : setErrors(["Passwords not matching."]);

  return (
    <View style={styles.wrapper}>
      <TouchableBack />
      <View style={[styles.contentWrapper]}>
        <CustomText type="subtitle" center color="white">
          {t("signup.titlePassword")}
        </CustomText>
        <View className="w-full">
          <View className="flex flex-column gap-5 w-full relative">
            <PasswordInput
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              themeStyle="dark"
            ></PasswordInput>
            <PasswordInput
              value={passwordConfirm}
              onChangeText={setPasswordConfirm}
              placeholder="Confirm Password"
              themeStyle="dark"
            ></PasswordInput>
            <TouchablePrimary
              activeOpacity={0.85}
              onPress={onContinuePress}
              loading={signUpMutation.isPending}
              className="absolute bottom-[-150]"
            >
              <CustomText color="white" type="defaultSemiBold">
                {t("signin.modal.continue")}
              </CustomText>
            </TouchablePrimary>
          </View>

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
  contentWrapper: {
    flex: 1,
    marginTop: 100,
    gap: 40,
    paddingHorizontal: 10,
    paddingTop: 10,
    borderRadius: 40,
    alignItems: "center",
  },
});

export default SignUpPasswordScreen;
