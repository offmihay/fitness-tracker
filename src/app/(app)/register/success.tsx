import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { Octicons } from "@expo/vector-icons";
import CustomText from "@/src/shared/text/CustomText";
import ButtonDefault from "@/src/shared/button/ButtonDefault";
import { router, useLocalSearchParams } from "expo-router";
import { t } from "i18next";
import useCreateNativeEvent from "@/src/hooks/useCreateNativeEvent";
import { getTournamentByID } from "@/src/queries/tournaments";
import * as Calendar from "expo-calendar";

const RegistrationSuccessScreen = () => {
  const { createEvent } = useCreateNativeEvent();
  const theme = useCustomTheme();
  const { id } = useLocalSearchParams();
  const { data: tournamentData } = getTournamentByID(id as string);

  const returnBack = () => {
    router.dismissTo({
      pathname: `/home/${id}`,
    });
  };

  const handleCreateEvent = () => {
    createEvent({
      startDate: tournamentData?.dateStart,
      endDate: tournamentData?.dateEnd,
      title: tournamentData?.title,
      location: tournamentData?.location,
      organizerEmail: tournamentData?.organizer.organizerEmail,
      notes: tournamentData?.description,
      status: Calendar.EventStatus.CONFIRMED,
      url: `selfsport.app/tournaments/${tournamentData.id}`,
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
        <TouchableOpacity onPress={handleCreateEvent}>
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
