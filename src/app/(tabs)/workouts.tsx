import { Appearance, Button, StyleSheet, Text, useColorScheme, View } from "react-native";
import React, { useState } from "react";
import { useSettings } from "../../hooks/useSettings";
import { TextInput } from "react-native-paper";
import ClearableTextInput from "../../components/shared/input/ClearableTextInput";
import CustomText from "../../components/shared/text/CustomText";
import PasswordInput from "../../components/shared/input/PasswordInput";

type Props = {};

const Workouts = ({}: Props) => {
  const { settings, updateSettings } = useSettings();

  const [text, setText] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.wrapper}>
      <View className="flex gap-4">
        <ClearableTextInput
          value={text}
          onChangeText={setText}
          placeholder="Email"
          keyboardType="email-address"
        />
        <PasswordInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
        ></PasswordInput>
      </View>
    </View>
  );
};

export default Workouts;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});
