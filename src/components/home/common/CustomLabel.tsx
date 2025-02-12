import { StyleSheet, View, ViewStyle } from "react-native";
import React from "react";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { useTranslation } from "react-i18next";
import CustomText from "@/src/shared/text/CustomText";

type Props = {
  value: string;
  icon: React.ReactNode;
  color?: string;
  textColor?: string;
  style?: ViewStyle;
};

const CustomLabel = (props: Props) => {
  const { value, icon, color, textColor, style } = props;
  const theme = useCustomTheme();

  return (
    <View className="flex flex-row">
      <View style={[styles.wrapper, { backgroundColor: color || theme.colors.primary }, style]}>
        {icon}
        <CustomText type="predefault" numberOfLines={1} color={textColor || "white"}>
          {value}
        </CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    maxHeight: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
  },
});

export default CustomLabel;
