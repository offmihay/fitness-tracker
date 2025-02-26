import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import CustomText from "@/src/shared/text/CustomText";
import { WizardContext, WizardPreferences } from "@/src/components/wizard/WizardContext";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { router } from "expo-router";
import GoogleAutoComplete, {
  PlaceObject,
} from "@/src/components/tournaments/choose-location/GoogleAutocomplete";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WizardResidenceScreen = () => {
  const theme = useCustomTheme();
  const { updateWizardData } = useContext(WizardContext);

  const handleGoToAuth = async () => {
    await AsyncStorage.setItem("wizardSeen", "true");
    router.replace("/welcome");
  };

  const handleSelect = async (location: PlaceObject) => {
    updateWizardData((prev) => {
      const latitude = !isNaN(Number(location.latitude)) ? Number(location.latitude) : undefined;
      const longitude = !isNaN(Number(location.longitude)) ? Number(location.longitude) : undefined;

      const newWizardData = {
        ...prev,
        residencePlace: {
          city: location.address,
          ...(latitude !== undefined && longitude !== undefined
            ? { geoCoordinates: { latitude, longitude } }
            : {}),
        },
      };

      uploadData(newWizardData);
      return newWizardData;
    });
    await handleGoToAuth();
  };

  const uploadData = async (data: WizardPreferences) => {
    await AsyncStorage.setItem("wizardData", JSON.stringify(data));
  };

  return (
    <>
      <SafeAreaView className="flex-1">
        <View style={styles.wrapper}>
          <View>
            <CustomText center type="subtitle">
              Share your residence city so we can recommend tournaments near you!
            </CustomText>
          </View>

          <View style={styles.autoCompleteSection}>
            <GoogleAutoComplete onSubmit={handleSelect} query={{ type: "(cities)" }} maxRows={4} />
          </View>
          <TouchableOpacity style={styles.skipLabel}>
            <CustomText color={theme.colors.link} type="default" onPress={handleGoToAuth}>
              Skip for now
            </CustomText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 200,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    gap: 20,
  },

  skipLabel: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  autoCompleteSection: {
    width: "100%",
    height: 350,
  },

  buttonWrapper: {
    paddingTop: 10,
    paddingBottom: 120,
    paddingHorizontal: 20,
  },
});

export default WizardResidenceScreen;
