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
import Loader from "@/src/components/shared/loader/Loader";
import TouchablePrimary from "@/src/components/shared/touchable/TouchablePrimary";
import TouchableBack from "@/src/components/shared/touchable/TouchableBack";

export default function SignUpEmailScreen() {
  const { isLoaded, signUp } = useSignUp();
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
      if (err.clerkError) {
        setErrors(err.errors.map((err: any) => err.longMessage || err.message));
      }
    },
  });

  const onCheckUpEmail = () => signUpMutation.mutate(emailAddress);

  return (
    <DismissKeyboardView style={styles.wrapper}>
      <TouchableBack />
      <View style={[styles.contentWrapper]}>
        <CustomText type="subtitle" color="white" center>
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
              style={{ color: "white" }}
              themeStyle="dark"
            />
            <TouchablePrimary
              className="absolute bottom-[-150]"
              onPress={onCheckUpEmail}
              loading={signUpMutation.isPending}
            >
              <CustomText type="defaultSemiBold" color="white">
                {t("signin.modal.continue")}
              </CustomText>
            </TouchablePrimary>
          </View>
          <CustomText color="red" className="ml-2 mt-1">
            {errors.map((err) => t(`errors.${err}`))}
          </CustomText>
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
});
