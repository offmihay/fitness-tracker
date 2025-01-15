import { Keyboard, Platform, Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import { Control, Controller, FieldPath, FieldValues, useFormContext } from "react-hook-form";
import DatePickerInput from "../input/DatePickerInput";
import CustomTextInput from "../input/CustomTextInput";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { PickerItemProps } from "@react-native-picker/picker";
import CustomPicker from "../picker/CustomPicker [android]";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import get from "lodash/get";
import Animated, { LinearTransition } from "react-native-reanimated";
import CustomAnimatedView from "../view/CustomAnimatedView";
import ErrorAnimatedView from "../view/ErrorAnimatedView";
import DropdownInputModal, { DropdownModalProps } from "../modal/DropdownInputModal [ios]";
import DropdownInput from "../input/DropdownInput";

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

  const { formState } = useFormContext();
  const error = get(formState.errors, name);

  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, value, ref } }) => {
          return Platform.OS === "ios" ? (
            <>
              <CustomAnimatedView>
                <DropdownInput
                  ref={ref}
                  label={label}
                  value={value}
                  dropdownProps={dropdownProps}
                  onSubmitEditing={onSubmitEditing}
                />
                <ErrorAnimatedView message={!value ? error?.message?.toString() : ""} />
              </CustomAnimatedView>
            </>
          ) : Platform.OS === "android" ? (
            <CustomAnimatedView>
              <CustomPicker
                selectedValue={value}
                isError={!!error}
                onValueChange={(itemValue, itemIndex) => {
                  onChange(itemValue);
                  dropdownProps.onValueChange?.(itemValue, itemIndex);
                }}
                items={dropdownProps.items}
                selectAnLabel={dropdownProps.selectAnLabel}
              />
              <ErrorAnimatedView message={!value ? error?.message?.toString() : ""} />
            </CustomAnimatedView>
          ) : (
            <></>
          );
        }}
      />
    </>
  );
};

export default RHFormDropdownInput;
