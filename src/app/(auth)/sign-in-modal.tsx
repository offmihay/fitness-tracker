import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import ClearableTextInput from "../../components/shared/input/ClearableTextInput";
import PasswordInput from "../../components/shared/input/PasswordInput";
import CustomText from "../../components/shared/text/CustomText";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import Loader from "@/src/components/shared/loader/Loader";
import TouchableBtn from "@/src/components/shared/touchable/TouchableBtn";
import { useSignInMutation } from "@/src/hooks/useSignInMutation";
import DismissKeyboardView from "@/src/components/shared/input/DissmissKeyboardView";

type Props = {};

const SignInModal = ({}: Props) => {
  const [errors, setErrors] = useState<string[]>([]);
  const { t } = useTranslation();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const { signInMutation } = useSignInMutation();

  useEffect(() => {
    setErrors([]);
  }, [emailAddress, password]);

  const onSignInPress = () =>
    signInMutation.mutate(
      { emailAddress, password },
      {
        onSuccess: () => {
          router.push({
            pathname: "/",
          });
        },
        onError: (error: any) => {
          if (error.clerkError) {
            setErrors(error.errors.map((err: any) => err.longMessage || err.message));
          }
        },
      }
    );

  return (
    <DismissKeyboardView style={styles.wrapper}>
      <View style={[styles.contentWrapper]}>
        <CustomText type="subtitle" style={{ textAlign: "center", marginBottom: 55 }} color="white">
          {t("signin.modal.title")}
        </CustomText>
        <View className="w-full relative">
          <View className="flex gap-4">
            <ClearableTextInput
              value={emailAddress}
              onChangeText={setEmailAddress}
              onSubmitEditing={() => void 0}
              label={t("signin.email")}
              keyboardType="email-address"
              useClearButton
              themeStyle="dark"
            />
            <PasswordInput
              value={password}
              onChangeText={setPassword}
              label={t("signin.password")}
              themeStyle="dark"
            ></PasswordInput>
          </View>

          <TouchableOpacity onPress={void 0} className="pl-2 pt-4">
            <CustomText color="#0082FF" type="predefault">
              {t("signin.modal.forgotPassword")}
              {/* <Loader style={{ margin: 0, width: 25, height: 15 }} /> */}
            </CustomText>
          </TouchableOpacity>
          <TouchableBtn
            activeOpacity={0.85}
            onPress={onSignInPress}
            className="absolute bottom-[-135]"
            loading={signInMutation.isPending}
          >
            <CustomText type="defaultSemiBold" color="white">
              {t("signin.modal.signin")}
            </CustomText>
          </TouchableBtn>
        </View>
        <CustomText color="red" className="pl-2 pt-2 max-h-[50]" type="predefault">
          {errors.map((err) => t(`errors.${err}`))}
        </CustomText>
      </View>
    </DismissKeyboardView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    height: "100%",
  },
  contentWrapper: {
    flex: 1,
    marginTop: 40,
    paddingHorizontal: 10,
    paddingTop: 10,
    borderRadius: 40,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#7968F2",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: -130,
  },
});

export default SignInModal;
