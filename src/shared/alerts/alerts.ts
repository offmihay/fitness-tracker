import { TFunction } from "i18next";
import { Alert } from "react-native";

export const deleteConfirmationAlert = (
  onPress: () => void,
  t: TFunction<"translation", undefined>
) => {
  Alert.alert(t("alert.deleteTournament"), "", [
    {
      text: t("common.delete"),
      onPress: onPress,
      style: "destructive",
    },
    {
      text: t("common.cancel"),
      style: "cancel",
    },
  ]);
};

export const deactivateConfirmationAlert = (
  onPress: () => void,
  t: TFunction<"translation", undefined>
) => {
  Alert.alert(t("alert.deactivateTournament"), "", [
    {
      text: t("common.deactivate"),
      onPress: onPress,
      style: "destructive",
    },
    {
      text: t("common.cancel"),
      style: "cancel",
    },
  ]);
};

export const activateFinishedAlert = (
  onPress: () => void,
  t: TFunction<"translation", undefined>
) => {
  Alert.alert(t("alert.activateFinishedTournament"), "", [
    {
      text: t("alert.goToEditPage"),
      onPress: onPress,
    },
    {
      text: t("common.ok"),
      style: "default",
    },
  ]);
};

export const leaveTournamentConfirmationAlert = (
  onPress: () => void,
  t: TFunction<"translation", undefined>
) => {
  Alert.alert(t("alert.leaveTournament"), "", [
    {
      text: t("common.leave"),
      onPress: onPress,
      style: "destructive",
    },
    {
      text: t("common.cancel"),
      style: "cancel",
    },
  ]);
};

export const cameraPermissionAlert = (
  onPress: () => void,
  t: TFunction<"translation", undefined>
) => {
  Alert.alert(t("alert.cameraPermission"), "", [
    {
      text: t("alert.goToSettings"),
      onPress,
      style: "default",
    },
    {
      text: t("common.cancel"),
      style: "cancel",
    },
  ]);
};

export const galleryPermissionAlert = (
  onPress: () => void,
  t: TFunction<"translation", undefined>
) => {
  Alert.alert(t("alert.galleryPermission"), "", [
    {
      text: t("alert.goToSettings"),
      onPress,
      style: "default",
    },
    {
      text: t("common.cancel"),
      style: "cancel",
    },
  ]);
};

export const deleteImageConfirmationAlert = (
  onPress: () => void,
  t: TFunction<"translation", undefined>
) => {
  Alert.alert(t("alert.deleteImage"), "", [
    {
      text: t("common.delete"),
      onPress: onPress,
      style: "destructive",
    },
    {
      text: t("common.cancel"),
      style: "cancel",
    },
  ]);
};

export const calendarPermissionAlert = (
  onPress: () => void,
  t: TFunction<"translation", undefined>
) => {
  Alert.alert(t("alert.calendarPermission"), "", [
    {
      text: t("alert.goToSettings"),
      onPress,
      style: "default",
    },
    {
      text: t("common.cancel"),
      style: "cancel",
    },
  ]);
};
