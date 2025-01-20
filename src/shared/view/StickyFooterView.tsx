import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { View, StyleSheet, ViewProps } from "react-native";
import { KeyboardStickyView } from "react-native-keyboard-controller";

type Props = {
  children: React.ReactNode;
  offset?: { closed: number; opened: number };
  wrapperStyle?: ViewProps["style"];
};
const StickyFooterView = (props: Props) => {
  const { children, offset = { closed: 0, opened: 0 }, wrapperStyle } = props;

  const theme = useCustomTheme();
  return (
    <KeyboardStickyView offset={offset}>
      <View
        style={[styles.bottomWrapper, { backgroundColor: theme.colors.background }, wrapperStyle]}
      >
        {children}
      </View>
    </KeyboardStickyView>
  );
};

const styles = StyleSheet.create({
  bottomWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default StickyFooterView;
