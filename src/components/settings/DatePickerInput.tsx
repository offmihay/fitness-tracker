import React, { useState, forwardRef, useImperativeHandle, useRef } from "react";
import CustomTextInput from "../shared/input/CustomTextInput";
import { useTranslation } from "react-i18next";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Keyboard, Pressable, View, TextInput } from "react-native";
import CustomText from "../shared/text/CustomText";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";

type DatePickerInputProps = {
  label: string;
  value: string | Date;
  onChange: (date: Date) => void;
  selectedDate?: Date;
  onConfirm?: () => void;
  minimumDate?: Date;
  maximumDate?: Date;
  inputProps?: Partial<React.ComponentProps<typeof CustomTextInput>>;
};

export interface InputRef {
  focus: () => void;
}

const DatePickerInput = forwardRef<InputRef, DatePickerInputProps>(
  (
    { label, value, onChange, selectedDate, onConfirm, minimumDate, maximumDate, inputProps },
    ref
  ) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const { i18n, t } = useTranslation();
    const theme = useCustomTheme();

    const showDatePicker = () => {
      Keyboard.dismiss();
      setDatePickerVisibility(true);
    };

    const hideDatePicker = () => setDatePickerVisibility(false);

    const handleConfirm = (date: Date) => {
      onChange(date);
      hideDatePicker();
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

    return (
      <View>
        <Pressable onPress={showDatePicker}>
          <CustomTextInput
            selectTextOnFocus={false}
            label={label}
            onPress={showDatePicker}
            disabled
            value={formatDate(value)}
            isForceFocused={isDatePickerVisible}
            {...inputProps}
          />
        </Pressable>
        <DateTimePickerModal
          customHeaderIOS={() => (
            <View style={{ paddingTop: 10 }}>
              <CustomText center type="upperdefault" weight="bold">
                {label}
              </CustomText>
            </View>
          )}
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          onHide={handleAfterHide}
          locale={i18n.language}
          maximumDate={maximumDate}
          minimumDate={minimumDate}
          confirmTextIOS={t("common.confirm")}
          cancelTextIOS={t("common.cancel")}
          date={selectedDate || new Date()}
          pickerContainerStyleIOS={{ backgroundColor: theme.colors.surfaceDark }}
          buttonTextColorIOS={theme.colors.link}
        />
      </View>
    );
  }
);

export default DatePickerInput;
