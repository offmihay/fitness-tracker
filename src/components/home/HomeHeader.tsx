import { StyleSheet, TextInput, View } from "react-native";
import React, { useState } from "react";
import DismissKeyboardView from "../shared/view/DismissKeyboardView";
import SortModal from "./sort/SortModal";
import FilterModal from "./filter/FilterModal";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {};

const HomeHeader = (props: Props) => {
  const {} = props;

  const insets = useSafeAreaInsets();

  const theme = useCustomTheme();
  const [value, setValue] = useState("");
  return (
    <DismissKeyboardView style={{ width: "100%", paddingTop: insets.top }}>
      <View style={[styles.wrapper]}>
        <View style={{ ...styles.inputContainer, backgroundColor: theme.colors.surface }}>
          <TextInput
            placeholder="Search"
            style={[styles.input, { color: theme.colors.text }]}
            value={value}
            onChangeText={setValue}
          />
        </View>
      </View>
    </DismissKeyboardView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: 60,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
    display: "flex",
    justifyContent: "space-between",
  },

  inputContainer: {
    height: 35,
    borderRadius: 10,
  },

  input: { paddingHorizontal: 20, paddingVertical: 10, fontSize: 16 },
});

export default HomeHeader;
