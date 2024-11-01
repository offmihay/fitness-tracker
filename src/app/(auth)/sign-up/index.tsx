import { View, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { t } from "i18next";

import { FontAwesome6 } from "@expo/vector-icons";
import ClearableTextInput from "../../../components/shared/input/ClearableTextInput";
import CustomText from "../../../components/shared/text/CustomText";
import { useMutation } from "@tanstack/react-query";
import DismissKeyboardView from "../../../components/shared/input/DissmissKeyboardView";
import { Image } from "expo-image";
import LottieView from "lottie-react-native";
import LoaderSVG from "@/src/svg-comps/Loader";

export default function SignUpEmailScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    setErrors([]);
  }, [emailAddress]);

  const signUpMutation = useMutation({
    mutationFn: (emailAddress: string) =>
      isLoaded
        ? signUp.create({
            emailAddress,
          })
        : Promise.resolve(undefined),
    onSuccess: () => {
      router.navigate({
        pathname: "/sign-up/password",
        params: { email: emailAddress },
      });
    },
    onError: (err: any) => {
      console.log(err.errors);
      if (err.clerkError) {
        setErrors(err.errors.map((err: any) => err.longMessage || err.message));
      }
    },
  });

  const onCheckUpEmail = () => signUpMutation.mutate(emailAddress);

  return (
    <DismissKeyboardView style={styles.wrapper}>
      <TouchableOpacity style={styles.backBtn} onPress={router.back}>
        <FontAwesome6 name="arrow-left-long" size={24} color="white" />
      </TouchableOpacity>

      <View style={[styles.contentWrapper]}>
        <CustomText
          type="subtitle"
          style={{ textAlign: "center", fontFamily: "PlayBold" }}
          color="white"
        >
          {t("signup.titleEmail")}
        </CustomText>
        <View className="w-full">
          <View className="flex flex-column gap-3 w-full relative">
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
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.85}
              onPress={onCheckUpEmail}
              disabled={signUpMutation.isPending}
            >
              <CustomText color="white" style={{ fontFamily: "PlayBold" }}>
                {t("signin.modal.continue")}
              </CustomText>
            </TouchableOpacity>
            w{/* <LoaderSVG /> */}
            {/* <LottieView source={require("../../../../assets/svg/loader.svg")} autoPlay loop /> */}
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
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: "#141414",
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
    bottom: -120,
  },

  backBtn: {
    position: "absolute",
    top: 80,
    left: 20,
    zIndex: 10,
  },
});
