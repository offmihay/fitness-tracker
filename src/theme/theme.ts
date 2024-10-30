import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";

const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#0082FF", // first color
    accent: "#7968F2", // sec color
    background: "#ECEDEE",
    surface: "#fff", // views
    surfaceLight: "#fff",
    text: "#000000",
    textSurface: "rgba(181, 181, 181, 1)",
    icon: "#0082FF", // icon for react-navigation/native
    onSurfaceVariant: "#0082FF", // icon for react-native-paper
  },
};

const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#0171FF", // first color
    accent: "#8A6DFC", // sec color
    background: "black",
    surface: "#151718", // views
    surfaceLight: "#1c1c1e",
    text: "#ffffff",
    textSurface: "rgba(191, 191, 191, 0.4)",
    icon: "#0171FF", // icon for react-navigation/native
    onSurfaceVariant: "#0171FF", // icon for react-native-paper
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
