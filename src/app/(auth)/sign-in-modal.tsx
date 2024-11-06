import {
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import React, { useCallback, useState } from "react";
import ClearableTextInput from "../../components/shared/input/ClearableTextInput";
import PasswordInput from "../../components/shared/input/PasswordInput";
import CustomText from "../../components/shared/text/CustomText";

import { useTranslation } from "react-i18next";
import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { useCustomTheme } from "../../hooks/useCustomTheme";
import { useMutation } from "@tanstack/react-query";
import Loader from "@/src/components/shared/loader/Loader";
import TouchablePrimary from "@/src/components/shared/touchable/TouchablePrimary";

type Props = {};

type signIn = {
  emailAddress: string;
  password: string;
};

const SignInModal = ({}: Props) => {
  const { t } = useTranslation();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [errors, setErrors] = useState<string[]>([]);

  const signInMutation = useMutation({
    mutationFn: async ({ emailAddress, password }: signIn) => {
      if (isLoaded) {
        const signInAttempt = await signIn.create({
          identifier: emailAddress,
          password,
        });

        if (signInAttempt.status === "complete") {
          await setActive({ session: signInAttempt.createdSessionId });
          router.replace("/");
        }
      } else {
        return Promise.resolve(undefined);
      }
    },
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
  });

  const onSignInPress = () => signInMutation.mutate({ emailAddress, password });

  return (
    <View style={styles.wrapper}>
      <View style={[styles.contentWrapper]}>
        <CustomText type="subtitle" style={{ textAlign: "center", marginBottom: 40 }} color="white">
          {t("signin.modal.title")}
        </CustomText>
        <View className="w-full relative">
          <View className="flex gap-4">
            <ClearableTextInput
              value={emailAddress}
              onChangeText={setEmailAddress}
              onSubmitEditing={() => void 0}
              placeholder="Email"
              keyboardType="email-address"
              useClearButton
              themeStyle="dark"
            />
            <PasswordInput
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              themeStyle="dark"
            ></PasswordInput>
          </View>

          <TouchableOpacity onPress={void 0} className="pl-2 pt-3">
            <CustomText color="#0082FF" type="predefault">
              {t("signin.modal.forgotPassword")}
              <Loader style={{ margin: 0, width: 25, height: 15 }} />
            </CustomText>
          </TouchableOpacity>
          <TouchablePrimary
            activeOpacity={0.85}
            onPress={onSignInPress}
            className="absolute bottom-[-130]"
            loading={signInMutation.isPending}
          >
            <CustomText type="defaultSemiBold" color="white">
              {t("signin.modal.signin")}
            </CustomText>
          </TouchablePrimary>
        </View>
        <Text
          style={{
            color: "red",
            paddingLeft: 4,
            paddingTop: 10,
          }}
        >
          {errors.map((err) => t(`errors.${err}`))}
        </Text>
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
