import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";
import ButtonDefault from "@/src/shared/button/ButtonDefault";
import CustomText from "@/src/shared/text/CustomText";
import { WizardContext, WizardPreferences } from "@/src/components/wizard/WizardContext";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { router } from "expo-router";
import { TournamentSport } from "@/src/types/tournament";
import FilterItem from "@/src/components/home/filter/FilterItem";
import { t } from "i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WizardSportScreen = () => {
  const { updateWizardData } = useContext(WizardContext);
  const theme = useCustomTheme();

  const handleSkip = async () => {
    await AsyncStorage.setItem("wizardSeen", "true");
    router.replace("/welcome");
  };

  const [sport, setSport] = useState<WizardPreferences["featuredSport"]>([]);

  const sportList: TournamentSport[] = [
    TournamentSport.TABLE_TENNIS,
    TournamentSport.BADMINTON,
    TournamentSport.TENNIS,
    TournamentSport.SQUASH,
  ];

  const handlePress = () => {
    updateWizardData((prev) => ({ ...prev, featuredSport: sport }));
    router.navigate({ pathname: "./residence" });
  };

  const handleChooseSport = (item: TournamentSport) => {
    setSport((prev) => {
      if (prev) {
        if (prev.includes(item)) {
          return prev.filter((i) => i !== item);
        }
        return [...prev, item];
      } else {
        return [item];
      }
    });
  };

  return (
    <SafeAreaView className="flex-1">
      <View style={styles.wrapper}>
        <View style={styles.textSection}>
          <CustomText center type="subtitle">
            Which sports get you excited?
          </CustomText>
          <CustomText center type="subtitle">
            Pick your favorites, and we'll spotlight tournaments just for you!
          </CustomText>
        </View>
        <View style={styles.chooseSection}>
          <View className="flex flex-row flex-wrap gap-4">
            {sportList.map((item, index) => (
              <FilterItem
                key={index}
                label={t(`tournament.sportType.${item}`)}
                isSelected={sport?.includes(item) || false}
                onPress={() => handleChooseSport(item)}
              />
            ))}
          </View>
          <ButtonDefault title="Continue" onPress={handlePress} type="white" />
        </View>
        <TouchableOpacity style={styles.skipLabel}>
          <CustomText color={theme.colors.link} type="default" onPress={handleSkip}>
            Skip for now
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
    gap: 50,
  },

  skipLabel: {
    position: "absolute",
    top: 20,
    right: 20,
  },
});

export default WizardSportScreen;
