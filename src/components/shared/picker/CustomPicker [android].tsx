import React from "react";
import { Picker } from "@react-native-picker/picker";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { View, StyleSheet } from "react-native";

type PickerItemProps = React.ComponentProps<typeof Picker.Item>;

export type CustomPickerProps<T extends string> = {
  selectedValue: T;
  onValueChange: ((itemValue: T, itemIndex: number) => void) | undefined;
  items: Array<PickerItemProps & { value: T }>;
  selectAnLabel?: string;
};

function CustomPicker<T extends string>({
  selectedValue,
  onValueChange,
  items,
  selectAnLabel,
}: CustomPickerProps<T>) {
  const theme = useCustomTheme();
  return (
    <View style={[styles.pickerContainer, { borderColor: theme.colors.border }]}>
      <Picker
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
    </View>
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
