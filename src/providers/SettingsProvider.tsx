import { Appearance, ColorSchemeName } from "react-native";
import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";
import i18n from "i18next";
import { getLocales } from "expo-localization";

type Settings = {
  theme: ColorSchemeName;
  language: string | null;
  notificationsEnabled: boolean;
  creatorMode: boolean;
};

type SettingsContextType = {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
};

const defaultSettings: Settings = {
  theme: null,
  language: null,
  notificationsEnabled: true,
  creatorMode: false,
};

export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export const SettingsProvider = ({ children }: Props) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const { data: settingsJson } = useQuery({
    queryKey: ["settings"],
    queryFn: () => AsyncStorage.getItem("settings"),
  });

  const calcLangCode = () => {
    const localesLangCode = getLocales()[0].languageCode!;
    // return ["en", "uk", "ru"].includes(localesLangCode) ? localesLangCode : "en";
    return "en";
  };

  useEffect(() => {
    if (settingsJson) {
      const storedSettings: Settings = settingsJson ? JSON.parse(settingsJson) : null;
      if (storedSettings) {
        setSettings(storedSettings);
        Appearance.setColorScheme(storedSettings.theme);
        if (storedSettings.language) {
          i18n.changeLanguage(storedSettings.language);
        }
      }
    } else {
      i18n.changeLanguage(calcLangCode());
    }
  }, [settingsJson]);

  const updateSettings = async (newSettings: Partial<Settings>) => {
    try {
      const storeSettings = { ...settings };

      const { theme, language, notificationsEnabled, creatorMode } = newSettings;
      if (theme || theme === null) {
        Appearance.setColorScheme(theme);
        storeSettings.theme = theme;
      }

      if (language || language === null) {
        storeSettings.language = language;
        i18n.changeLanguage(language || calcLangCode());
      }

      if (typeof notificationsEnabled !== "undefined") {
        storeSettings.notificationsEnabled = notificationsEnabled;
      }

      if (typeof creatorMode !== "undefined") {
        storeSettings.creatorMode = creatorMode;
      }

      setSettings(storeSettings);
      await AsyncStorage.setItem("settings", JSON.stringify(storeSettings));
    } catch (e) {
      console.error("Failed to save settings", e);
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};
