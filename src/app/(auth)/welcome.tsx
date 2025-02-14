import { useAuth, useOAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import BackgroundImage from "@/src/shared/image/BackgroundImage";
import FastImage from "@d11/react-native-fast-image";
import ButtonDefault from "@/src/shared/button/ButtonDefault";
import CustomText from "@/src/shared/text/CustomText";

const SignIn = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const googleOAuth = useOAuth({ strategy: "oauth_google" });
  const appleOAuth = useOAuth({ strategy: "oauth_apple" });

  const googleSignInMutation = useMutation({
    mutationFn: async () => {
      const oAuthFlow = await googleOAuth.startOAuthFlow();
      if (oAuthFlow.setActive && oAuthFlow.authSessionResult?.type === "success") {
        await oAuthFlow.setActive({ session: oAuthFlow.createdSessionId });
      } else {
        throw new Error("Failed to sign in with Google");
      }
    },
    onSuccess: () => {
      router.replace("/home");
    },
  });

  const appleSignInMutation = useMutation({
    mutationFn: async () => {
      const oAuthFlow = await appleOAuth.startOAuthFlow();
      if (oAuthFlow.setActive && oAuthFlow.authSessionResult?.type === "success") {
        await oAuthFlow.setActive({ session: oAuthFlow.createdSessionId });
      } else {
        throw new Error("Failed to sign in with Apple");
      }
    },
    onSuccess: () => {
      router.replace("/home");
    },
  });

  const googleSignIn = () => googleSignInMutation.mutate();
  const appleSignIn = () => appleSignInMutation.mutate();

  return (
    <BackgroundImage source={require("@/assets/imgs/signin-background2.jpg")}>
      {Platform.OS === "ios" && <StatusBar barStyle="light-content" />}
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.content}>
          <View className="flex flex-col gap-3">
            <ButtonDefault
              activeOpacity={0.85}
              onPress={googleSignIn}
              type="white"
              nodeLeft={() => (
                <FastImage
                  source={require("@/assets/imgs/google_icon.png")}
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
                <FastImage
                  source={require("@/assets/imgs/apple_icon.png")}
                  style={{ width: 20, height: 20 }}
                />
              )}
              title={t("signin.continueApple")}
            />
            <ButtonDefault
              type="darkgrey"
              activeOpacity={0.85}
              onPress={() => router.push("/sign-in")}
              nodeLeft={(color) => <Entypo name="mail" size={24} color={color} />}
              title={t("signin.continueEmail")}
            />

            <TouchableOpacity onPress={() => router.push("/sign-up")}>
              <CustomText color="white" type="link" style={{ textAlign: "center" }}>
                {t("signin.signup")}
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </BackgroundImage>
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
