import { useTheme } from "@react-navigation/native";
import { CombinedDarkTheme } from "../app/theme/theme";

export function useCustomTheme() {
  return useTheme() as typeof CombinedDarkTheme;
}
