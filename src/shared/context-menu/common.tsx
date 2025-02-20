import * as ContextMenu from "zeego/dropdown-menu";

export const ContextMenuRoot = ContextMenu.Root;

export const ContextMenuContent = ContextMenu.Content;
export const ContextMenuTrigger = ContextMenu.Trigger;
export const ContextMenuItemTitle = ContextMenu.ItemTitle;
export const ContextMenuItemIcon = ContextMenu.ItemIcon;
export const ContextMenuCheckboxItem = ContextMenu.CheckboxItem;
export const ContextMenuItemIndicator = ContextMenu.ItemIndicator;

type ItemProps = React.ComponentProps<(typeof ContextMenu)["Item"]>;

export const ContextMenuItem = ContextMenu.create((props: ItemProps) => {
  return <ContextMenu.Item {...props} />;
}, "Item");
