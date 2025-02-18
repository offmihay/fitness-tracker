import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import DismissKeyboardView from "../../shared/view/DismissKeyboardView";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Divider } from "react-native-paper";
import { t, use } from "i18next";
import CustomText from "@/src/shared/text/CustomText";
import CustomAnimatedView from "@/src/shared/view/CustomAnimatedView";
import {
  BounceInRight,
  Easing,
  FadeInRight,
  FadeOutRight,
  LinearTransition,
  SlideInRight,
  SlideOutRight,
} from "react-native-reanimated";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

const HomeHeader = (props: Props) => {
  const { value, onChangeText } = props;
  const insets = useSafeAreaInsets();
  const theme = useCustomTheme();
  const ref = React.useRef<TextInput>(null);

  const [isFocused, setIsFocused] = useState(false);
  const handleCancel = () => {
    ref.current?.blur();
    setIsFocused(false);
    onChangeText("");
  };
  return (
    <DismissKeyboardView style={{ width: "100%", paddingTop: insets.top }}>
      <View style={[styles.wrapper]}>
        <View style={styles.inputWrapper}>
          <CustomAnimatedView
            style={{
              ...styles.inputContainer,
              backgroundColor: theme.colors.surface,
              width: isFocused || value ? "80%" : "100%",
            }}
            layout={LinearTransition.duration(250)}
          >
            <TextInput
              ref={ref}
              placeholder={t("common.search")}
              placeholderTextColor={theme.colors.text}
              style={[styles.input, { color: theme.colors.text }]}
              value={value}
              onChangeText={onChangeText}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              returnKeyType="search"
            />
          </CustomAnimatedView>
          <CustomAnimatedView layout={LinearTransition.duration(250)}>
            <TouchableOpacity onPress={handleCancel}>
              <CustomText color={theme.colors.link}>Cancel</CustomText>
            </TouchableOpacity>
          </CustomAnimatedView>
        </View>
      </View>
      <Divider />
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
    overflow: "hidden",
  },

  inputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 21,
  },

  inputContainer: {
    height: 40,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },

  input: { paddingHorizontal: 20, paddingVertical: 10, fontSize: 16, flex: 1 },
});

export default HomeHeader;
