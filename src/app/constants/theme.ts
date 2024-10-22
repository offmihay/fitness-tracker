import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";

const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "rgb(0, 122, 255)", // first color
    accent: "#67C6E3", // sec color
    background: "#ECEDEE",
    surface: "#fff", // views
    text: "#000000",
    textSurface: "rgba(191, 191, 191, 0.9)",
    icon: "rgb(0, 122, 255)", // icon for react-navigation/native
    onSurfaceVariant: "rgb(0, 122, 255)", // icon for react-native-paper
    tabIconDefault: "#687076",
    tabIconSelected: "#0a7ea4",
  },
};

const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "rgb(10, 112, 255)", // first color
    accent: "#DFF5FF", // sec color
    background: "black",
    surface: "#151718", // views
    text: "#ffffff",
    textSurface: "rgba(191, 191, 191, 0.4)",
    icon: "rgb(10, 112, 255)", // icon for react-navigation/native
    onSurfaceVariant: "rgb(10, 112, 255)", // icon for react-native-paper
    tabIconDefault: "#9BA1A6",
    tabIconSelected: "#fff",
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
