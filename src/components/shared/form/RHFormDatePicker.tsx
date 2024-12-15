import { StyleSheet, View } from "react-native";
import React from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import DatePickerInput from "../input/DatePickerInput";

type Props<TFieldValues extends FieldValues> = {
  name: FieldPath<TFieldValues>;
  label: string;
  control: Control<TFieldValues>;
  rules?: any;
  onSubmitEditing?: () => void;
  datePickerProps?: Partial<React.ComponentProps<typeof DatePickerInput>>;
};

const RHFormDatePicker = <TFieldValues extends FieldValues>(props: Props<TFieldValues>) => {
  const { name, label, control, rules, onSubmitEditing, datePickerProps } = props;

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value, ref } }) => {
        return (
          <DatePickerInput
            ref={ref}
            label={label}
            value={value}
            onChange={onChange}
            selectedDate={value ? new Date(value) : new Date()}
            onConfirm={onSubmitEditing}
            {...datePickerProps}
          />
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});

export default RHFormDatePicker;
