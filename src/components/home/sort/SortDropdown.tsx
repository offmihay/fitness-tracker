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
    await AsyncStorage.setItem("sortby-home", value);
    onConfirm?.(value);
  };

  useEffect(() => {
    if (disabled) {
      onConfirm?.(null);
    }
  }, [disabled]);

  const dropdownItems = [
    {
      key: SortValueHome.Newest,
      title: t(SortValueHome.Newest),
      isSelected: value === SortValueHome.Newest,
      onPress: () => handleChoose(SortValueHome.Newest),
      disabled: disabled,
    },
    {
      key: SortValueHome.Upcoming,
      title: t(SortValueHome.Upcoming),
      isSelected: value === SortValueHome.Upcoming,
      onPress: () => handleChoose(SortValueHome.Upcoming),
      disabled: disabled,
    },
    {
      key: SortValueHome.PrizePool,
      title: t(SortValueHome.PrizePool),
      isSelected: value === SortValueHome.PrizePool,
      onPress: () => handleChoose(SortValueHome.PrizePool),
      disabled: disabled,
    },
    {
      key: SortValueHome.Distance,
      title: t(SortValueHome.Distance),
      isSelected: value === SortValueHome.Distance,
      onPress: () => handleChoose(SortValueHome.Distance),
      disabled: disabled,
    },
  ];

  return (
    <CheckboxDropdownMenu items={dropdownItems}>
      <ButtonSmall
        disabled={disabled}
        title={(value && !disabled && t(value)) || "Sort by"}
        renderIcon={(color, size) => (
          <Ionicons name="chevron-down-outline" size={size} color={color} style={{ bottom: -1 }} />
        )}
        style={{ backgroundColor: value ? theme.colors.primary : theme.colors.surface }}
        textColor={value ? "white" : theme.colors.text}
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
