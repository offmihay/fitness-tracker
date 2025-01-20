import { Platform } from "react-native";
import React from "react";
import { Control, Controller, FieldPath, FieldValues, useFormContext } from "react-hook-form";
import get from "lodash/get";
import CustomTextInput from "../input/CustomTextInput";
import DropdownInput from "../input/DropdownInput";
import { DropdownModalProps } from "../modal/DropdownInputModal [ios]";
import CustomPicker from "../picker/CustomPicker [android]";
import CustomAnimatedView from "../view/CustomAnimatedView";
import ErrorAnimatedView from "../view/ErrorAnimatedView";

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
                  inputProps={{
                    isError: !!error && !value,
                    ...inputProps,
                  }}
                />
              </CustomAnimatedView>
              <ErrorAnimatedView message={!value ? error?.message?.toString() : ""} />
            </>
          ) : Platform.OS === "android" ? (
            <>
              <CustomAnimatedView>
                <CustomPicker
                  label={label}
                  selectedValue={value}
                  isError={!!error}
                  onValueChange={(itemValue, itemIndex) => {
                    onChange(itemValue);
                    dropdownProps.onValueChange?.(itemValue, itemIndex);
                  }}
                  items={dropdownProps.items}
                  selectAnLabel={dropdownProps.selectAnLabel}
                />
              </CustomAnimatedView>
              <ErrorAnimatedView message={!value ? error?.message?.toString() : ""} />
            </>
          ) : (
            <></>
          );
        }}
      />
    </>
  );
};

export default RHFormDropdownInput;
