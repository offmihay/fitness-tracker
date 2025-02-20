import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import {
  ContextMenuRoot,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuItemIcon,
  ContextMenuItemTitle,
  ContextMenuTrigger,
} from "@/src/shared/context-menu/common";
import React, { useState } from "react";

import { useTranslation } from "react-i18next";

export type ManageUsersContextOptions = "remove";

type Props = {
  children: React.ReactNode;
  isDisabled?: boolean;
  onSelect?: (option: ManageUsersContextOptions) => void;
};

const ManageUsersContextMenu = ({ children, onSelect, isDisabled }: Props) => {
  const { t } = useTranslation();
  return (
    <ContextMenuRoot dir="ltr">
      {/* @ts-ignore */}
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent defaultChecked>
        <ContextMenuItem
          key="delete"
          destructive
          onSelect={() => onSelect?.("remove")}
          disabled={isDisabled}
        >
          <ContextMenuItemIcon
            ios={{
              name: "trash", // required
              weight: "semibold",
              scale: "default",
            }}
            androidIconName="trash"
          ></ContextMenuItemIcon>
          <ContextMenuItemTitle>{t("common.delete")}</ContextMenuItemTitle>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenuRoot>
  );
};

export default ManageUsersContextMenu;
