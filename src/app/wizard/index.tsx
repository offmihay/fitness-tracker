import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import CustomText from "@/src/shared/text/CustomText";
import ButtonDefault from "@/src/shared/button/ButtonDefault";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { WizardContext, WizardPreferences } from "@/src/components/wizard/WizardContext";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { t } from "i18next";

const WizardWelcomeScreen = () => {
  const { updateWizardData } = useContext(WizardContext);

  const theme = useCustomTheme();

  const handleChoose = (type: WizardPreferences["role"]) => {
    updateWizardData((prev) => ({ ...prev, role: type }));
    router.navigate({ pathname: "./sport-featured" }, { relativeToDirectory: true });
  };

  const handleSkip = async () => {
    await AsyncStorage.setItem("wizardSeen", "true");
    router.replace("/welcome");
  };

  return (
    <SafeAreaView className="flex-1">
      <View style={styles.wrapper}>
        <View style={styles.textSection}>
          <CustomText center type="subtitle">
            {t("wizard.welcome")}
          </CustomText>
          <CustomText center type="subtitle">
            {t("wizard.getStarted")}
          </CustomText>
        </View>
        <View style={styles.chooseSection}>
          <ButtonDefault
            title="Create tournaments"
            type="white"
            onPress={() => handleChoose("organizer")}
          />
          <ButtonDefault title="Find tournaments" onPress={() => handleChoose("participant")} />
        </View>
        <TouchableOpacity style={styles.skipLabel} onPress={handleSkip}>
          <CustomText color={theme.colors.link} type="default">
            {t("wizard.skip")}
          </CustomText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    paddingBottom: 100,
  },

  textSection: {
    marginBottom: 50,
  },

  chooseSection: {
    display: "flex",
    gap: 20,
  },

  skipLabel: {
    position: "absolute",
    top: 20,
    right: 20,
  },
});

export default WizardWelcomeScreen;
