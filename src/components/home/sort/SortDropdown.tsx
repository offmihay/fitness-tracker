import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import ButtonSmall from "@/src/shared/button/ButtonSmall";
import { Ionicons } from "@expo/vector-icons";
import CheckboxContextMenu from "@/src/shared/context-menu/CheckboxContextMenu";
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
  ];

  const dropdownItems = sortOptions.map((option) => ({
    key: option,
    title: t(option),
    isSelected: value === option,
    onPress: () => handleChoose(option),
    disabled: disabled,
  }));

  return (
    <CheckboxContextMenu items={dropdownItems}>
      <ButtonSmall
        disabled={disabled}
        disabledUI={disabled && !value}
        title={(value && t(value)) || t("title")}
        renderIcon={(color, size) => (
          <Ionicons name="chevron-down-outline" size={size} color={color} style={{ bottom: -1 }} />
        )}
        style={{
          backgroundColor: value ? theme.colors.primary : theme.colors.surface,
        }}
        textColor={theme.colors.text}
      />
    </CheckboxContextMenu>
  );
};

const styles = StyleSheet.create({
  modalWrapper: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
});

export default SortDropdown;
