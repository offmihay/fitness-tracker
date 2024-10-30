import { useTheme } from "@react-navigation/native";
import { CombinedDarkTheme, CombinedLightTheme } from "../theme/theme";

export function useCustomTheme(theme?: "dark" | "light") {
  if (!theme) {
    return useTheme() as typeof CombinedDarkTheme;
  } else {
    return theme === "dark" ? CombinedDarkTheme : CombinedLightTheme;
  }
}
