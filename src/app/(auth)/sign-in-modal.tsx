import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Image } from "expo-image";
import ClearableTextInput from "../../components/shared/input/ClearableTextInput";
import PasswordInput from "../../components/shared/input/PasswordInput";
import CustomText from "../../components/shared/text/CustomText";
import { useCustomTheme } from "../../hooks/useCustomTheme";
import { useTranslation } from "react-i18next";

type Props = {};

const signInModal = ({}: Props) => {
  const { t } = useTranslation();

  const theme = useCustomTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.wrapper}>
      <View style={[styles.contentWrapper]}>
        <CustomText type="subtitle" style={{ textAlign: "center", fontFamily: "RubikWetPaint" }}>
          Type your email or username
        </CustomText>
        <ClearableTextInput
          value={email}
          onChangeText={setEmail}
          onSubmitEditing={() => void 0}
          placeholder="Email"
          keyboardType="email-address"
          useClearButton
        />
        <TouchableOpacity style={[styles.button]} activeOpacity={0.85} onPress={() => void 0}>
          <CustomText color="black" type="defaultSemiBold">
            {t("signin.continue")}
          </CustomText>
        </TouchableOpacity>
        {/* <PasswordInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
        ></PasswordInput> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: "black",
  },

  contentWrapper: {
    display: "flex",
    gap: 50,
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 80,
    borderRadius: 40,
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

export default signInModal;
