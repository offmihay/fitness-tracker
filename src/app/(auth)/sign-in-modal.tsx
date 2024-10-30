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
import { useRouter } from "expo-router";
import { useCustomTheme } from "../../hooks/useCustomTheme";

type Props = {};

const SignInModal = ({}: Props) => {
  const { t } = useTranslation();
  const theme = useCustomTheme();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailProvided, setEmailProvided] = useState(false);

  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

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
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.log(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <View style={styles.wrapper}>
      {!isEmailProvided && (
        <View style={styles.contentWrapper}>
          <CustomText
            type="subtitle"
            style={{ textAlign: "center", fontFamily: "PlayBold" }}
            color="white"
          >
            {t("signin.modal.titleEmail")}
          </CustomText>
          <ClearableTextInput
            value={emailAddress}
            onChangeText={setEmailAddress}
            onSubmitEditing={() => setEmailProvided(true)}
            placeholder="Email"
            keyboardType="email-address"
            useClearButton
            style={{ fontFamily: "PlayRegular", color: "white" }}
            themeStyle="dark"
          />
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.85}
            onPress={() => setEmailProvided(true)}
          >
            <CustomText color="black" style={{ fontFamily: "PlayBold" }}>
              {t("signin.modal.continue")}
            </CustomText>
          </TouchableOpacity>
        </View>
      )}
      {isEmailProvided && (
        <View style={styles.contentWrapper}>
          <CustomText
            type="subtitle"
            style={{ textAlign: "center", fontFamily: "PlayBold" }}
            color="white"
          >
            {t("signin.modal.titlePassword")}
          </CustomText>

          <PasswordInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            style={{ fontFamily: "PlayRegular" }}
            themeStyle="dark"
          ></PasswordInput>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.85}
            onPress={() => onSignInPress()}
          >
            <CustomText color="black" style={{ fontFamily: "PlayBold" }}>
              {t("signin.modal.signin")}
            </CustomText>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: "black",
  },
  contentWrapper: {
    flex: 1,
    justifyContent: "center",
    gap: 50,
    paddingHorizontal: 10,
    paddingTop: 10,
    borderRadius: 40,
    alignItems: "center",
    paddingBottom: 150,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SignInModal;
