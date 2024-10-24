import React from "react";
import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuItemTitle,
  DropdownMenuItemIndicator,
} from "./CustomDropdown";

export type DropdownItem = {
  key: "dark" | "light" | "system";
  title: string;
  isSelected: boolean;
  onPress: () => void;
};

type Props = {
  items: DropdownItem[];
  children: React.ReactNode;
};

const DropdownCheckbox = ({ children, items }: Props) => {
  return (
    <DropdownMenuRoot>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        {items.map((item) => (
          // @ts-ignore
          <DropdownMenuCheckboxItem
            key={item.key}
            value={item.isSelected ? "on" : "off"}
            onSelect={item.onPress}
          >
            <DropdownMenuItemTitle>{item.title}</DropdownMenuItemTitle>
            <DropdownMenuItemIndicator />
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenuRoot>
  );
};

export default DropdownCheckbox;
