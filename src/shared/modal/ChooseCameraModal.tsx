import React, { forwardRef, useCallback, useMemo } from "react";
import { Platform, StyleSheet } from "react-native";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { ThemeProvider } from "react-native-paper";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { useTranslation } from "react-i18next";
import ButtonAction from "../button/ButtonAction";

type Props = {
  snapPoints?: Array<string>;
  onCamera?: () => void;
  onGallery?: () => void;
};

export type Ref = BottomSheetModal;

const ChooseCameraModal = forwardRef<Ref, Props>(({ onCamera, onGallery }, ref) => {
  const { t } = useTranslation();
  const theme = useCustomTheme();
  const snapPointsModal = useMemo(() => ["35%"], []);

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
      enableContentPanningGesture={Platform.OS === "android" ? false : true}
    >
      <ThemeProvider theme={theme}>
        <BottomSheetView style={styles.contentContainer}>
          <ButtonAction.Group>
            <ButtonAction onPress={handleOnGallery} title={t("common.openGallery")} />
            <ButtonAction onPress={handleOnCamera} title={t("common.openCamera")} />
          </ButtonAction.Group>
          <ButtonAction.Group>
            <ButtonAction onPress={handleDismiss} title={t("common.cancel")} weight="bold" />
          </ButtonAction.Group>
        </BottomSheetView>
      </ThemeProvider>
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
});
