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

type Props = {};

const SignInModal = ({}: Props) => {
  const { t } = useTranslation();
  const theme = useCustomTheme();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [errors, setErrors] = useState<string[]>([]);

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.log(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      const error = JSON.parse(JSON.stringify(err));
      if (error.clerkError) {
        setErrors(error.errors.map((err: any) => err.longMessage));
      }
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <View style={styles.wrapper}>
      <View style={[styles.contentWrapper]}>
        <CustomText
          type="subtitle"
          style={{ textAlign: "center", fontFamily: "PlayBold", marginBottom: 40 }}
          color="white"
        >
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
              style={{ fontFamily: "PlayRegular", color: "white" }}
              themeStyle="dark"
            />
            <PasswordInput
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              style={{ fontFamily: "PlayRegular" }}
              themeStyle="dark"
            ></PasswordInput>
          </View>
          <Link
            style={{ color: "#0082FF", fontFamily: "PlayRegular", paddingLeft: 4, paddingTop: 12 }}
            href={"/"}
          >
            {t("signin.modal.forgotPassword")}
          </Link>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.85}
            onPress={() => onSignInPress()}
          >
            <CustomText color="white" style={{ fontFamily: "PlayBold" }}>
              {t("signin.modal.signin")}
            </CustomText>
          </TouchableOpacity>
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
