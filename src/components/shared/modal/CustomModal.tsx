import React, { forwardRef, useCallback, useMemo } from "react";
import { Keyboard, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { useTranslation } from "react-i18next";
import { AntDesign } from "@expo/vector-icons";
import CustomText from "../text/CustomText";
import { ThemeProvider } from "react-native-paper";

export type Props = {
  content: React.ReactNode;
  onDismiss?: () => void;
  bottomSheetProps?: Omit<BottomSheetModalProps, "children">;
};

export type Ref = BottomSheetModal;

const CustomModal = forwardRef((props: Props, ref: React.Ref<Ref>) => {
  const { content, onDismiss, bottomSheetProps } = props;

  const { t } = useTranslation();
  const theme = useCustomTheme();

  const snapPointsModal = useMemo(() => ["30%"], []);

  const handleDismiss = useCallback(() => {
    if (ref && "current" in ref && ref.current) {
      ref.current.dismiss();
      Keyboard.dismiss();
    }
  }, [ref]);

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    []
  );

  return (
    <BottomSheetModal
      onDismiss={onDismiss}
      enableDynamicSizing={false}
      ref={ref}
      snapPoints={snapPointsModal}
      index={0}
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: theme.colors.background }}
      handleIndicatorStyle={{ backgroundColor: theme.colors.textTertiary }}
      handleStyle={{ position: "absolute", left: 0, right: 0, margin: "auto" }}
      {...bottomSheetProps}
    >
      <ThemeProvider theme={theme}>
        <BottomSheetView style={styles.contentContainer}>
          <TouchableOpacity style={styles.closeIcon} onPress={() => handleDismiss()}>
            <AntDesign name="close" size={24} color={theme.colors.textSecondary} />
          </TouchableOpacity>
          <View style={{ width: "100%", height: "100%" }}>{content}</View>
        </BottomSheetView>
      </ThemeProvider>
    </BottomSheetModal>
  );
});

export default CustomModal;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    position: "relative",
  },

  closeIcon: {
    position: "absolute",
    right: 5,
    top: 5,
    zIndex: 1000,
    width: 50,
    height: 50,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
