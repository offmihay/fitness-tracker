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

export type TournamentOptions = "delete" | "deactivate";

type Props = {
  children: React.ReactNode;
  isDisabled?: boolean;
  onSelect?: (option: TournamentOptions) => void;
};

const TournamentOptionsContextMenu = ({ children, onSelect, isDisabled }: Props) => {
  const { t } = useTranslation();
  const theme = useCustomTheme();
  return (
    <ContextMenuRoot dir="ltr">
      {/* @ts-ignore */}
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent defaultChecked>
        <ContextMenuItem
          key="deactivate"
          onSelect={() => onSelect?.("deactivate")}
          disabled={isDisabled}
        >
          <ContextMenuItemIcon
            ios={{
              name: "macbook.and.visionpro", // required
              weight: "semibold",
              scale: "default",
              paletteColors: [theme.colors.text],
            }}
            androidIconName="cloud.sleet.circle"
          ></ContextMenuItemIcon>
          <ContextMenuItemTitle>{t("common.deactivate")}</ContextMenuItemTitle>
        </ContextMenuItem>
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

export default TournamentOptionsContextMenu;
