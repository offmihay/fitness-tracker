import { Control, Controller, FieldPath, FieldValues, useFormContext } from "react-hook-form";
import CustomTextInput from "../input/CustomTextInput";
import get from "lodash/get";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import CustomAnimatedView from "../view/CustomAnimatedView";
import ErrorAnimatedView from "../view/ErrorAnimatedView";
import React from "react";

type Props<TFieldValues extends FieldValues> = {
  name: FieldPath<TFieldValues>;
  label: string;
  control: Control<TFieldValues>;
  rules?: any;
  inputProps?: Partial<React.ComponentProps<typeof CustomTextInput>>;
  onSubmitEditing?: () => void;
};

const RHFormInput = <TFieldValues extends FieldValues>(props: Props<TFieldValues>) => {
  const { name, label, control, rules, onSubmitEditing, inputProps } = props;
  const theme = useCustomTheme();

  const { formState } = useFormContext();
  const error = get(formState.errors, name);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value, ref, onBlur } }) => {
        let inputValue = typeof value === "number" ? value.toString() : value;
        return (
          <>
            <CustomAnimatedView>
              <CustomTextInput
                ref={ref}
                label={label}
                value={inputValue}
                onChangeText={onChange}
                onBlur={onBlur}
                returnKeyType="next"
                onSubmitEditing={onSubmitEditing}
                useClearButton={true}
                isError={!!error}
                {...inputProps}
              />
            </CustomAnimatedView>
            <ErrorAnimatedView message={error?.message?.toString()} />
          </>
        );
      }}
    />
  );
};

export default RHFormInput;
