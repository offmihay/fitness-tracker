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

export type CreatorContextOptions = "delete" | "deactivate" | "activate";

type Props = {
  children: React.ReactNode;
  isDisabled?: boolean;
  onSelect?: (option: CreatorContextOptions) => void;
  isActive: boolean;
};

const CreatorContextMenu = ({ children, onSelect, isDisabled, isActive }: Props) => {
  const { t } = useTranslation();
  const theme = useCustomTheme();
  return (
    <ContextMenuRoot dir="ltr">
      {/* @ts-ignore */}
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent defaultChecked>
        {isActive ? (
          <ContextMenuItem
            key="deactivate"
            onSelect={() => onSelect?.("deactivate")}
            disabled={isDisabled}
          >
            <ContextMenuItemIcon
              ios={{
                name: "eye.slash.fill", // required
                weight: "semibold",
                scale: "default",
                paletteColors: [theme.colors.text],
              }}
              androidIconName="cloud.sleet.circle"
            ></ContextMenuItemIcon>
            <ContextMenuItemTitle>{t("common.deactivate")}</ContextMenuItemTitle>
          </ContextMenuItem>
        ) : (
          <ContextMenuItem
            key="activate"
            onSelect={() => onSelect?.("activate")}
            disabled={isDisabled}
          >
            <ContextMenuItemIcon
              ios={{
                name: "power", // required
                weight: "semibold",
                scale: "default",
                paletteColors: [theme.colors.text],
              }}
              androidIconName="cloud.sleet.circle"
            ></ContextMenuItemIcon>
            <ContextMenuItemTitle>{t("common.activate")}</ContextMenuItemTitle>
          </ContextMenuItem>
        )}
        <ContextMenuItem
          key="delete"
          destructive
          onSelect={() => onSelect?.("delete")}
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

export default CreatorContextMenu;
