import { Keyboard, StyleSheet, View } from "react-native";
import React, { useRef, useState } from "react";
import { Control, Controller, FieldPath, FieldValues, useFormContext } from "react-hook-form";
import DatePickerInput from "../input/DatePickerInput";
import CustomTextInput from "../input/CustomTextInput";
import DropdownModal, { DropdownModalProps } from "../modal/DropdownModal";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { PickerItemProps } from "@react-native-picker/picker";

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

  // const { watch, setValue } = useFormContext();

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handleOpenCameraModal = () => {
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
          return (
            <CustomTextInput
              ref={ref}
              disabled={true}
              label={label}
              value={value}
              onChangeText={onChange}
              returnKeyType="next"
              onSubmitEditing={onSubmitEditing}
              onPress={handleOpenCameraModal}
              isForceFocused={isOpen}
              {...inputProps}
            />
          );
        }}
      />
      <DropdownModal ref={bottomSheetRef} {...dropdownProps} onDismiss={onDismiss} />
    </>
  );
};

const styles = StyleSheet.create({});

export default RHFormDropdownInput;
