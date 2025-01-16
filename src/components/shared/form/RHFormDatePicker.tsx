import { StyleSheet } from "react-native";
import React from "react";
import { Control, Controller, FieldPath, FieldValues, useFormContext } from "react-hook-form";
import DatePickerInput from "../input/DatePickerInput";
import get from "lodash/get";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import CustomAnimatedView from "../view/CustomAnimatedView";
import ErrorAnimatedView from "../view/ErrorAnimatedView";

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
  const theme = useCustomTheme();

  const { formState } = useFormContext();
  const error = get(formState.errors, name);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value, ref } }) => {
        return (
          <>
            <CustomAnimatedView>
              <DatePickerInput
                ref={ref}
                label={label}
                value={value}
                onChange={onChange}
                selectedDate={value ? new Date(value) : new Date()}
                onConfirm={onSubmitEditing}
                inputProps={{
                  isError: !!error,
                }}
                {...datePickerProps}
              />
            </CustomAnimatedView>
            <ErrorAnimatedView message={error?.message?.toString()} />
          </>
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
