import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import CustomText from "@/src/components/shared/text/CustomText";
import LayoutScrollView from "@/src/components/navigation/layouts/LayoutScrollView";

type Props = {};

const rules = ({}: Props) => {
  const { rules } = useLocalSearchParams();

  return (
    <LayoutScrollView name="rules">
      <View style={styles.wrapper}>
        <CustomText>{rules}</CustomText>
      </View>
    </LayoutScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default rules;
