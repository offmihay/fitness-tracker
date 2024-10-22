import { useColorScheme } from "react-native";
import { CombinedDarkTheme, CombinedLightTheme } from "../app/constants/theme";

export function useTheme() {
  const theme = useColorScheme() ?? "light";

  if (theme === "light") {
    return CombinedLightTheme;
  } else {
    return CombinedDarkTheme;
  }
}
