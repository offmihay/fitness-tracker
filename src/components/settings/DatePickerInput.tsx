import React, { useState, forwardRef, useImperativeHandle } from "react";
import CustomTextInput from "../shared/input/CustomTextInput";
import { useTranslation } from "react-i18next";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Keyboard, Pressable, View } from "react-native";

type DatePickerInputProps = {
  label: string;
  value: string | Date;
  onChange: (date: Date) => void;
  selectedDate?: Date;
  onConfirm?: () => void;
  minimumDate?: Date;
  maximumDate?: Date;
};

export interface DatePickerInputRef {
  show: () => void;
}

const DatePickerInput = forwardRef<DatePickerInputRef, DatePickerInputProps>(
  ({ label, value, onChange, selectedDate, onConfirm, minimumDate, maximumDate }, ref) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const { i18n, t } = useTranslation();

    useImperativeHandle(ref, () => ({
      show: () => setDatePickerVisibility(true),
    }));

    const showDatePicker = () => {
      setDatePickerVisibility(true);
      Keyboard.dismiss();
    };

    const hideDatePicker = () => setDatePickerVisibility(false);

    const handleConfirm = (date: Date) => {
      onChange(date);
      hideDatePicker();
      onConfirm?.();
    };

    return (
      <View>
        <Pressable onPress={showDatePicker}>
          <CustomTextInput
            label={label}
            disabled
            onPress={showDatePicker}
            value={value instanceof Date ? value.toLocaleDateString(i18n.language) : value}
            useClearButton
          />
        </Pressable>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          locale={i18n.language}
          maximumDate={maximumDate}
          minimumDate={minimumDate}
          confirmTextIOS={t("common.confirm")}
          cancelTextIOS={t("common.cancel")}
          date={selectedDate || new Date()}
        />
      </View>
    );
  }
);

export default DatePickerInput;
