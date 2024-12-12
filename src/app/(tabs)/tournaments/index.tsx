import { StyleSheet, View } from "react-native";
import React from "react";
import CustomText from "@/src/components/shared/text/CustomText";
type Props = {};

const Workouts = ({}: Props) => {
  return (
    <>
      <View style={styles.wrapper}>
        <CustomText>asd</CustomText>
      </View>
    </>
  );
};

export default Workouts;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
