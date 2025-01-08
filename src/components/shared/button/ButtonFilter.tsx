import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import CustomText from "../text/CustomText";
import CustomIcon from "../icon/CustomIcon";

type Props = {
  onPress?: () => void;
  label: string;
  renderIcon?: (color: string, size: number) => React.ReactElement;
};

const ButtonFilter = (props: Props) => {
  const { onPress, label, renderIcon } = props;
  const theme = useCustomTheme();

  const iconSize = 18;

  return (
    <View>
      <TouchableOpacity
        style={[styles.btnWrapper, { backgroundColor: theme.colors.surface }]}
        onPress={onPress}
        activeOpacity={0.5}
      >
        <View className="flex flex-row gap-3 items-center justify-center">
          <CustomText>{label}</CustomText>
          {renderIcon && <CustomIcon render={(color) => renderIcon(color, iconSize)} />}
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
