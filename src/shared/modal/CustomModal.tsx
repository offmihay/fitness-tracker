import React, { useCallback, useEffect, useMemo, useRef } from "react";
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
import { ThemeProvider } from "react-native-paper";
import CustomText from "../text/CustomText";

export type Props = {
  name: string;
  children: React.ReactNode;
  isOpen: boolean;
  onDismiss?: () => void;
  bottomSheetProps?: Omit<BottomSheetModalProps, "children">;
};

export type Ref = BottomSheetModal;

const CustomModal = (props: Props) => {
  const { name, children, isOpen, onDismiss, bottomSheetProps } = props;

  const { t } = useTranslation();
  const theme = useCustomTheme();

  const snapPointsModal = useMemo(() => ["30%"], []);

  const ref = useRef<BottomSheetModal>(null);

  const handleOpen = useCallback(() => {
    if (ref.current) {
      Keyboard.dismiss();
      ref.current.present();
    }
  }, []);

  const handleDismiss = useCallback(() => {
    if (ref.current) {
      Keyboard.dismiss();
      ref.current.dismiss();
    }
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    []
  );

  useEffect(() => {
    if (isOpen) {
      handleOpen();
    } else {
      handleDismiss();
    }
  }, [isOpen]);

  return (
    <BottomSheetModal
      name={name}
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
          <TouchableOpacity onPress={() => handleDismiss()} style={styles.closeIconContainer}>
            <View style={[styles.closeIcon, { backgroundColor: theme.colors.background }]}>
              <AntDesign name="close" size={24} color={theme.colors.textSecondary} />
            </View>
          </TouchableOpacity>
          <View style={{ width: "100%", height: "100%" }}>{children}</View>
        </BottomSheetView>
      </ThemeProvider>
    </BottomSheetModal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    position: "relative",
  },

  closeIconContainer: {
    position: "absolute",
    right: 5,
    top: 5,
    zIndex: 1000,
    width: 60,
    height: 60,
  },
  closeIcon: {
    position: "absolute",
    right: 5,
    top: 5,
    zIndex: 1000,
    width: 35,
    height: 35,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
});
