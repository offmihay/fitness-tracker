import { AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

import CustomSwitch from "../shared/switch/Switch";
import { CustomListItemProps } from "../shared/list/CustomListItem";
import { useRouter } from "expo-router";
import { useSettings } from "../../hooks/useSettings";

export const getSettingsList = () => {
  const { settings, updateSettings } = useSettings();
  const { t } = useTranslation();
  const router = useRouter();

  const settingsList: CustomListItemProps[] = [
    {
      key: "personal-info",
      title: t("settings.personal-info.title"),
      icon: AntDesign,
      iconName: "user",
      onPress: () => router.push("/settings/personal-info"),
    },
    {
      key: "customize-theme",
      title: t("settings.theme.title"),
      icon: MaterialCommunityIcons,
      iconName: "theme-light-dark",
      description: t(
        `settings.theme.${settings.theme ? t(settings.theme as string) : t("system")}`
      ),
      chevron: "down",
      onPress: () => void 0,
    },
    {
      key: "change-language",
      title: t("settings.language.title"),
      icon: Entypo,
      iconName: "language",
      description: t(`settings.language.${settings.language || "system"}`),
      chevron: "down",
      onPress: () => void 0,
    },
    {
      key: "enable-notifications",
      title: t("settings.notifications.title"),
      icon: MaterialIcons,
      iconName: "notifications-active",
      nodeContentRight: (
        <CustomSwitch
          toggleSwitch={(isOn) => updateSettings({ notificationsEnabled: isOn })}
          defaultValue={settings.notificationsEnabled}
        />
      ),
      noRightChevron: true,
    },
  ];

  return settingsList;
};

export const getDropdownItems = () => {
  const { settings, updateSettings } = useSettings();
  const { t } = useTranslation();

  const dropdownItems = {
    "customize-theme": [
      {
        key: "system",
        title: t("settings.theme.system"),
        isSelected: !settings.theme,
        onPress: () => updateSettings({ theme: null }),
      },
      {
        key: "dark",
        title: t("settings.theme.dark"),
        isSelected: settings.theme === "dark",
        onPress: () => updateSettings({ theme: "dark" }),
      },
      {
        key: "light",
        title: t("settings.theme.light"),
        isSelected: settings.theme === "light",
        onPress: () => updateSettings({ theme: "light" }),
      },
    ],
    "change-language": [
      {
        key: "en",
        title: t("settings.language.en"),
        isSelected: settings.language === "en",
        onPress: () => updateSettings({ language: "en" }),
      },
      {
        key: "ua",
        title: t("settings.language.uk"),
        isSelected: settings.language === "uk",
        onPress: () => updateSettings({ language: "uk" }),
      },
      {
        key: "ru",
        title: t("settings.language.ru"),
        isSelected: settings.language === "ru",
        onPress: () => updateSettings({ language: "ru" }),
      },
      {
        key: "system",
        title: t("settings.language.system"),
        isSelected: !settings.language,
        onPress: () => updateSettings({ language: null }),
      },
    ],
  };

  return dropdownItems;
};
