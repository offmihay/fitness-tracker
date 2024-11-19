import React, { forwardRef, useCallback, useMemo, useRef } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

import { Divider } from "react-native-paper";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import CustomText from "../shared/text/CustomText";
import { useTranslation } from "react-i18next";

type Props = {
  snapPoints?: Array<string>;
  onCamera?: () => void;
  onGallery?: () => void;
};

export type Ref = BottomSheetModal;

const CustomBottomSheetModal = forwardRef<Ref, Props>(({ onCamera, onGallery }, ref) => {
  const { t } = useTranslation();
  const theme = useCustomTheme();
  const snapPointsModal = useMemo(() => ["25%"], []);

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
        <View style={[styles.btnWrapper]}>
          <View style={[styles.btn, { backgroundColor: "black" }]}>
            <TouchableOpacity
              activeOpacity={0.85}
              style={[{ backgroundColor: theme.colors.surface }, styles.btnContent]}
              onPress={handleOnGallery}
            >
              <CustomText weight="normal" type="upperdefault" style={{ color: theme.colors.link }}>
                {t("modal.openGallery")}
              </CustomText>
            </TouchableOpacity>
          </View>
          <Divider style={{ backgroundColor: "transparent", height: 1 }} />
          <View style={[styles.btn, { backgroundColor: "black" }]}>
            <TouchableOpacity
              activeOpacity={0.85}
              style={[{ backgroundColor: theme.colors.surface }, styles.btnContent]}
              onPress={handleOnCamera}
            >
              <CustomText weight="normal" type="upperdefault" style={{ color: theme.colors.link }}>
                {t("modal.openCamera")}
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.btnWrapper]}>
          <View style={[styles.btn, { backgroundColor: "black" }]}>
            <TouchableOpacity
              activeOpacity={0.85}
              style={[{ backgroundColor: theme.colors.surface }, styles.btnContent]}
              onPress={handleDismiss}
            >
              <CustomText weight="bold" type="upperdefault" style={{ color: theme.colors.link }}>
                {t("common.cancel")}
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default CustomBottomSheetModal;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    gap: 8,
    marginHorizontal: 10,
  },

  btn: {
    width: "100%",
    height: 55,
  },
  btnContent: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  btnWrapper: {
    borderRadius: 10,
    overflow: "hidden",
  },
});
