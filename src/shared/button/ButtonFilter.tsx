import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import CustomText from "../text/CustomText";
import CustomIcon from "../icon/CustomIcon";

type Props = {
  onPress?: () => void;
  label: string;
  renderIcon?: (color: string, size: number) => React.ReactElement;
  textColor?: string;
} & React.ComponentProps<typeof TouchableOpacity>;

const ButtonFilter = (props: Props) => {
  const { onPress, label, renderIcon, style, textColor, ...rest } = props;
  const theme = useCustomTheme();

  const iconSize = 18;

  return (
    <View>
      <TouchableOpacity
        style={[styles.btnWrapper, { backgroundColor: theme.colors.surface }, style]}
        onPress={onPress}
        activeOpacity={0.5}
        {...rest}
      >
        <View className="flex flex-row gap-3 items-center justify-center">
          <CustomText color={textColor}>{label}</CustomText>
          {renderIcon && (
            <CustomIcon render={(color) => renderIcon(textColor || color, iconSize)} />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btnWrapper: {
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 15,
  },

  btnContent: {
    flex: 1,
    flexDirection: "row",
    gap: 4,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ButtonFilter;
