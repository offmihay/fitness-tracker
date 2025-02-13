import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import ButtonSmall from "@/src/shared/button/ButtonSmall";
import { Ionicons } from "@expo/vector-icons";
import CheckboxDropdownMenu from "@/src/shared/dropdown/CheckboxDropdownMenu";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import { fetchStoredFilter } from "../storedSettings";
import { SortValueHome } from "../types";

type Props = {
  value: SortValueHome | null;
  onConfirm?: (value: SortValueHome | null) => void;
  disabled?: boolean;
};
const SortDropdown = (props: Props) => {
  const { value, onConfirm, disabled } = props;

  const { t } = useTranslation("", { keyPrefix: "home.sort" });

  const theme = useCustomTheme();

  const handleChoose = async (value: SortValueHome) => {
    onConfirm?.(value);
  };

  const sortOptions: SortValueHome[] = [
    SortValueHome.Newest,
    SortValueHome.Upcoming,
    SortValueHome.PrizePool,
    SortValueHome.Distance,
  ];

  const dropdownItems = sortOptions.map((option) => ({
    key: option,
    title: t(option),
    isSelected: value === option,
    onPress: () => handleChoose(option),
    disabled: disabled,
  }));

  return (
    <CheckboxDropdownMenu items={dropdownItems}>
      <ButtonSmall
        disabled={disabled}
        title={(value && !disabled && t(value)) || t("title")}
        renderIcon={(color, size) => (
          <Ionicons name="chevron-down-outline" size={size} color={color} style={{ bottom: -1 }} />
        )}
        style={{
          backgroundColor: !disabled && value ? theme.colors.primary : theme.colors.surface,
        }}
        textColor={!disabled ? "white" : theme.colors.text}
      />
    </CheckboxDropdownMenu>
  );
};

const styles = StyleSheet.create({
  modalWrapper: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
});

export default SortDropdown;
