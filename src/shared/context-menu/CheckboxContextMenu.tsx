import React from "react";
import {
  ContextMenuRoot,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuCheckboxItem,
  ContextMenuItemTitle,
  ContextMenuItemIndicator,
} from "./common";

export type DropdownItem = {
  key: string;
  title: string;
  isSelected: boolean;
  disabled?: boolean;
  onPress: () => void;
};

type Props = {
  items: DropdownItem[];
  children: React.ReactNode;
};

const CheckboxContextMenu = ({ children, items }: Props) => {
  return (
    <ContextMenuRoot dir="rtl">
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent defaultChecked>
        {items.map((item) => (
          <ContextMenuCheckboxItem
            key={item.key}
            value={item.isSelected ? "on" : "off"}
            onSelect={item.onPress}
            disabled={item.disabled}
          >
            <ContextMenuItemTitle>{item.title}</ContextMenuItemTitle>
            <ContextMenuItemIndicator />
          </ContextMenuCheckboxItem>
        ))}
      </ContextMenuContent>
    </ContextMenuRoot>
  );
};

export default CheckboxContextMenu;
