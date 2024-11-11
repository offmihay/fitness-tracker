import React, { useState } from "react";
import { Keyboard, Pressable, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CustomTextInput from "../shared/input/CustomTextInput";
import { useTranslation } from "react-i18next";

type DatePickerInputProps = {
  label: string;
  value: string;
  onChange: (date: Date) => void;
};

const DatePickerInput: React.FC<DatePickerInputProps> = ({ label, value, onChange }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const { i18n, t } = useTranslation();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
    Keyboard.dismiss();
  };
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (date: Date) => {
    onChange(date);
    hideDatePicker();
  };

  return (
    <View>
      <Pressable onPress={showDatePicker}>
        <CustomTextInput
          label={label}
          disabled
          onPressIn={showDatePicker}
          value={value ? new Date(value).toLocaleDateString(i18n.language) : ""}
          useClearButton
        />
      </Pressable>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        locale={i18n.language}
        maximumDate={new Date()}
        minimumDate={new Date(new Date().getFullYear() - 100, 0, 1)}
        confirmTextIOS={t("common.confirm")}
        cancelTextIOS={t("common.cancel")}
      />
    </View>
  );
};

export default DatePickerInput;
