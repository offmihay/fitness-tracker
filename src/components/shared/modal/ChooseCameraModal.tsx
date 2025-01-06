import React, { forwardRef, useCallback, useMemo, useRef } from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

import { Divider } from "react-native-paper";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import CustomText from "../text/CustomText";
import { useTranslation } from "react-i18next";

type Props = {
  snapPoints?: Array<string>;
  onCamera?: () => void;
  onGallery?: () => void;
};

export type Ref = BottomSheetModal;

const ChooseCameraModal = forwardRef<Ref, Props>(({ onCamera, onGallery }, ref) => {
  const { t } = useTranslation();
  const theme = useCustomTheme();
  const snapPointsModal = useMemo(() => ["30%"], []);

  const handleDismiss = useCallback(() => {
    if (ref && "current" in ref && ref.current) {
      ref.current.dismiss();
    }
  }, [ref]);

  const handleOnGallery = () => {
    onGallery?.();
    handleDismiss();
  };

  const handleOnCamera = () => {
    onCamera?.();
    handleDismiss();
  };

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    []
  );

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPointsModal}
      index={0}
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: "transparent" }}
      handleComponent={null}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={[styles.btnWrapper, { borderRadius: Platform.OS === "ios" ? 15 : 8 }]}>
          <View style={[styles.btn, { backgroundColor: "black" }]}>
            <TouchableOpacity
              activeOpacity={0.85}
              style={[{ backgroundColor: theme.colors.surfaceDark }, styles.btnContent]}
              onPress={handleOnGallery}
            >
              <CustomText weight="normal" type="subtitle" style={{ color: theme.colors.link }}>
                {t("modal.openGallery")}
              </CustomText>
            </TouchableOpacity>
          </View>
          <Divider style={{ backgroundColor: "transparent", height: 1 }} />
          <View style={[styles.btn, { backgroundColor: "black" }]}>
            <TouchableOpacity
              activeOpacity={0.85}
              style={[{ backgroundColor: theme.colors.surfaceDark }, styles.btnContent]}
              onPress={handleOnCamera}
            >
              <CustomText weight="normal" type="subtitle" style={{ color: theme.colors.link }}>
                {t("modal.openCamera")}
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.btnWrapper, { borderRadius: Platform.OS === "ios" ? 15 : 8 }]}>
          <View style={[styles.btn, { backgroundColor: "black" }]}>
            <TouchableOpacity
              activeOpacity={0.85}
              style={[{ backgroundColor: theme.colors.surfaceDark }, styles.btnContent]}
              onPress={handleDismiss}
            >
              <CustomText weight="bold" type="subtitle" style={{ color: theme.colors.link }}>
                {t("common.cancel")}
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default ChooseCameraModal;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    gap: 8,
    marginHorizontal: 10,
    justifyContent: "flex-end",
    paddingBottom: 30,
  },

  btn: {
    width: "100%",
    height: 60,
  },
  btnContent: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  btnWrapper: {
    overflow: "hidden",
  },
});
