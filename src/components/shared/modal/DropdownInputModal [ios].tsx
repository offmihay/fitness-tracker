import React, { forwardRef, useCallback, useMemo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";

import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { useTranslation } from "react-i18next";
import { Picker } from "@react-native-picker/picker";
import { AntDesign } from "@expo/vector-icons";

type PickerItemProps = React.ComponentProps<typeof Picker.Item>;

export type DropdownModalProps<T extends string> = {
  selectedValue: T;
  onValueChange: ((itemValue: T, itemIndex: number) => void) | undefined;
  items: Array<PickerItemProps & { value: T }>;
  selectAnLabel?: string;
  onDismiss?: () => void;
  onSumbitEditing?: () => void;
};

export type Ref = BottomSheetModal;

const DropdownModal = forwardRef(
  <T extends string>(props: DropdownModalProps<T>, ref: React.Ref<Ref>) => {
    const { selectedValue, onValueChange, items, selectAnLabel, onDismiss, onSumbitEditing } =
      props;

    const { t } = useTranslation();
    const theme = useCustomTheme();

    const snapPointsModal = useMemo(() => ["35%"], []);

    const handleDismiss = useCallback(() => {
      if (ref && "current" in ref && ref.current) {
        ref.current.dismiss();
        onDismiss?.();
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
        onSumbitEditing?.();
      }
    };

    return (
      <BottomSheetModal
        onDismiss={onDismiss}
        ref={ref}
        snapPoints={snapPointsModal}
        index={0}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: theme.colors.background }}
        handleIndicatorStyle={{ backgroundColor: theme.colors.textTertiary }}
        handleStyle={{ position: "absolute", left: 0, right: 0, margin: "auto" }}
      >
        <BottomSheetView style={styles.contentContainer}>
          <TouchableOpacity style={styles.closeIcon} onPress={() => handleDismiss()}>
            <AntDesign name="close" size={24} color={theme.colors.textSecondary} />
          </TouchableOpacity>
          <Picker
            selectedValue={selectedValue}
            onValueChange={handleValueChange}
            itemStyle={{
              color: theme.colors.text,
              padding: 0,
              width: "100%",
              height: "100%",
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
    paddingBottom: 20,
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
