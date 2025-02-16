import { StyleSheet, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import LayoutScrollView from "@/src/components/navigation/layouts/LayoutScrollView";
import CustomText from "@/src/shared/text/CustomText";

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
