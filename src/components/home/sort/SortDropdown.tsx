import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import ButtonFilter from "@/src/shared/button/ButtonFilter";
import { Ionicons } from "@expo/vector-icons";
import CheckboxDropdownMenu from "@/src/shared/dropdown/CheckboxDropdownMenu";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

type Props = {
  onConfirm?: (value: SortValueHome | null) => void;
};

export enum SortValueHome {
  Newest = "newest",
  PrizePool = "prizePool",
  Distance = "distance",
}

const SortDropdown = (props: Props) => {
  const { onConfirm } = props;
  const [sortValue, setSortValue] = useState<SortValueHome | null>(null);
  const { t } = useTranslation("", { keyPrefix: "home.sort" });

  const theme = useCustomTheme();

  useEffect(() => {
    const fetchStoredFilter = async () => {
      const storedData = await AsyncStorage.getItem("sort-home");
      const result = storedData ? (JSON.parse(storedData) as SortValueHome) : null;
      return result;
    };

    fetchStoredFilter().then((sortValue) => {
      setSortValue(sortValue);
      onConfirm?.(sortValue);
    });
  }, []);

  const handleChoose = async (value: SortValueHome) => {
    setSortValue(value);
    await AsyncStorage.setItem("sort-home", value);
    onConfirm?.(value);
  };

  const dropdownItems = [
    {
      key: SortValueHome.Newest,
      title: t(SortValueHome.Newest),
      isSelected: sortValue === SortValueHome.Newest,
      onPress: () => handleChoose(SortValueHome.Newest),
    },
    {
      key: SortValueHome.PrizePool,
      title: t(SortValueHome.PrizePool),
      isSelected: sortValue === SortValueHome.PrizePool,
      onPress: () => handleChoose(SortValueHome.PrizePool),
    },
    {
      key: SortValueHome.Distance,
      title: t(SortValueHome.Distance),
      isSelected: sortValue === SortValueHome.Distance,
      onPress: () => handleChoose(SortValueHome.Distance),
    },
  ];

  return (
    <CheckboxDropdownMenu items={dropdownItems}>
      <ButtonFilter
        label={(sortValue && t(sortValue)) || "Sort by"}
        renderIcon={(color, size) => (
          <Ionicons name="chevron-down-outline" size={size} color={color} style={{ bottom: -1 }} />
        )}
        style={{ backgroundColor: sortValue ? theme.colors.primary : theme.colors.surface }}
        textColor={sortValue ? "white" : theme.colors.text}
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
