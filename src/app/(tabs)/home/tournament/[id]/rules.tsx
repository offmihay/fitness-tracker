import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import CustomText from "@/src/components/shared/text/CustomText";

type Props = {};

const rules = ({}: Props) => {
  const { rules } = useLocalSearchParams();

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <CustomText>{rules}</CustomText>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

export default rules;
