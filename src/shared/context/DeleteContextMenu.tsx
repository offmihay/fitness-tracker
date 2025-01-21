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
import { View } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

type Props = {
  children: React.ReactNode;
  onDelete?: () => void;
  isDisabled?: boolean;
};

const DeleteContextMenu = ({ children, onDelete, isDisabled }: Props) => {
  const { t } = useTranslation();
  return (
    <ContextMenuRoot dir="ltr" onOpenChange={(open) => console.log("asd", open)}>
      {/* @ts-ignore */}
      <ContextMenuTrigger action="longPress">{children}</ContextMenuTrigger>
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
