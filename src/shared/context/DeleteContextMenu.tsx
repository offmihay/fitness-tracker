import React from "react";
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuItemIcon,
  ContextMenuItemIndicator,
  ContextMenuItemTitle,
  ContextMenuRoot,
  ContextMenuTrigger,
} from "./ContextMenuComponents";
import { useTranslation } from "react-i18next";

type Props = {
  action?: "longPress" | "press";
  children: React.ReactNode;
  onDelete?: () => void;
  isDisabled?: boolean;
};

const DeleteContextMenu = ({ children, onDelete, isDisabled, action = "longPress" }: Props) => {
  const { t } = useTranslation();
  return (
    <ContextMenuRoot dir="ltr">
      {/* @ts-ignore */}
      <ContextMenuTrigger action={action}>{children}</ContextMenuTrigger>
      <ContextMenuContent defaultChecked>
        <ContextMenuItem key="delete" destructive onSelect={onDelete} disabled={isDisabled}>
          <ContextMenuItemIcon
            ios={{
              name: "trash", // required
              pointSize: 20,
              weight: "semibold",
              scale: "medium",
            }}
            androidIconName="asd"
          ></ContextMenuItemIcon>
          <ContextMenuItemTitle>{t("common.delete")}</ContextMenuItemTitle>
          <ContextMenuItemIndicator />
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenuRoot>
  );
};

export default DeleteContextMenu;
