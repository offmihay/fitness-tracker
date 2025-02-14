import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import CustomText from "@/src/shared/text/CustomText";
import { WizardContext, WizardPreferences } from "@/src/components/wizard/WizardContext";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { router } from "expo-router";
import GoogleAutoComplete, {
  PlaceObject,
} from "@/src/components/tournaments/choose-location/GoogleAutocomplete";
import { useUpdateUserMutation } from "@/src/queries/user";
import clerkTransformData from "@/src/utils/clerkTransformData";
import { useUser } from "@clerk/clerk-expo";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WizardResidenceScreen = () => {
  const theme = useCustomTheme();
  const { user } = useUser();
  const { setWizardData } = useContext(WizardContext);
  const updateUserMutation = useUpdateUserMutation();

  const handleGoToHome = async () => {
    await AsyncStorage.setItem("wizardSeen", "true");
    router.replace("/home");
  };

  const handleSelect = (location: PlaceObject) => {
    setWizardData((prev) => {
      const newWizardData = {
        ...prev,
        residencePlace: {
          city: location.address,
          geoCoordinates: {
            latitude: !isNaN(Number(location.latitude)) ? Number(location.latitude) : undefined,
            longitude: !isNaN(Number(location.longitude)) ? Number(location.longitude) : undefined,
          },
        },
      };

      uploadData(newWizardData);
      return newWizardData;
    });
  };

  const uploadData = (data: WizardPreferences) => {
    const formData = clerkTransformData(data, user?.unsafeMetadata || null);
    updateUserMutation.mutate(formData, {
      onSuccess: async () => {
        await handleGoToHome();
      },
    });
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
            <CustomText color={theme.colors.link} type="default" onPress={handleGoToHome}>
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
    // borderWidth: 1,
    // borderColor: "red",
  },

  buttonWrapper: {
    paddingTop: 10,
    paddingBottom: 120,
    paddingHorizontal: 20,
  },
});

export default WizardResidenceScreen;
