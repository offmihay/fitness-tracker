import * as DropdownMenu from "zeego/dropdown-menu";

export const DropdownMenuRoot = DropdownMenu.Root;

export const DropdownMenuContent = DropdownMenu.Content;
export const DropdownMenuTrigger = DropdownMenu.Trigger;
export const DropdownMenuItemTitle = DropdownMenu.ItemTitle;
export const DropdownMenuCheckboxItem = DropdownMenu.CheckboxItem;
export const DropdownMenuItemIndicator = DropdownMenu.ItemIndicator;

type ItemProps = React.ComponentProps<(typeof DropdownMenu)["Item"]>;

export const DropdownMenuItem = DropdownMenu.create((props: ItemProps) => {
  return <DropdownMenu.Item {...props} />;
}, "Item");
