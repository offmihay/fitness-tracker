import React, { useState, forwardRef, useImperativeHandle, ReactNode, useRef } from "react";
import { Keyboard, Pressable, View } from "react-native";
import CustomTextInput from "./CustomTextInput";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import DropdownModal, { DropdownModalProps } from "../modal/DropdownInputModal [ios]";

type DropdownInputProps<T extends string> = {
  label?: string;
  value: T;
  inputProps?: Partial<React.ComponentProps<typeof CustomTextInput>>;
  renderTrigger?: (props: {
    onPress: () => void;
    value: string;
    label?: string;
    isOpen?: boolean;
  }) => ReactNode;
  dropdownProps: DropdownModalProps<T>;
  onSubmitEditing?: () => void;
};

export interface InputRef {
  focus: () => void;
}

const DropdownInput = forwardRef<InputRef, DropdownInputProps<any>>(
  ({ label, value, inputProps, renderTrigger, dropdownProps, onSubmitEditing }, ref) => {
    const [isOpen, setOpen] = useState(false);

    const bottomSheetRef = useRef<BottomSheetModal>(null);

    const handleOpenModal = () => {
      Keyboard.dismiss();
      bottomSheetRef.current?.present();
      setOpen(true);
    };

    const handleDismiss = () => {
      setOpen(false);
    };

    useImperativeHandle(ref, () => ({
      focus: () => {
        handleOpenModal();
      },
    }));

    const renderDefaultTrigger = () => (
      <CustomTextInput
        selectTextOnFocus={false}
        label={label}
        onPress={handleOpenModal}
        disabled
        value={value}
        isForceFocused={!!isOpen}
        {...inputProps}
      />
    );

    return (
      <View>
        <Pressable onPress={handleOpenModal}>
          {renderTrigger
            ? renderTrigger({ onPress: handleOpenModal, value, label, isOpen })
            : renderDefaultTrigger()}
        </Pressable>
        <DropdownModal
          ref={bottomSheetRef}
          {...dropdownProps}
          onDismiss={handleDismiss}
          onSumbitEditing={onSubmitEditing}
        />
      </View>
    );
  }
);

export default DropdownInput;
