import { useEffect, useMemo, useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { Platform } from "react-native";
import ButtonSmall from "@/src/shared/button/ButtonSmall";
import ModalController from "@/src/shared/controllers/ModalController";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import _ from "lodash";
import { FilterHome } from "../types";
import { t } from "i18next";
import LocationContent from "./LocationContent";

type Props = { isMutated?: boolean; disabled?: boolean } & React.ComponentProps<
  typeof LocationContent
>;

const LocationModal = (props: Props) => {
  const { isMutated, disabled, ...rest } = props;
  const snapPoints = useMemo(() => ["95%"], []);
  const theme = useCustomTheme();

  return (
    <ModalController
      name="location-modal"
      renderTrigger={(handleOpen) => (
        <ButtonSmall
          disabled={disabled}
          title={t("home.location.title")}
          renderIcon={(color, size) => (
            <FontAwesome6 name="location-dot" size={size - 1} color={color} />
          )}
          onPress={handleOpen}
          style={{ backgroundColor: isMutated ? theme.colors.primary : theme.colors.surface }}
          textColor={isMutated ? "white" : theme.colors.text}
        />
      )}
      modalContent={<LocationContent {...rest} />}
      bottomSheetProps={{
        snapPoints,
        enableContentPanningGesture: Platform.OS === "android" ? false : true,
      }}
    />
  );
};

export default LocationModal;
