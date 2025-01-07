import { Keyboard, Platform, Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import { Control, Controller, FieldPath, FieldValues, useFormContext } from "react-hook-form";
import DatePickerInput from "../input/DatePickerInput";
import CustomTextInput from "../input/CustomTextInput";
import DropdownModal, { DropdownModalProps } from "../modal/DropdownModal [ios]";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { PickerItemProps } from "@react-native-picker/picker";
import CustomPicker from "../picker/CustomPicker [android]";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";

type Props<TFieldValues extends FieldValues, T extends string> = {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  rules?: any;
  onSubmitEditing?: () => void;
  inputProps?: Partial<React.ComponentProps<typeof CustomTextInput>>;
  dropdownProps: DropdownModalProps<T>;
};

const RHFormDropdownInput = <TFieldValues extends FieldValues, T extends string>(
  props: Props<TFieldValues, T>
) => {
  const { control, name, label, rules, onSubmitEditing, inputProps, dropdownProps } = props;

  const [isOpen, setOpen] = useState(false);

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handleOpenModal = () => {
    Keyboard.dismiss();
    bottomSheetRef.current?.present();
    setOpen(true);
  };

  const onDismiss = () => {
    setOpen(false);
  };

  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, value, ref } }) => {
          return Platform.OS === "ios" ? (
            <CustomTextInput
              ref={ref}
              disabled={true}
              label={label}
              value={value}
              onChangeText={onChange}
              returnKeyType="next"
              onSubmitEditing={onSubmitEditing}
              onPress={handleOpenModal}
              isForceFocused={isOpen}
              {...inputProps}
            />
          ) : Platform.OS === "android" ? (
            <CustomPicker
              selectedValue={value}
              onValueChange={(itemValue, itemIndex) => {
                onChange(itemValue);
                dropdownProps.onValueChange?.(itemValue, itemIndex);
              }}
              items={dropdownProps.items}
              selectAnLabel={dropdownProps.selectAnLabel}
            />
          ) : (
            <></>
          );
        }}
      />
      {Platform.OS === "ios" && (
        <DropdownModal ref={bottomSheetRef} {...dropdownProps} onDismiss={onDismiss} />
      )}
    </>
  );
};

export default RHFormDropdownInput;
