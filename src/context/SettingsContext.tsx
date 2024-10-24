import { Appearance, ColorSchemeName } from "react-native";
import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Settings = {
  theme: ColorSchemeName;
  language: "en" | "es";
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

  useEffect(() => {
    (async () => {
      try {
        const settingsJson = await AsyncStorage.getItem("settings");
        const storedSettings: Settings = settingsJson ? JSON.parse(settingsJson) : null;
        if (storedSettings) {
          setSettings(storedSettings);
          Appearance.setColorScheme(storedSettings.theme);
        }
      } catch (e) {
        console.error("Failed to load settings from storage", e);
      }
    })();
  }, []);

  const updateSettings = async (newSettings: Partial<Settings>) => {
    try {
      const storeSettings = { ...settings };

      const { theme } = newSettings;
      if (theme || theme === null) {
        Appearance.setColorScheme(theme);
        storeSettings.theme = theme;
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

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
