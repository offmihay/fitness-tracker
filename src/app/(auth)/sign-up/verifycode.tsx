import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSignUp } from "@clerk/clerk-expo";
import { useCustomTheme } from "../../../hooks/useCustomTheme";
import { Link, useRouter } from "expo-router";
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import { t } from "i18next";
import ClearableTextInput from "../../../components/shared/input/ClearableTextInput";
import CustomText from "../../../components/shared/text/CustomText";

type Props = {};

const SignUpPasseordScreen = ({}: Props) => {
  const router = useRouter();

  const { isLoaded, signUp, setActive } = useSignUp();
  const [code, setCode] = useState("");

  const [errors, setErrors] = useState<string[]>([]);

  const [secondsLeft, setSecondsLeft] = useState<number | null>(30);

  useEffect(() => {
    let intervalId: any;

    const resendTimer = () => {
      intervalId = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev !== null) {
            if (prev !== null && prev <= 1) {
              clearInterval(intervalId);
              return 0;
            }
            return prev - 1;
          } else {
            return null;
          }
        });
      }, 1000);
    };

    if (secondsLeft !== null && secondsLeft > 0) {
      resendTimer();
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [secondsLeft]);

  const handleResendCode = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setSecondsLeft(30);
    } catch (err) {
      setSecondsLeft(null);
      setErrors(["Unable to resend new code"]);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      const error = JSON.parse(JSON.stringify(err));
      if (error.clerkError) {
        setErrors(error.errors.map((err: any) => err.longMessage));
      }
    }
  };

  return (
    <View style={styles.wrapper}>
      <Pressable style={styles.backBtn} onPress={router.back}>
        <FontAwesome6 name="arrow-left-long" size={24} color="white" />
      </Pressable>

      <View style={styles.verificationWrapper}>
        <CustomText
          type="subtitle"
          style={{ textAlign: "center", fontFamily: "PlayBold", marginBottom: 50 }}
          color="white"
        >
          {t("signup.titleVerifyCode")}
        </CustomText>
        <View>
          <View className="relative">
            <ClearableTextInput
              value={code}
              placeholder="Code..."
              onChangeText={setCode}
              style={{ fontFamily: "PlayRegular" }}
              themeStyle="dark"
              keyboardType="number-pad"
            />
            {secondsLeft !== null && (
              <Text
                style={{
                  color: "white",
                  paddingLeft: 4,
                  paddingTop: 14,
                  fontFamily: "PlayRegular",
                }}
              >
                {`${t("signup.notReceiveCode")} `}
                <CustomText type="link" style={{ fontSize: 14 }}>
                  {`${t("signup.tryAgainIn")}: ${secondsLeft}`}
                </CustomText>
              </Text>
            )}
            <TouchableOpacity style={styles.button} activeOpacity={0.85} onPress={onPressVerify}>
              <CustomText color="white" style={{ fontFamily: "PlayBold" }}>
                {t("signup.complete")}
              </CustomText>
            </TouchableOpacity>
          </View>
          {secondsLeft === 0 && secondsLeft !== null && (
            <TouchableOpacity onPress={handleResendCode}>
              <CustomText
                color="white"
                style={{
                  fontSize: 14,
                  paddingLeft: 4,
                  fontFamily: "PlayRegular",
                  color: "#0082FF",
                }}
              >
                {t("signup.requestNewCode")}
              </CustomText>
            </TouchableOpacity>
          )}
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
  verificationWrapper: {
    marginTop: 150,
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
    bottom: -140,
  },

  backBtn: {
    position: "absolute",
    top: 80,
    left: 20,
    zIndex: 10,
  },
});

export default SignUpPasseordScreen;
