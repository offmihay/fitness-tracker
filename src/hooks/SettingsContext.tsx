import { Appearance, ColorSchemeName } from "react-native";
import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";
import i18n from "i18next";

type Settings = {
  theme: ColorSchemeName;
  language: "en" | "ua" | "ru" | null;
  notificationsEnabled: boolean;
};

type SettingsContextType = {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
};

const defaultSettings: Settings = {
  theme: null,
  language: "en",
  notificationsEnabled: true,
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

  useEffect(() => {
    if (settingsJson) {
      const storedSettings: Settings = settingsJson ? JSON.parse(settingsJson) : null;
      if (storedSettings) {
        setSettings(storedSettings);
        Appearance.setColorScheme(storedSettings.theme);
        i18n.changeLanguage(storedSettings.language || "en");
      }
    }
  }, [settingsJson]);

  const updateSettings = async (newSettings: Partial<Settings>) => {
    try {
      const storeSettings = { ...settings };

      const { theme, language, notificationsEnabled } = newSettings;
      if (theme || theme === null) {
        Appearance.setColorScheme(theme);
        storeSettings.theme = theme;
      }
      if (language) {
        storeSettings.language = language;
        i18n.changeLanguage(language);
      }

      if (typeof notificationsEnabled !== "undefined") {
        storeSettings.notificationsEnabled = notificationsEnabled;
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
