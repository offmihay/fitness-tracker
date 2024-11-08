import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { t } from "i18next";
import PasswordInput from "../../../components/shared/input/PasswordInput";
import CustomText from "../../../components/shared/text/CustomText";
import TouchableBack from "@/src/components/shared/touchable/TouchableBack";
import TouchableBtn from "@/src/components/shared/touchable/TouchableBtn";
import { useSignUpPasswordMutation } from "../../../hooks/mutations/useSignUpMutation";
import DismissKeyboardView from "@/src/components/shared/input/DissmissKeyboardView";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";

const SignUpPasswordScreen = () => {
  const theme = useCustomTheme("dark");
  const { email } = useLocalSearchParams();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const signUpPasswordMutation = useSignUpPasswordMutation();
  // useEffect(() => {
  //   errors.length !== 0 && setErrors([]);
  // }, [password, passwordConfirm]);

  const onContinuePress = () => {
    if (password === passwordConfirm) {
      signUpPasswordMutation.mutate(
        { emailAddress: email as string, password },
        {
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
        }
      );
    } else {
      setErrors(["Passwords not matching."]);
    }
  };

  return (
    <DismissKeyboardView style={[styles.wrapper, { backgroundColor: theme.colors.background }]}>
      <TouchableBack themeStyle={theme.dark ? "dark" : "light"} />
      <View style={[styles.contentWrapper]}>
        <CustomText type="subtitle" center color={theme.colors.text}>
          {t("signup.titlePassword")}
        </CustomText>
        <View className="w-full">
          <View className="flex flex-column gap-5 w-full relative">
            <PasswordInput
              value={password}
              onChangeText={setPassword}
              label={t("signup.password")}
              themeStyle={theme.dark ? "dark" : "light"}
            />
            <PasswordInput
              value={passwordConfirm}
              onChangeText={setPasswordConfirm}
              label={t("signup.confirmPassword")}
              themeStyle={theme.dark ? "dark" : "light"}
            />
            <TouchableBtn
              activeOpacity={0.85}
              onPress={onContinuePress}
              loading={signUpPasswordMutation.isPending}
              className="absolute bottom-[-115]"
              title={t("signup.continue")}
            />
          </View>

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
    backgroundColor: "#141414",
    position: "relative",
  },
  contentWrapper: {
    flex: 1,
    marginTop: 90,
    gap: 50,
    paddingHorizontal: 10,
    paddingTop: 10,
    borderRadius: 40,
    alignItems: "center",
  },
});

export default SignUpPasswordScreen;
