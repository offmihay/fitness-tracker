import { CombinedLightTheme } from "../theme/theme";
import { useTheme } from "react-native-paper";

export function useCustomTheme() {
  return useTheme() as typeof CombinedLightTheme;
}
