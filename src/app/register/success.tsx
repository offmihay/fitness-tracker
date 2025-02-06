import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { Octicons } from "@expo/vector-icons";
import CustomText from "@/src/shared/text/CustomText";
import ButtonDefault from "@/src/shared/button/ButtonDefault";
import { router, useLocalSearchParams } from "expo-router";

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
        <CustomText center>You succesfully registred for this tournament!</CustomText>
      </View>
      <View className="mt-8 flex gap-4">
        <TouchableOpacity>
          <CustomText type="default" color={theme.colors.link} center>
            Add Reminder to Calendar
          </CustomText>
        </TouchableOpacity>
        <ButtonDefault
          onPress={returnBack}
          type="primary"
          title="Go Back to Tournament"
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
