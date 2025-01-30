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
};
const SortDropdown = (props: Props) => {
  const { value, onConfirm } = props;

  const { t } = useTranslation("", { keyPrefix: "home.sort" });

  const theme = useCustomTheme();

  const handleChoose = async (value: SortValueHome) => {
    await AsyncStorage.setItem("sortby-home", value);
    onConfirm?.(value);
  };

  const dropdownItems = [
    {
      key: SortValueHome.Newest,
      title: t(SortValueHome.Newest),
      isSelected: value === SortValueHome.Newest,
      onPress: () => handleChoose(SortValueHome.Newest),
    },
    {
      key: SortValueHome.PrizePool,
      title: t(SortValueHome.PrizePool),
      isSelected: value === SortValueHome.PrizePool,
      onPress: () => handleChoose(SortValueHome.PrizePool),
    },
    {
      key: SortValueHome.Distance,
      title: t(SortValueHome.Distance),
      isSelected: value === SortValueHome.Distance,
      onPress: () => handleChoose(SortValueHome.Distance),
    },
  ];

  return (
    <CheckboxDropdownMenu items={dropdownItems}>
      <ButtonSmall
        title={(value && t(value)) || "Sort by"}
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
