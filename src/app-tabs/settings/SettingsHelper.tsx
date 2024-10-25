import { AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useSettings } from "../../context/SettingsContext";
import { CustomListItemProps } from "../../components/list/CustomListItem";
import CustomSwitch from "../../components/switch/Switch";

export const getSettingsList = () => {
  const { settings, updateSettings } = useSettings();
  const { t } = useTranslation();

  const settingsList: CustomListItemProps[] = [
    {
      key: "personal-info",
      title: t("settings.personal-info"),
      icon: AntDesign,
      iconName: "user",
    },
    {
      key: "customize-theme",
      title: t("settings.customize-theme"),
      icon: MaterialCommunityIcons,
      iconName: "theme-light-dark",
      description: t(`settings.${settings.theme ? t(settings.theme as string) : t("system")}`),
      chevron: "down",
    },
    {
      key: "change-language",
      title: t("settings.change-language"),
      icon: Entypo,
      iconName: "language",
      description: t(`settings.${settings.language as string}`),
      chevron: "down",
    },
    {
      key: "enable-notifications",
      title: t("settings.enable-notifications"),
      icon: MaterialIcons,
      iconName: "notifications-active",
      nodeContent: (
        <CustomSwitch toggleSwitch={(isOn) => updateSettings({ notificationsEnabled: isOn })} />
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
        title: t("settings.system"),
        isSelected: !settings.theme,
        onPress: () => updateSettings({ theme: null }),
      },
      {
        key: "dark",
        title: t("settings.dark"),
        isSelected: settings.theme === "dark",
        onPress: () => updateSettings({ theme: "dark" }),
      },
      {
        key: "light",
        title: t("settings.light"),
        isSelected: settings.theme === "light",
        onPress: () => updateSettings({ theme: "light" }),
      },
    ],
    "change-language": [
      {
        key: "en",
        title: t("settings.en"),
        isSelected: settings.language === "en",
        onPress: () => updateSettings({ language: "en" }),
      },
      {
        key: "ua",
        title: t("settings.ua"),
        isSelected: settings.language === "ua",
        onPress: () => updateSettings({ language: "ua" }),
      },
      {
        key: "ru",
        title: t("settings.ru"),
        isSelected: settings.language === "ru",
        onPress: () => updateSettings({ language: "ru" }),
      },
    ],
  };

  return dropdownItems;
};
