import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { hexToRgba } from "@/src/utils/hexToRgba";
import { View, StyleSheet } from "react-native";
import { KeyboardStickyView } from "react-native-keyboard-controller";

const FilterStickyFooter = ({ children }: { children: React.ReactNode }) => {
  const offset = { closed: 0, opened: 30 };
  const theme = useCustomTheme();
  const backgroundColorWithOpacity = hexToRgba(theme.colors.background, 1);
  return (
    <KeyboardStickyView offset={offset}>
      <View style={[styles.bottomWrapper, { backgroundColor: backgroundColorWithOpacity }]}>
        {children}
      </View>
    </KeyboardStickyView>
  );
};

const styles = StyleSheet.create({
  bottomWrapper: {
    paddingHorizontal: 20,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default FilterStickyFooter;
