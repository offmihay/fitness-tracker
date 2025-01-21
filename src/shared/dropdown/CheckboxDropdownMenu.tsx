import React from "react";
import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuItemTitle,
  DropdownMenuItemIndicator,
} from "./DropdownMenuComponents";

export type DropdownItem = {
  key: string;
  title: string;
  isSelected: boolean;
  onPress: () => void;
};

type Props = {
  items: DropdownItem[];
  children: React.ReactNode;
};

const CheckboxDropdownMenu = ({ children, items }: Props) => {
  return (
    <DropdownMenuRoot dir="rtl">
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent defaultChecked>
        {items.map((item) => (
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

export default CheckboxDropdownMenu;
