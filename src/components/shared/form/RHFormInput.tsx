import { Control, Controller, FieldPath, FieldValues, useFormContext } from "react-hook-form";
import CustomTextInput from "../input/CustomTextInput";

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

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value, ref, onBlur } }) => {
        const inputValue = typeof value === "number" ? value.toString() : value;
        return (
          <CustomTextInput
            ref={ref}
            label={label}
            value={inputValue}
            onChangeText={onChange}
            onBlur={onBlur}
            returnKeyType="next"
            onSubmitEditing={onSubmitEditing}
            {...inputProps}
          />
        );
      }}
    />
  );
};

export default RHFormInput;
