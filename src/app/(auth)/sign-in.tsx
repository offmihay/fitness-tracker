import { useOAuth, useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Appearance,
} from "react-native";
import { Image, ImageBackground } from "expo-image";
import { useCustomTheme } from "../../hooks/useCustomTheme";
import CustomText from "../../components/shared/text/CustomText";
import { Entypo } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import ButtonDefault from "@/src/components/shared/button/ButtonDefault";

const SignIn = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const googleOAuth = useOAuth({ strategy: "oauth_google" });
  const appleOAuth = useOAuth({ strategy: "oauth_apple" });

  const googleSignInMutation = useMutation({
    mutationFn: async () => {
      const oAuthFlow = await googleOAuth.startOAuthFlow();
      oAuthFlow.setActive &&
        oAuthFlow.authSessionResult?.type === "success" &&
        (await oAuthFlow.setActive({ session: oAuthFlow.createdSessionId }));
    },
    onSuccess: () => {
      router.navigate({
        pathname: "/",
      });
    },
    onError: (err: any) => {},
  });

  const appleSignInMutation = useMutation({
    mutationFn: async () => {
      const oAuthFlow = await appleOAuth.startOAuthFlow();
      oAuthFlow.setActive &&
        oAuthFlow.authSessionResult?.type === "success" &&
        (await oAuthFlow.setActive({ session: oAuthFlow.createdSessionId }));
    },
    onSuccess: () => {
      router.navigate({
        pathname: "/",
      });
    },
    onError: (err: any) => {},
  });

  const googleSignIn = () => googleSignInMutation.mutate();
  const appleSignIn = () => appleSignInMutation.mutate();

  return (
    <ImageBackground source={require("../../../assets/imgs/signin-background2.jpg")}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.content}>
          <View className="flex flex-col gap-3">
            <ButtonDefault
              activeOpacity={0.85}
              onPress={googleSignIn}
              type="white"
              nodeLeft={() => (
                <Image
                  source={require("../../../assets/imgs/google_icon.png")}
                  style={{ width: 20, height: 20 }}
                />
              )}
              title={t("signin.continueGoogle")}
            />
            <ButtonDefault
              activeOpacity={0.85}
              onPress={appleSignIn}
              type="white"
              nodeLeft={() => (
                <Image
                  source={require("../../../assets/imgs/apple_icon.png")}
                  style={{ width: 20, height: 20 }}
                />
              )}
              title={t("signin.continueApple")}
            />
            <ButtonDefault
              type="darkgrey"
              activeOpacity={0.85}
              onPress={() => router.navigate("/sign-in-modal")}
              nodeLeft={(color) => <Entypo name="mail" size={24} color={color} />}
              title={t("signin.continueEmail")}
            />

            <TouchableOpacity onPress={() => router.navigate("/sign-up")}>
              <CustomText color="white" type="link" style={{ textAlign: "center" }}>
                {t("signin.signup")}
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
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
});
