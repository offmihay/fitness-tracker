import React, { useState } from "react";
import { Pressable, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ClearableTextInput from "../shared/input/ClearableTextInput";

type DatePickerInputProps = {
  label: string;
  value: string;
  onChange: (date: Date) => void;
};

const DatePickerInput: React.FC<DatePickerInputProps> = ({ label, value, onChange }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (date: Date) => {
    onChange(date);
    hideDatePicker();
  };

  return (
    <View>
      <Pressable onPress={showDatePicker}>
        <ClearableTextInput
          label={label}
          disabled
          onPressIn={showDatePicker}
          value={value ? new Date(value).toLocaleDateString() : ""}
          useClearButton
        />
      </Pressable>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default DatePickerInput;
