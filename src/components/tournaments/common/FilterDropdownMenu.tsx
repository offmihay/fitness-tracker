import CheckboxContextMenu from "@/src/shared/context-menu/CheckboxContextMenu";
import React from "react";

import { useTranslation } from "react-i18next";

export type FilterDropdownOptions = "participant" | "organizer" | "all";

type Props = {
  children: React.ReactNode;
  disabled?: boolean;
  value: FilterDropdownOptions;
  onConfirm?: (option: FilterDropdownOptions) => void;
};

const FilterDropdownMenu = ({ children, onConfirm, value, disabled }: Props) => {
  const { t } = useTranslation("", { keyPrefix: "tournaments.filter" });

  const handleChoose = async (value: FilterDropdownOptions) => {
    onConfirm?.(value);
  };

  const filterOptions: FilterDropdownOptions[] = ["all", "participant", "organizer"];

  const dropdownItems = filterOptions.map((option) => ({
    key: option,
    title: t(option),
    isSelected: value === option,
    onPress: () => handleChoose(option),
    disabled,
  }));

  return <CheckboxContextMenu items={dropdownItems}>{children}</CheckboxContextMenu>;
};

export default FilterDropdownMenu;
