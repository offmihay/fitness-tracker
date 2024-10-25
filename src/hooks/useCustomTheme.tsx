import { useTheme } from "@react-navigation/native";
import { CombinedDarkTheme } from "../theme/theme";

export function useCustomTheme() {
  return useTheme() as typeof CombinedDarkTheme;
}
