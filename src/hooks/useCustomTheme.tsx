import { useTheme } from "@react-navigation/native";
import { CombinedDarkTheme } from "../app/constants/theme";

export function useCustomTheme() {
  return useTheme() as typeof CombinedDarkTheme;
}
