import React from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";

import ButtonAction from "../button/ButtonAction";
import CustomText from "../text/CustomText";

interface DatePickerModalProps {
  isVisible: boolean;
  onConfirm: (date: Date) => void;
  onCancel: () => void;
  onHide: () => void;
  label: string;
  selectedDate: Date;
  minimumDate?: Date;
  maximumDate?: Date;
}

const DatePickerModal: React.FC<DatePickerModalProps> = ({
  isVisible,
  onConfirm,
  onCancel,
  onHide,
  label,
  selectedDate,
  minimumDate,
  maximumDate,
}) => {
  const { i18n, t } = useTranslation();
  const theme = useCustomTheme();

  return (
    <DateTimePickerModal
      customHeaderIOS={() => (
        <View style={{ paddingTop: 10 }}>
          <CustomText center type="upperdefault" weight="bold">
            {label}
          </CustomText>
        </View>
      )}
      isVisible={isVisible}
      mode="date"
      onConfirm={onConfirm}
      onCancel={onCancel}
      onHide={onHide}
      locale={i18n.language}
      maximumDate={maximumDate}
      minimumDate={minimumDate}
      date={selectedDate}
      pickerContainerStyleIOS={{ backgroundColor: theme.colors.surfaceDark }}
      buttonTextColorIOS={theme.colors.link}
      customCancelButtonIOS={({ onPress }) => (
        <ButtonAction.Group>
          <ButtonAction onPress={onPress} title={t("common.cancel")} />
        </ButtonAction.Group>
      )}
      customConfirmButtonIOS={({ onPress }) => (
        <ButtonAction.Group>
          <View />
          <ButtonAction onPress={onPress} title={t("common.confirm")} />
        </ButtonAction.Group>
      )}
    />
  );
};

export default DatePickerModal;
