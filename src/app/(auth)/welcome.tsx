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
import BackgroundImage from "@/src/shared/image/BackgroundImage";
import FastImage from "@d11/react-native-fast-image";
import ButtonDefault from "@/src/shared/button/ButtonDefault";
import CustomText from "@/src/shared/text/CustomText";
import { useWarmUpBrowser } from "@/src/hooks/useWarmUpBrowser";
import { useAppleOAuthMutation, useGoogleOAuthMutation } from "@/src/queries/oauth";

const SignIn = () => {
  useWarmUpBrowser();
  const { t } = useTranslation();
  const router = useRouter();
  const googleOAuthMutation = useGoogleOAuthMutation();
  const appleOAuthMutation = useAppleOAuthMutation();

  const handleGoogleSignIn = () =>
    googleOAuthMutation.mutate(undefined, {
      onSuccess: () => {
        router.replace("/home");
      },
    });
  const handleAppleSignIn = () =>
    appleOAuthMutation.mutate(undefined, {
      onSuccess: () => {
        router.replace("/home");
      },
    });

  return (
    <BackgroundImage source={require("@/assets/imgs/signin-background2.jpg")}>
      {Platform.OS === "ios" && <StatusBar barStyle="light-content" />}
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.content}>
          <View className="flex flex-col gap-3">
            <ButtonDefault
              activeOpacity={0.85}
              onPress={handleGoogleSignIn}
              type="white"
              nodeLeft={() => (
                <FastImage
                  source={require("@/assets/imgs/google_icon.png")}
                  style={{ width: 20, height: 20 }}
                />
              )}
              title={t("signin.continueGoogle")}
            />
            {Platform.OS === "ios" && (
              <ButtonDefault
                activeOpacity={0.85}
                onPress={handleAppleSignIn}
                type="white"
                nodeLeft={() => (
                  <FastImage
                    source={require("@/assets/imgs/apple_icon.png")}
                    style={{ width: 20, height: 20 }}
                  />
                )}
                title={t("signin.continueApple")}
              />
            )}
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
