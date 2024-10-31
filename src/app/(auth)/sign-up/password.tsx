import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSignUp } from "@clerk/clerk-expo";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCustomTheme } from "../../../hooks/useCustomTheme";
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import { t } from "i18next";
import PasswordInput from "../../../components/shared/input/PasswordInput";
import CustomText from "../../../components/shared/text/CustomText";

type Props = {};

const SignUpPasswordScreen = ({}: Props) => {
  const { email } = useLocalSearchParams();
  const router = useRouter();

  const { isLoaded, signUp, setActive } = useSignUp();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    errors.length !== 0 && setErrors([]);
  }, [password, passwordConfirm]);

  const onSignUpPress = async () => {
    if (password === passwordConfirm) {
      if (!isLoaded) {
        return;
      }
      try {
        await signUp.create({
          emailAddress: email as string,
          password,
        });

        await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

        router.navigate({
          pathname: "/sign-up/verifycode",
        });
        // setPendingVerification(true);
      } catch (err: any) {
        const error = JSON.parse(JSON.stringify(err));
        if (error.clerkError) {
          setErrors(error.errors.map((err: any) => err.longMessage));
        }
      }
    } else {
      setErrors(["Passwords not matching."]);
    }
  };

  const [elementHeight, setElementHeight] = useState(0);

  return (
    <View style={styles.wrapper}>
      <Pressable style={styles.backBtn} onPress={router.back}>
        <FontAwesome6 name="arrow-left-long" size={24} color="white" />
      </Pressable>
      <View style={[styles.contentWrapper]}>
        <CustomText
          type="subtitle"
          style={{ textAlign: "center", fontFamily: "PlayBold" }}
          color="white"
        >
          {t("signup.titlePassword")}
        </CustomText>
        <View className="w-full">
          <View className="flex flex-column gap-5 w-full relative">
            <PasswordInput
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              style={{ fontFamily: "PlayRegular" }}
              themeStyle="dark"
            ></PasswordInput>
            <PasswordInput
              value={passwordConfirm}
              onChangeText={setPasswordConfirm}
              placeholder="Confirm Password"
              style={{ fontFamily: "PlayRegular" }}
              themeStyle="dark"
            ></PasswordInput>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.85}
              onPress={() => onSignUpPress()}
            >
              <CustomText color="white" style={{ fontFamily: "PlayBold" }}>
                {t("signin.modal.continue")}
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
    </View>
  );
};

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
    marginTop: 100,
    gap: 40,
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
    bottom: -130,
  },

  backBtn: {
    position: "absolute",
    top: 80,
    left: 20,
    zIndex: 10,
  },
});

export default SignUpPasswordScreen;
