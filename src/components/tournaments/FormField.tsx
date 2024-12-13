import { Control, Controller, FieldPath, FieldValues, useFormContext } from "react-hook-form";
import CustomTextInput from "../shared/input/CustomTextInput";
import { Tournament } from "@/src/types/Tournament";
import { KeyboardTypeOptions, TextInput } from "react-native";
import { forwardRef } from "react";
import DatePickerInput from "../settings/DatePickerInput";

type FormFieldProps<TFieldValues extends FieldValues> = {
  name: FieldPath<TFieldValues>;
  label: string;
  control: Control<TFieldValues>;
  rules?: any;
  keyboardType?: KeyboardTypeOptions | undefined;
  nextName?: FieldPath<TFieldValues>;
  onSubmitEditing?: () => void;
};

const FormField = <TFieldValues extends FieldValues>(props: FormFieldProps<TFieldValues>) => {
  const { name, label, control, rules, keyboardType, onSubmitEditing } = props;

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value, ref } }) => {
        const inputValue = typeof value === "number" ? value.toString() : value;
        return (
          <CustomTextInput
            ref={ref}
            label={label}
            value={inputValue}
            onChangeText={onChange}
            keyboardType={keyboardType}
            returnKeyType="next"
            onSubmitEditing={onSubmitEditing}
          />
        );
      }}
    />
  );
};

type FormFieldDateProps = {
  name: string;
  label: string;
  control: Control<Tournament, any>;
  rules?: any;
  minimumDate?: Date;
  maximumDate?: Date;
  onSubmitEditing: () => void;
};

type DatePickerInputRef = typeof DatePickerInput;

const FormFieldDate = forwardRef<DatePickerInputRef, FormFieldDateProps>(
  (
    { name, label, control, rules, onSubmitEditing, minimumDate, maximumDate }: FormFieldDateProps,
    ref
  ) => (
    <Controller
      control={control}
      name={name as keyof Tournament}
      rules={rules}
      render={({ field: { onChange, value } }) => (
        <DatePickerInput
          //   ref={ref}
          label={label}
          value={value as string}
          onChange={onChange}
          selectedDate={value instanceof Date ? value : new Date(value as string)}
          minimumDate={minimumDate}
          //   maximumDate={maximumDate}
        />
      )}
    />
  )
);

export default FormField;
