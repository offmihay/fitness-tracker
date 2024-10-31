import { useOAuth, useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Image } from "expo-image";
import { useCustomTheme } from "../../hooks/useCustomTheme";
import CustomText from "../../components/shared/text/CustomText";
import { Entypo } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const SignIn = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const googleOAuth = useOAuth({ strategy: "oauth_google" });
  const appleOAuth = useOAuth({ strategy: "oauth_apple" });

  const googleSignIn = async () => {
    const oAuthFlow = await googleOAuth.startOAuthFlow();
    if (oAuthFlow.authSessionResult?.type === "success") {
      if (oAuthFlow.setActive) {
        await oAuthFlow.setActive({ session: oAuthFlow.createdSessionId });
      }
    }
  };

  const appleSignIn = async () => {
    const oAuthFlow = await appleOAuth.startOAuthFlow();
    if (oAuthFlow.authSessionResult?.type === "success") {
      if (oAuthFlow.setActive) {
        await oAuthFlow.setActive({ session: oAuthFlow.createdSessionId });
      }
    }
  };

  return (
    <Image source={require("../../../assets/imgs/signin-background2.jpg")}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.content}>
          <View style={styles.buttonList}>
            <TouchableOpacity style={styles.button} activeOpacity={0.85} onPress={googleSignIn}>
              <Image
                source={require("../../../assets/imgs/google_icon.png")}
                style={{ width: 20, height: 20 }}
              />
              <CustomText color="black" type="defaultSemiBold">
                {t("signin.continueGoogle")}
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} activeOpacity={0.85} onPress={appleSignIn}>
              <Image
                source={require("../../../assets/imgs/apple_icon.png")}
                style={{ width: 26, height: 26, bottom: 2 }}
              />
              <CustomText color="black" type="defaultSemiBold">
                {t("signin.continueApple")}
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#333334" }]}
              activeOpacity={0.85}
              onPress={() => router.navigate("/sign-in-modal")}
            >
              <Entypo name="mail" size={24} color="white" />
              <CustomText color="white" type="defaultSemiBold">
                {t("signin.continueEmail")}
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.navigate("/sign-up")}>
              <CustomText color="white" type="link" style={{ textAlign: "center" }}>
                {t("signin.signup")}
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Image>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    height: "100%",
  },

  content: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "black",
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 50,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },

  buttonList: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
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
