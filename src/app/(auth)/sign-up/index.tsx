import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { t } from "i18next";

import CustomText from "../../../components/shared/text/CustomText";
import DismissKeyboardView from "../../../components/shared/input/DissmissKeyboardView";
import TouchableBtn from "@/src/components/shared/touchable/TouchableBtn";
import TouchableBack from "@/src/components/shared/touchable/TouchableBack";
import { useSignUpMutation } from "../../../hooks/mutations/useSignUpMutation";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import CustomTextInput from "@/src/components/shared/input/CustomTextInput";

export default function SignUpEmailScreen() {
  const theme = useCustomTheme("dark");
  const [errors, setErrors] = useState<string[]>([]);
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const signUpMutation = useSignUpMutation();

  useEffect(() => {
    setErrors([]);
  }, [emailAddress]);

  const onCheckUpEmail = () => {
    signUpMutation.mutate(emailAddress, {
      onSuccess: () => {
        router.navigate({
          pathname: "/sign-up/password",
          params: { email: emailAddress },
        });
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
      <View style={[styles.contentWrapper]}>
        <CustomText type="subtitle" color={theme.colors.text} center>
          {t("signup.titleEmail")}
        </CustomText>
        <View className="w-full">
          <View className="flex flex-column w-full relative">
            <CustomTextInput
              value={emailAddress}
              onChangeText={setEmailAddress}
              label={t("signup.email")}
              keyboardType="email-address"
              useClearButton
              style={{ color: "white" }}
              themeStyle={theme.dark ? "dark" : "light"}
            />
            <TouchableOpacity
              onPress={() =>
                router.navigate({
                  pathname: "/sign-in-modal",
                })
              }
              className="pl-2 pt-3"
            >
              <CustomText color="#0082FF" type="predefault">
                {t("signup.alreadyHaveAccount")}
                {/* <Loader style={{ margin: 0, width: 25, height: 15 }} /> */}
              </CustomText>
            </TouchableOpacity>
            <TouchableBtn
              className="absolute bottom-[-115]"
              onPress={onCheckUpEmail}
              loading={signUpMutation.isPending}
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
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,

    position: "relative",
  },
  contentWrapper: {
    flex: 1,
    marginTop: 130,
    gap: 50,
    paddingHorizontal: 10,
    paddingTop: 10,
    borderRadius: 40,
    alignItems: "center",
  },
});
