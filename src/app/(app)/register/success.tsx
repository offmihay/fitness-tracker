import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { Octicons } from "@expo/vector-icons";
import CustomText from "@/src/shared/text/CustomText";
import ButtonDefault from "@/src/shared/button/ButtonDefault";
import { router, useLocalSearchParams } from "expo-router";
import { t } from "i18next";

type Props = {};

const RegistrationSuccessScreen = (props: Props) => {
  const {} = props;
  const theme = useCustomTheme();
  const { id } = useLocalSearchParams();

  const returnBack = () => {
    router.dismissTo({
      pathname: `/home/${id}`,
    });
  };

  return (
    <View style={styles.wrapper}>
      <View>
        <Octicons name="check-circle-fill" size={100} color={theme.colors.success} />
      </View>
      <View className="mt-8">
        <CustomText center>{t("register.successMessage")}</CustomText>
      </View>
      <View className="mt-8 flex gap-4">
        <TouchableOpacity>
          <CustomText type="default" color={theme.colors.link} center>
            {t("register.addReminder")}
          </CustomText>
        </TouchableOpacity>
        <ButtonDefault
          onPress={returnBack}
          type="primary"
          title={t("register.goBack")}
          textColor={theme.dark ? "black" : "white"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 60,
    paddingBottom: 120,
  },
});

export default RegistrationSuccessScreen;
