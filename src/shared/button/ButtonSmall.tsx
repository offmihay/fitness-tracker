import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import CustomText from "../text/CustomText";
import CustomIcon from "../icon/CustomIcon";

type Props = {
  onPress?: () => void;
  title?: string;
  titleEnabled?: boolean;
  renderIcon?: (color: string, size: number) => React.ReactElement;
  textColor?: string;
  disabled?: boolean;
  disabledUI?: boolean;
  textProps?: React.ComponentProps<typeof CustomText>;
} & React.ComponentProps<typeof CustomText>;

const ButtonSmall = (props: Props) => {
  const {
    onPress,
    title,
    titleEnabled = true,
    renderIcon,
    style,
    textColor,
    disabled,
    disabledUI,
    textProps,
    ...rest
  } = props;
  const theme = useCustomTheme();

  const iconSize = 18;

  const colorOpacity =
    disabledUI && theme.dark ? "grey" : disabled && !theme.dark ? "#929292" : textColor;

  return (
    <TouchableOpacity
      style={[styles.btnWrapper, { backgroundColor: theme.colors.surface }, style]}
      onPress={onPress}
      activeOpacity={0.5}
      disabled={disabled}
      {...rest}
    >
      <View className="flex-1 flex flex-row gap-3 items-center justify-center">
        {title && titleEnabled && (
          <CustomText color={colorOpacity} {...textProps}>
            {title}
          </CustomText>
        )}
        {renderIcon && (
          <CustomIcon render={(color) => renderIcon(colorOpacity || color, iconSize)} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnWrapper: {
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 15,
    height: 40,
  },

  btnContent: {
    flex: 1,
    flexDirection: "row",
    gap: 4,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ButtonSmall;
