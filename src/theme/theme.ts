import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";

const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "rgba(0, 130, 255, 1)",
    primaryDark: "rgba(0, 100, 200, 1)",
    primaryLight: "rgba(100, 180, 255, 1)",
    secondary: "#7968F2",
    accent: "rgba(0, 130, 255, 0.7)",
    background: "#F5F5F7",
    surface: "#FFFFFF",
    surfaceDark: "#FFFFFF",
    surfaceLight: "#FAFAFA",
    surfaceDisabled: "#E8EBEF",
    text: "#000000",
    textSecondary: "#555555",
    textTertiary: "#888888",
    textSurface: "rgba(100, 100, 100, 0.8)",
    error: "#ff4b4b",
    success: "#388E3C",
    warning: "#F57C00",
    info: "#1976D2",
    divider: "rgba(0, 0, 0, 0.12  )",
    deep: "white",
    border: "#b3b3b3",
    link: "#008bff",
  },
};

const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "rgba(1, 113, 255, 1)",
    primaryDark: "rgba(0, 80, 180, 1)",
    primaryLight: "rgba(80, 160, 255, 1)",
    secondary: "#7968F2",
    accent: "rgba(1, 113, 255, 0.7)",
    background: "#121212",
    surface: "#1E1E1E",
    surfaceDark: "#1b1b1b",
    surfaceLight: "#1c1c1e",
    surfaceDisabled: "#171717",
    text: "#FFFFFF",
    textSecondary: "#CCCCCC",
    textTertiary: "#999999",
    textSurface: "rgba(255, 255, 255, 0.7)",
    error: "#ff3f3f",
    success: "#4CAF50",
    warning: "#FFA726",
    info: "#42A5F5",
    divider: "rgba(255, 255, 255, 0.12)",
    deep: "black",
    border: "#363636",
    link: "#008bff",
  },
};

export const CombinedLightTheme = {
  ...NavigationDefaultTheme,
  ...lightTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...lightTheme.colors,
  },
};

export const CombinedDarkTheme = {
  ...NavigationDarkTheme,
  ...darkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    ...darkTheme.colors,
  },
};
