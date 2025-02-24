import React, { useState, forwardRef, useImperativeHandle, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Keyboard, Platform, Pressable, View } from "react-native";
import CustomTextInput from "./CustomTextInput";
import DatePickerModal from "../modal/DatePickerModal";

type DatePickerInputProps = {
  label?: string;
  value: string | Date;
  onChange: (date: Date) => void;
  selectedDate?: Date;
  onConfirm?: () => void;
  minimumDate?: Date;
  maximumDate?: Date;
  inputProps?: Partial<React.ComponentProps<typeof CustomTextInput>>;
  renderTrigger?: (props: { onPress: () => void; value: string; label?: string }) => ReactNode;
  isDisabled?: boolean;
  mode?: React.ComponentProps<typeof DatePickerModal>["mode"];
};

export interface InputRef {
  focus: () => void;
}

const DatePickerInput = forwardRef<InputRef, DatePickerInputProps>(
  (
    {
      label,
      value,
      onChange,
      selectedDate,
      onConfirm,
      minimumDate,
      maximumDate,
      inputProps,
      renderTrigger,
      isDisabled = false,
      mode,
    },
    ref
  ) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const { i18n } = useTranslation();

    const showDatePicker = () => {
      if (!isDisabled) {
        Keyboard.dismiss();
        setDatePickerVisibility(true);
      }
    };

    const hideDatePicker = () => setDatePickerVisibility(false);

    const handleConfirm = (date: Date) => {
      hideDatePicker();
      onChange(date);
      setIsConfirmed(true);
    };

    useImperativeHandle(ref, () => ({
      focus: () => {
        showDatePicker();
      },
    }));

    const handleAfterHide = () => {
      setTimeout(() => {
        if (isConfirmed) {
          setIsConfirmed(false);
          onConfirm?.();
        }
      }, 0);
    };

    const formatDate = (date: string | Date): string => {
      const parsedDate = new Date(date);
      return isNaN(parsedDate.getTime()) ? "" : parsedDate.toLocaleDateString(i18n.language);
    };

    const formattedValue = formatDate(value);

    const renderDefaultTrigger = () => (
      <CustomTextInput
        selectTextOnFocus={false}
        label={label}
        onPress={showDatePicker}
        disabled
        value={formattedValue}
        isForceFocused={isDatePickerVisible}
        {...inputProps}
      />
    );

    return (
      <View>
        <Pressable onPress={Platform.OS === "android" ? showDatePicker : void 0}>
          {renderTrigger
            ? renderTrigger({ onPress: showDatePicker, value: formattedValue, label })
            : renderDefaultTrigger()}
        </Pressable>
        <DatePickerModal
          isVisible={isDatePickerVisible}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          onHide={handleAfterHide}
          label={label || ""}
          selectedDate={selectedDate || new Date()}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          mode={mode}
        />
      </View>
    );
  }
);

export default DatePickerInput;
