import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import {
  ContextMenuRoot,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuItemIcon,
  ContextMenuItemTitle,
  ContextMenuTrigger,
} from "@/src/shared/context/ContextMenuComponents";
import React, { useState } from "react";

import { useTranslation } from "react-i18next";

export type UserContextOptions = "leave";

type Props = {
  children: React.ReactNode;
  isDisabled?: boolean;
  onSelect?: (option: UserContextOptions) => void;
};

const UserContextMenu = ({ children, onSelect, isDisabled }: Props) => {
  const { t } = useTranslation();
  const theme = useCustomTheme();
  return (
    <ContextMenuRoot dir="ltr">
      {/* @ts-ignore */}
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent defaultChecked>
        <ContextMenuItem
          key="leave"
          destructive
          onSelect={() => onSelect?.("leave")}
          disabled={isDisabled}
        >
          <ContextMenuItemIcon
            ios={{
              name: "checkmark.gobackward", // required
              weight: "semibold",
              scale: "default",
            }}
            androidIconName="cloud.sleet.circle"
          ></ContextMenuItemIcon>
          <ContextMenuItemTitle>{t("common.leave")}</ContextMenuItemTitle>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenuRoot>
  );
};

export default UserContextMenu;
