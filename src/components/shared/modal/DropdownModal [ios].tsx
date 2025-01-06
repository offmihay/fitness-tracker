import React, { forwardRef, useCallback, useMemo } from "react";
import { StyleSheet } from "react-native";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";

import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { useTranslation } from "react-i18next";
import { Picker } from "@react-native-picker/picker";

type PickerItemProps = React.ComponentProps<typeof Picker.Item>;

export type DropdownModalProps<T extends string> = {
  selectedValue: T;
  onValueChange: ((itemValue: T, itemIndex: number) => void) | undefined;
  items: Array<PickerItemProps & { value: T }>;
  selectAnLabel?: string;
  onDismiss?: () => void;
};

export type Ref = BottomSheetModal;

const DropdownModal = forwardRef(
  <T extends string>(props: DropdownModalProps<T>, ref: React.Ref<Ref>) => {
    const { selectedValue, onValueChange, items, selectAnLabel, onDismiss } = props;

    const { t } = useTranslation();
    const theme = useCustomTheme();

    const snapPointsModal = useMemo(() => ["30%"], []);

    const handleDismiss = useCallback(() => {
      if (ref && "current" in ref && ref.current) {
        ref.current.dismiss();
      }
    }, [ref]);

    const renderBackdrop = useCallback(
      (props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
      []
    );

    const handleValueChange = (itemValue: T, itemIndex: number) => {
      onValueChange?.(itemValue, itemIndex);

      if (!!itemValue) {
        handleDismiss();
      }
    };

    return (
      <BottomSheetModal
        onDismiss={onDismiss}
        ref={ref}
        snapPoints={snapPointsModal}
        index={0}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: theme.colors.surfaceDark }}
        // handleComponent={null}
        handleIndicatorStyle={{ backgroundColor: theme.colors.textTertiary }}
        handleStyle={{ position: "absolute", left: 0, right: 0, margin: "auto" }}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Picker
            selectedValue={selectedValue}
            onValueChange={handleValueChange}
            itemStyle={{
              color: theme.colors.text,
              padding: 0,
              width: "100%",
            }}
          >
            {selectAnLabel && (
              <Picker.Item label={selectAnLabel} value="" color={theme.colors.textTertiary} />
            )}
            {items.map((item, index) => (
              <Picker.Item key={index} {...item} />
            ))}
          </Picker>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default DropdownModal as <T extends string>(
  props: DropdownModalProps<T> & { ref?: React.Ref<Ref> }
) => React.ReactElement;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
});
