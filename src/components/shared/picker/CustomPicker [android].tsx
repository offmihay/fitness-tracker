import React from "react";
import { Picker } from "@react-native-picker/picker";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { View, StyleSheet } from "react-native";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";

type PickerItemProps = React.ComponentProps<typeof Picker.Item>;

export type CustomPickerProps<T extends string> = {
  selectedValue: T;
  onValueChange: ((itemValue: T, itemIndex: number) => void) | undefined;
  items: Array<PickerItemProps & { value: T }>;
  selectAnLabel?: string;
  isError?: boolean;
};

function CustomPicker<T extends string>({
  selectedValue,
  onValueChange,
  items,
  selectAnLabel,
  isError,
}: CustomPickerProps<T>) {
  const theme = useCustomTheme();
  const [focused, setFocused] = React.useState(false);

  const animatedWrapperStyle = useAnimatedStyle(() => ({
    borderColor: withTiming(
      isError ? theme.colors.error : focused ? theme.colors.link : theme.colors.border,
      {
        duration: 500,
      }
    ),
  }));

  return (
    <Animated.View
      style={[
        styles.pickerContainer,
        { borderColor: focused ? theme.colors.link : theme.colors.border },
        animatedWrapperStyle,
      ]}
    >
      <Picker
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        itemStyle={{
          color: theme.colors.text,
          width: "100%",
        }}
        mode="dropdown" // for Android
        style={{ padding: 0 }}
      >
        {selectAnLabel && (
          <Picker.Item label={selectAnLabel} value="" color={theme.colors.textTertiary} />
        )}
        {items.map((item, index) => (
          <Picker.Item key={index} {...item} />
        ))}
      </Picker>
    </Animated.View>
  );
}

export default CustomPicker;

const styles = StyleSheet.create({
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
    height: 50,
    paddingLeft: 10,
    display: "flex",
    justifyContent: "center",
  },
});
