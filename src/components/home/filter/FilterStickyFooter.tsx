import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { View, StyleSheet } from "react-native";
import { KeyboardStickyView } from "react-native-keyboard-controller";

const FilterStickyFooter = ({ children }: { children: React.ReactNode }) => {
  const offset = { closed: 0, opened: 30 };
  const theme = useCustomTheme();
  return (
    <KeyboardStickyView offset={offset}>
      <View style={[styles.bottomWrapper, { backgroundColor: theme.colors.background }]}>
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
