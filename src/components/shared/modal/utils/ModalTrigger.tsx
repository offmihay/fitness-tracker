import { Keyboard, StyleSheet, View } from "react-native";
import React, { useRef, useState } from "react";
import { BottomSheetModal, BottomSheetModalProps } from "@gorhom/bottom-sheet";
import CustomModal from "../CustomModal";

type Props = {
  renderTrigger: (onPress: () => void) => React.ReactNode;
  modalContent: React.ReactNode;
  bottomSheetProps?: Omit<BottomSheetModalProps, "children">;
};

const ModalTrigger = (props: Props) => {
  const { renderTrigger, modalContent, bottomSheetProps } = props;

  const [, setOpen] = useState(false);

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handleOpenModal = () => {
    Keyboard.dismiss();
    bottomSheetRef.current?.present();
    setOpen(true);
  };

  const onDismiss = () => {
    setOpen(false);
  };

  return (
    <>
      <CustomModal
        ref={bottomSheetRef}
        onDismiss={onDismiss}
        content={modalContent}
        bottomSheetProps={bottomSheetProps}
      />
      {renderTrigger(handleOpenModal)}
    </>
  );
};

export default ModalTrigger;
